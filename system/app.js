// App State
let pages = [];
let isLoading = false;

// Initialize App
function init() {
  renderApp();
  attachEventListeners();
}

// Render Main App
function renderApp() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="app-container">
      ${renderSidebar()}
      ${renderMainContent()}
    </div>
    ${isLoading ? renderLoadingOverlay() : ''}
  `;
}

// Render Sidebar
function renderSidebar() {
  return `
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1 class="sidebar-title">Creative Code</h1>
        <p class="sidebar-subtitle">Internal System</p>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-item active">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
          Generate Website
        </div>
      </nav>
    </aside>
  `;
}

// Render Main Content
function renderMainContent() {
  return `
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Generate Website</h1>
        <p class="page-description">Create a custom website using AI and automatically deploy to GitHub</p>
      </div>
      
      <div id="message-container"></div>
      
      <form id="website-form">
        ${renderSitewideInfo()}
        ${renderPageInfo()}
        ${renderSubmitSection()}
      </form>
    </main>
  `;
}

// Render Sitewide Info Section
function renderSitewideInfo() {
  return `
    <div class="form-section">
      <h2 class="section-title">
        <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
        Sitewide Information
      </h2>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label" for="company-name">Company Name *</label>
          <input type="text" id="company-name" name="companyName" class="form-input" required placeholder="e.g., Acme Corp">
        </div>
        <div class="form-group">
          <label class="form-label" for="industry">Industry *</label>
          <input type="text" id="industry" name="industry" class="form-input" required placeholder="e.g., Technology, Healthcare">
        </div>
        <div class="form-group">
          <label class="form-label" for="contact-info">Contact Info *</label>
          <input type="text" id="contact-info" name="contactInfo" class="form-input" required placeholder="e.g., info@company.com">
        </div>
        <div class="form-group">
          <label class="form-label" for="location">Location *</label>
          <input type="text" id="location" name="location" class="form-input" required placeholder="e.g., New York, NY">
        </div>
        <div class="form-group">
          <label class="form-label" for="color-scheme">Color Scheme *</label>
          <input type="text" id="color-scheme" name="colorScheme" class="form-input" required placeholder="e.g., Blue and White, Modern Dark">
        </div>
        <div class="form-group">
          <label class="form-label" for="brand-values">Brand Values / Theme *</label>
          <input type="text" id="brand-values" name="brandValues" class="form-input" required placeholder="e.g., Innovation, Trust, Sustainability">
        </div>
      </div>
    </div>
  `;
}

// Render Page Info Section
function renderPageInfo() {
  return `
    <div class="form-section">
      <h2 class="section-title">
        <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Page Information
      </h2>
      
      <div class="pages-container" id="pages-container">
        ${renderPages()}
      </div>
      
      <div class="add-page-section">
        <div class="form-group" style="flex: 1;">
          <label class="form-label" for="new-page-title">New Page Title</label>
          <input type="text" id="new-page-title" class="form-input" placeholder="e.g., About Us, Services, Contact">
        </div>
        <button type="button" class="add-page-btn" id="add-page-btn">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Page
        </button>
      </div>
    </div>
  `;
}

// Render Pages List
function renderPages() {
  if (pages.length === 0) {
    return '<p style="color: var(--text-tertiary); font-size: 14px; text-align: center; padding: 20px;">No pages added yet. Add your first page below.</p>';
  }

  return pages.map((page, index) => `
    <div class="page-item">
      <div class="page-item-header">
        <span class="page-number">Page ${index + 1}</span>
        <button type="button" class="remove-page-btn" data-index="${index}">Remove</button>
      </div>
      <div class="form-group">
        <label class="form-label">Page Title</label>
        <input type="text" class="form-input" value="${page.title}" readonly>
      </div>
      <div class="form-group">
        <label class="form-label">Page Information *</label>
        <textarea 
          class="form-textarea" 
          data-index="${index}" 
          required 
          placeholder="Describe what this page should contain..."
        >${page.description}</textarea>
      </div>
    </div>
  `).join('');
}

// Render Submit Section
function renderSubmitSection() {
  return `
    <div class="submit-section">
      <button type="button" class="btn btn-secondary" id="reset-btn">Reset Form</button>
      <button type="submit" class="btn btn-primary" ${isLoading ? 'disabled' : ''}>
        ${isLoading ? 'Generating...' : 'Generate Website'}
      </button>
    </div>
  `;
}

// Render Loading Overlay
function renderLoadingOverlay() {
  return `
    <div class="loading-overlay">
      <div class="loading-content">
        <div class="spinner"></div>
        <p class="loading-text">Generating your website...</p>
        <p class="loading-subtext">This may take a few minutes</p>
      </div>
    </div>
  `;
}

// Show Message
function showMessage(type, text) {
  const container = document.getElementById('message-container');
  const icon = type === 'success'
    ? '<svg class="message-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
    : '<svg class="message-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>';

  container.innerHTML = `
    <div class="message message-${type}">
      ${icon}
      <span>${text}</span>
    </div>
  `;

  setTimeout(() => {
    container.innerHTML = '';
  }, 5000);
}

// Attach Event Listeners
function attachEventListeners() {
  // Add Page Button
  const addPageBtn = document.getElementById('add-page-btn');
  if (addPageBtn) {
    addPageBtn.addEventListener('click', handleAddPage);
  }

  // Form Submit
  const form = document.getElementById('website-form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // Reset Button
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', handleReset);
  }

  // Remove Page Buttons
  document.querySelectorAll('.remove-page-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      handleRemovePage(index);
    });
  });

  // Page Description Textareas
  document.querySelectorAll('.form-textarea[data-index]').forEach(textarea => {
    textarea.addEventListener('input', (e) => {
      const index = parseInt(e.target.dataset.index);
      pages[index].description = e.target.value;
    });
  });

  // Enter key on new page title
  const newPageInput = document.getElementById('new-page-title');
  if (newPageInput) {
    newPageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddPage();
      }
    });
  }
}

// Handle Add Page
function handleAddPage() {
  const input = document.getElementById('new-page-title');
  const title = input.value.trim();

  if (!title) {
    showMessage('error', 'Please enter a page title');
    return;
  }

  pages.push({ title, description: '' });
  input.value = '';

  // Re-render pages section
  const container = document.getElementById('pages-container');
  container.innerHTML = renderPages();
  attachEventListeners();
}

// Handle Remove Page
function handleRemovePage(index) {
  pages.splice(index, 1);
  const container = document.getElementById('pages-container');
  container.innerHTML = renderPages();
  attachEventListeners();
}

// Handle Reset
function handleReset() {
  if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
    pages = [];
    document.getElementById('website-form').reset();
    const container = document.getElementById('pages-container');
    container.innerHTML = renderPages();
    showMessage('success', 'Form reset successfully');
  }
}

// Handle Form Submit
async function handleSubmit(e) {
  e.preventDefault();

  // Validate pages
  if (pages.length === 0) {
    showMessage('error', 'Please add at least one page');
    return;
  }

  const hasEmptyDescriptions = pages.some(page => !page.description.trim());
  if (hasEmptyDescriptions) {
    showMessage('error', 'Please fill in all page descriptions');
    return;
  }

  // Collect form data
  const formData = {
    sitewide: {
      companyName: document.getElementById('company-name').value,
      industry: document.getElementById('industry').value,
      contactInfo: document.getElementById('contact-info').value,
      location: document.getElementById('location').value,
      colorScheme: document.getElementById('color-scheme').value,
      brandValues: document.getElementById('brand-values').value,
    },
    pages: pages
  };

  // Set loading state
  isLoading = true;
  renderApp();
  attachEventListeners();

  try {
    // Send to backend
    const response = await fetch('/api/generate-website', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to generate website');
    }

    // Success
    isLoading = false;
    renderApp();
    attachEventListeners();

    const successHTML = `Website generated successfully!<br><br>
            <strong>GitHub Repo:</strong> <a href="${result.repoUrl}" target="_blank" style="color: var(--accent); text-decoration: underline;">${result.repoUrl}</a><br>
            <strong>Vercel URL:</strong> <a href="https://${result.vercelUrl}" target="_blank" style="color: var(--success); text-decoration: underline;">${result.vercelUrl}</a>`;
    showMessage('success', successHTML);

    // Reset form
    pages = [];
    document.getElementById('website-form').reset();
    const container = document.getElementById('pages-container');
    container.innerHTML = renderPages();

  } catch (error) {
    isLoading = false;
    renderApp();
    attachEventListeners();
    showMessage('error', error.message);
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
