// LifeOS - Documentation Module (English)
if (!LifeOS) { var LifeOS = {}; }

LifeOS.documentation = {
    load: function() {
        const container = document.getElementById('documentation');
        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-book card-icon"></i>
                        <div>
                            <h3 class="card-title">LifeOS Free User Guide</h3>
                            <p style="color: var(--text-secondary); margin: 0;">Comprehensive guide for using all features of the digital life management system</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="background: linear-gradient(135deg, var(--accent-color), var(--accent-hover)); padding: 1.5rem; border-radius: 8px; color: white; text-align: center; margin-bottom: 1rem;">
                            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.2rem;">Welcome to LifeOS Free!</h4>
                            <p style="margin: 0; opacity: 0.9;">This guide will help you make full use of all application features</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-play-circle card-icon"></i>
                        <div>
                            <h3 class="card-title">Quick Start</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 1rem;">
                            <div style="padding: 1rem; background: var(--secondary-color); border-radius: 6px;">
                                <h4 style="color: var(--accent-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-key"></i> 1. Set Master Password
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0;">
                                    On first use, you'll need to create a strong master password to protect your data. Make sure to save it in a secure place.
                                </p>
                            </div>
                            <div style="padding: 1rem; background: var(--secondary-color); border-radius: 6px;">
                                <h4 style="color: var(--accent-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-plus"></i> 2. Add Data
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0;">
                                    Use the "Add" buttons in each section to add passwords, contacts, and bookmarks.
                                </p>
                            </div>
                            <div style="padding: 1rem; background: var(--secondary-color); border-radius: 6px;">
                                <h4 style="color: var(--accent-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-search"></i> 3. Search and Filter
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0;">
                                    Use the search box and categories to quickly find your data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-key card-icon"></i>
                        <div>
                            <h3 class="card-title">Password Management</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <h4 style="color: var(--accent-color); margin-bottom: 1rem;">Available Features:</h4>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-plus-circle" style="color: var(--success-color);"></i>
                                <span><strong>Add New Account:</strong> Save login information for any website</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-eye" style="color: var(--accent-color);"></i>
                                <span><strong>Show/Hide Password:</strong> Click the eye icon</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-copy" style="color: var(--warning-color);"></i>
                                <span><strong>Copy Data:</strong> Copy username or password with one click</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-tags" style="color: var(--accent-hover);"></i>
                                <span><strong>Categories:</strong> Organize your accounts using tags</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-upload" style="color: var(--text-secondary);"></i>
                                <span><strong>Import:</strong> Import passwords from JSON files</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-address-book card-icon"></i>
                        <div>
                            <h3 class="card-title">Contact Management</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                            Save important contact information with categorization and quick search capabilities.
                        </p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-user-plus" style="color: var(--success-color);"></i>
                                <span>Add new contacts</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-phone" style="color: var(--accent-color);"></i>
                                <span>Save phone numbers and emails</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-building" style="color: var(--warning-color);"></i>
                                <span>Organize contacts by company or type</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-bookmark card-icon"></i>
                        <div>
                            <h3 class="card-title">Bookmark Management</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                            Save important links with descriptions and categories for easy access.
                        </p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-link" style="color: var(--success-color);"></i>
                                <span>Save links with titles and descriptions</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-external-link-alt" style="color: var(--accent-color);"></i>
                                <span>Open links in new tab</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-folder" style="color: var(--warning-color);"></i>
                                <span>Organize bookmarks in folders</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-tools card-icon"></i>
                        <div>
                            <h3 class="card-title">Tools & Settings</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-download" style="color: var(--success-color);"></i>
                                <span><strong>Export Data:</strong> Save a backup of your data</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-upload" style="color: var(--accent-color);"></i>
                                <span><strong>Import Data:</strong> Restore data from backup</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-key" style="color: var(--warning-color);"></i>
                                <span><strong>Change Master Password:</strong> Update your master password</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-trash" style="color: var(--danger-color);"></i>
                                <span><strong>Clear Data:</strong> Delete all saved data</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-mobile-alt card-icon"></i>
                        <div>
                            <h3 class="card-title">Mobile Usage</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                            LifeOS is optimized for smartphones:
                        </p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-bars" style="color: var(--accent-color);"></i>
                                <span>Use the menu button (☰) to navigate between sections</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-filter" style="color: var(--success-color);"></i>
                                <span>Tap "Categories" to show/hide filters</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-touch" style="color: var(--warning-color);"></i>
                                <span>Long press on cards for more options</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-question-circle card-icon"></i>
                        <div>
                            <h3 class="card-title">Important Tips</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 1rem;">
                            <div style="padding: 1rem; background: var(--success-color); color: white; border-radius: 6px;">
                                <h4 style="margin-bottom: 0.5rem;">
                                    <i class="fas fa-shield-alt"></i> Security
                                </h4>
                                <p style="margin: 0; opacity: 0.9;">
                                    Save your master password in a secure place. Losing it means losing access to all your data.
                                </p>
                            </div>
                            <div style="padding: 1rem; background: var(--warning-color); color: white; border-radius: 6px;">
                                <h4 style="margin-bottom: 0.5rem;">
                                    <i class="fas fa-download"></i> Backups
                                </h4>
                                <p style="margin: 0; opacity: 0.9;">
                                    Regularly backup your data from the Tools section.
                                </p>
                            </div>
                            <div style="padding: 1rem; background: var(--accent-color); color: white; border-radius: 6px;">
                                <h4 style="margin-bottom: 0.5rem;">
                                    <i class="fas fa-sync"></i> Updates
                                </h4>
                                <p style="margin: 0; opacity: 0.9;">
                                    Make sure to use the latest browser version for best performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-question-circle card-icon"></i>
                        <div>
                            <h3 class="card-title">Frequently Asked Questions</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 1.5rem;">
                            <div style="border-left: 3px solid var(--accent-color); padding-left: 1rem;">
                                <h4 style="color: var(--accent-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-lock"></i> Is my data safe?
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    Yes, all your data is encrypted locally using strong AES-256 encryption. No data is sent to the internet, everything is saved in your browser only.
                                </p>
                            </div>
                            
                            <div style="border-left: 3px solid var(--success-color); padding-left: 1rem;">
                                <h4 style="color: var(--success-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-key"></i> What if I forget my master password?
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    Unfortunately, if you forget your master password, you won't be able to access your data. This is an additional security guarantee. So save it in a secure place and make backups.
                                </p>
                            </div>
                            
                            <div style="border-left: 3px solid var(--warning-color); padding-left: 1rem;">
                                <h4 style="color: var(--warning-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-download"></i> How do I create a backup?
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    Go to the "Tools" section and click "Export Data". An encrypted file containing all your data will be downloaded. Save it in a secure place.
                                </p>
                            </div>
                            
                            <div style="border-left: 3px solid var(--danger-color); padding-left: 1rem;">
                                <h4 style="color: var(--danger-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-mobile-alt"></i> Does it work on mobile?
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    Yes! The app is optimized for smartphones. Use the menu button (☰) to navigate and tap "Categories" to show/hide filters.
                                </p>
                            </div>
                            
                            <div style="border-left: 3px solid var(--accent-hover); padding-left: 1rem;">
                                <h4 style="color: var(--accent-hover); margin-bottom: 0.5rem;">
                                    <i class="fas fa-sync"></i> Can I sync data between devices?
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    Currently no, to ensure complete privacy. But you can export data from one device and import it on another. Secure sync is under development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-life-ring card-icon"></i>
                        <div>
                            <h3 class="card-title">Getting Help</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.8;">
                            If you encounter any problem or have an unanswered question:
                        </p>
                        <div class="card-actions">
                            <button class="btn btn-secondary" onclick="window.open('https://github.com', '_blank')">
                                <i class="fab fa-github"></i> GitHub Issues
                            </button>
                            <button class="btn btn-secondary" onclick="LifeOS.ui.showToast('Contact information will be available soon', 'info')">
                                <i class="fas fa-envelope"></i> Direct Contact
                            </button>
                            <button class="btn btn-secondary" onclick="LifeOS.router.navigate('about')">
                                <i class="fas fa-info-circle"></i> About App
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};