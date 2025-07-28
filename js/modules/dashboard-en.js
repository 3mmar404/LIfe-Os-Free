// LifeOS Free - Dashboard Module (English) v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.dashboardEn = {
    load: function() {
        const container = document.getElementById('dashboard');
        const data = LifeOS.core.state.data;
        
        const passwordsCount = data.passwords?.length || 0;
        const contactsCount = data.contacts?.length || 0;
        const bookmarksCount = data.bookmarks?.length || 0;

        container.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h1 class="dashboard-title">
                        <i class="fas fa-tachometer-alt"></i>
                        Welcome to LifeOS Free
                    </h1>
                    <p class="dashboard-subtitle">Your secure digital life management system</p>
                </div>

                <div class="dashboard-grid">
                    <div class="dashboard-card passwords-card" onclick="LifeOS.router.navigate('passwords')">
                        <div class="card-header">
                            <div class="card-icon">
                                <i class="fas fa-key"></i>
                            </div>
                            <div class="card-info">
                                <h3 class="card-title">Passwords</h3>
                                <p class="card-subtitle">Secure password management</p>
                            </div>
                        </div>
                        <div class="card-stats">
                            <div class="stat">
                                <span class="stat-number">${passwordsCount}</span>
                                <span class="stat-label">Saved passwords</span>
                            </div>
                        </div>
                        <div class="card-actions">
                            <button class="btn-primary" onclick="event.stopPropagation(); LifeOS.router.navigate('passwords')">
                                <i class="fas fa-plus"></i>
                                Add Password
                            </button>
                        </div>
                    </div>

                    <div class="dashboard-card contacts-card" onclick="LifeOS.router.navigate('contacts')">
                        <div class="card-header">
                            <div class="card-icon">
                                <i class="fas fa-address-book"></i>
                            </div>
                            <div class="card-info">
                                <h3 class="card-title">Contacts</h3>
                                <p class="card-subtitle">Smart address book</p>
                            </div>
                        </div>
                        <div class="card-stats">
                            <div class="stat">
                                <span class="stat-number">${contactsCount}</span>
                                <span class="stat-label">Saved contacts</span>
                            </div>
                        </div>
                        <div class="card-actions">
                            <button class="btn-primary" onclick="event.stopPropagation(); LifeOS.router.navigate('contacts')">
                                <i class="fas fa-plus"></i>
                                Add Contact
                            </button>
                        </div>
                    </div>

                    <div class="dashboard-card bookmarks-card" onclick="LifeOS.router.navigate('bookmarks')">
                        <div class="card-header">
                            <div class="card-icon">
                                <i class="fas fa-bookmark"></i>
                            </div>
                            <div class="card-info">
                                <h3 class="card-title">Bookmarks</h3>
                                <p class="card-subtitle">Important links library</p>
                            </div>
                        </div>
                        <div class="card-stats">
                            <div class="stat">
                                <span class="stat-number">${bookmarksCount}</span>
                                <span class="stat-label">Saved bookmarks</span>
                            </div>
                        </div>
                        <div class="card-actions">
                            <button class="btn-primary" onclick="event.stopPropagation(); LifeOS.router.navigate('bookmarks')">
                                <i class="fas fa-plus"></i>
                                Add Bookmark
                            </button>
                        </div>
                    </div>

                    <div class="dashboard-card tools-card" onclick="LifeOS.router.navigate('tools')">
                        <div class="card-header">
                            <div class="card-icon">
                                <i class="fas fa-tools"></i>
                            </div>
                            <div class="card-info">
                                <h3 class="card-title">Tools & Settings</h3>
                                <p class="card-subtitle">Manage your data</p>
                            </div>
                        </div>
                        <div class="card-stats">
                            <div class="stat">
                                <span class="stat-number">${LifeOS.core.state.data.settings.theme === 'dark' ? 'Dark' : 'Light'}</span>
                                <span class="stat-label">Current theme</span>
                            </div>
                        </div>
                        <div class="card-actions">
                            <button class="btn-primary" onclick="event.stopPropagation(); LifeOS.router.navigate('tools')">
                                <i class="fas fa-cog"></i>
                                Open Tools
                            </button>
                        </div>
                    </div>
                </div>

                <div class="dashboard-info">
                    <div class="info-card security-info">
                        <div class="info-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="info-content">
                            <h4>Completely Secure</h4>
                            <p>All your data is encrypted locally using AES-256. Nothing is sent to external servers.</p>
                        </div>
                    </div>
                    
                    <div class="info-card offline-info">
                        <div class="info-icon">
                            <i class="fas fa-plug"></i>
                        </div>
                        <div class="info-content">
                            <h4>Works Offline</h4>
                            <p>No internet connection required. Everything works locally on your device.</p>
                        </div>
                    </div>
                    
                    <div class="info-card opensource-info">
                        <div class="info-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="info-content">
                            <h4>Open Source</h4>
                            <p>Source code is available for review and modification on GitHub.</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-footer">
                    <div class="quick-links">
                        <h3>Quick Links</h3>
                        <div class="links-grid">
                            <a href="#" onclick="LifeOS.router.navigate('documentation')" class="quick-link">
                                <i class="fas fa-book"></i>
                                User Guide
                            </a>
                            <a href="#" onclick="LifeOS.router.navigate('about')" class="quick-link">
                                <i class="fas fa-info-circle"></i>
                                About LifeOS
                            </a>
                            <a href="https://github.com/3mmar404/LIfe-Os-Free" target="_blank" class="quick-link">
                                <i class="fab fa-github"></i>
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};