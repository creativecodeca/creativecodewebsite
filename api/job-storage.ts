// Job storage system - in-memory for MVP, can upgrade to Vercel KV later
interface Job {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  input: any;
  result: {
    repoUrl?: string;
    vercelUrl?: string;
    projectUrl?: string;
  } | null;
  error: string | null;
}

class JobStorage {
  private jobs: Map<string, Job> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Cleanup old jobs every hour
    this.cleanupInterval = setInterval(() => {
      const oneHourAgo = Date.now() - 3600000;
      for (const [id, job] of this.jobs.entries()) {
        if (new Date(job.createdAt).getTime() < oneHourAgo) {
          this.jobs.delete(id);
        }
      }
    }, 3600000);
  }

  async createJob(input: any): Promise<Job> {
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    
    const job: Job = {
      id: jobId,
      status: 'queued',
      progress: 0,
      message: 'Job created, waiting to start...',
      createdAt: now,
      updatedAt: now,
      input,
      result: null,
      error: null
    };

    this.jobs.set(jobId, job);
    return job;
  }

  async getJob(jobId: string): Promise<Job | null> {
    return this.jobs.get(jobId) || null;
  }

  async updateJob(jobId: string, updates: Partial<Job>): Promise<Job | null> {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    const updated: Job = {
      ...job,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.jobs.set(jobId, updated);
    return updated;
  }

  async deleteJob(jobId: string): Promise<boolean> {
    return this.jobs.delete(jobId);
  }

  // Get all jobs (for debugging/admin)
  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }
}

// Singleton instance
export const jobStorage = new JobStorage();
export type { Job };

