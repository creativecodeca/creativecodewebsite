import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';
import type { GeneratedFile } from './static-site-generator.js';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

export interface GitHubRepoData {
  repoUrl: string;
  repoFullName: string;
  repoOwner: string;
  repoId: number;
  latestCommitSha: string;
}

export interface VercelDeploymentData {
  url: string;
  projectUrl: string;
}

export async function createGitHubRepo(
  repoName: string,
  files: GeneratedFile[],
  input: any
): Promise<GitHubRepoData> {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN not found');
  }

  const octokit = new Octokit({
    auth: GITHUB_TOKEN
  });

  try {
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();

    // Create repository
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: `Website for ${input.companyName} - ${input.industry}`,
      private: false,
      auto_init: false
    });

    // Create files in the repository
    for (const file of files) {
      await octokit.repos.createOrUpdateFileContents({
        owner: user.login,
        repo: repoName,
        path: file.name,
        message: `Add ${file.name}`,
        content: Buffer.from(file.content).toString('base64')
      });
    }

    // Get the latest commit SHA from the main branch
    let latestCommitSha = 'main';
    try {
      const { data: branchData } = await octokit.repos.getBranch({
        owner: user.login,
        repo: repoName,
        branch: 'main'
      });
      if (branchData && branchData.commit) {
        latestCommitSha = branchData.commit.sha;
      }
    } catch (error) {
      console.warn('Could not get latest commit SHA, using "main" branch');
    }

    return {
      repoUrl: repo.html_url,
      repoFullName: repo.full_name,
      repoOwner: user.login,
      repoId: repo.id,
      latestCommitSha: latestCommitSha
    };
  } catch (error: any) {
    console.error('GitHub repo creation error:', error);
    if (error.status === 422) {
      throw new Error('Repository name conflict. Please try again with a different company name.');
    }
    if (error.status === 401 || error.status === 403) {
      throw new Error('GitHub authentication failed');
    }
    throw new Error('Failed to create GitHub repository');
  }
}

export async function deployToVercel(
  repoId: number,
  latestCommitSha: string,
  projectName: string
): Promise<VercelDeploymentData> {
  const token = VERCEL_TOKEN;
  if (!token) {
    throw new Error('VERCEL_TOKEN not configured');
  }

  console.log('Starting Vercel deployment for:', projectName);

  try {
    // Get Vercel team/user info
    const accountResponse = await fetch('https://api.vercel.com/v2/teams', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    let accountId: string | null = null;
    if (accountResponse.ok) {
      const teams: any = await accountResponse.json();
      if (teams.teams && teams.teams.length > 0) {
        accountId = teams.teams[0].id;
      }
    }

    // Get user info as fallback
    if (!accountId) {
      const userResponse = await fetch('https://api.vercel.com/v2/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (userResponse.ok) {
        const user: any = await userResponse.json();
        accountId = user.user?.id || null;
      }
    }

    const projectNameSlug = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 52);

    // Create Vercel project
    console.log('Creating Vercel project:', projectNameSlug);
    const createProjectApiUrl = `https://api.vercel.com/v9/projects${accountId ? `?teamId=${accountId}` : ''}`;
    const createProjectResponse = await fetch(createProjectApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectNameSlug,
        framework: null, // Auto-detect (static HTML)
        publicSource: false
      })
    });

    let projectData: any;
    if (createProjectResponse.ok) {
      projectData = await createProjectResponse.json();
      console.log('Vercel project created:', projectData.id);
    } else {
      const errorData: any = await createProjectResponse.json().catch(() => ({}));
      console.error('Vercel project creation response:', createProjectResponse.status, errorData);

      if (errorData.error?.code === 'project_already_exists') {
        // Get existing project
        const getProjectResponse = await fetch(`https://api.vercel.com/v9/projects/${projectNameSlug}${accountId ? `?teamId=${accountId}` : ''}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (getProjectResponse.ok) {
          projectData = await getProjectResponse.json();
          console.log('Using existing Vercel project:', projectData.id);
        } else {
          throw new Error('Failed to get existing project');
        }
      } else {
        throw new Error(`Failed to create Vercel project: ${errorData.error?.message || 'Unknown error'}`);
      }
    }

    // Link GitHub repository
    try {
      const linkRepoResponse = await fetch(`https://api.vercel.com/v1/integrations/github/repo/${repoId}${accountId ? `?teamId=${accountId}` : ''}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: projectData.id
        })
      });
      if (linkRepoResponse.ok) {
        console.log('GitHub repository linked to Vercel project');
      }
    } catch (linkError) {
      console.warn('Could not link GitHub repo (may already be linked):', linkError);
    }

    // Trigger deployment
    console.log('Triggering Vercel deployment...');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for project to be ready

    const deploymentApiUrl = `https://api.vercel.com/v13/deployments${accountId ? `?teamId=${accountId}` : ''}`;
    const deploymentResponse = await fetch(deploymentApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectNameSlug,
        project: projectData.id,
        gitSource: {
          type: 'github',
          repoId: repoId,
          ref: latestCommitSha,
          sha: latestCommitSha
        },
        target: 'production'
      })
    });

    let deploymentUrl = `https://${projectNameSlug}.vercel.app`;
    if (deploymentResponse.ok) {
      const deploymentData: any = await deploymentResponse.json();
      if (deploymentData.url) {
        deploymentUrl = `https://${deploymentData.url}`;
      } else if (deploymentData.alias && deploymentData.alias.length > 0) {
        deploymentUrl = `https://${deploymentData.alias[0]}`;
      }
      console.log('Vercel deployment triggered:', deploymentUrl);
    } else {
      const deployError: any = await deploymentResponse.json().catch(() => ({}));
      console.warn('Deployment trigger response:', deployError);
      // Still return the expected URL format
    }

    return {
      url: deploymentUrl,
      projectUrl: `https://vercel.com/${accountId ? `teams/${accountId}/` : ''}projects/${projectNameSlug}`
    };
  } catch (error: any) {
    console.error('Vercel deployment error:', error);
    throw new Error(`Failed to deploy to Vercel: ${error.message || 'Unknown error'}`);
  }
}

