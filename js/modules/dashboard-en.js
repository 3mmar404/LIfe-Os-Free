// LifeOS Free - Dashboard Module (English) v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.dashboardEn = {
    load: function() {
        this.renderLayout();
        this.updateStats();
        this.loadRecentActivity();
    },

    renderLayout: function() {
        const container = document.getElementById('dashboard');
        // Self-healing: if layout is already present but incomplete (e.g., from an old version), re-render.
        if (container.childElementCount > 0 && !container.querySelector('.welcome-header')) {
            container.innerHTML = '';
        }
        if (container.childElementCount > 0) return; // Already rendered correctly

        container.innerHTML = `
            <h2 class="welcome-header" style="margin-bottom: 2rem;">Control Panel - Welcome, Commander.</h2>
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-key"></i><h3 class="card-title">Passwords</h3></div>
                    <div class="card-stats">
                        <div class="stat-item"><div class="stat-number" id="passwords-count">0</div><div class="stat-label">Items</div></div>
                        <div class="stat-item"><div class="stat-number" id="passwords-categories">0</div><div class="stat-label">Categories</div></div>
                    </div>
                    <div class="card-actions"><button class="btn btn-small" onclick="LifeOS.router.navigate('passwords')"><i class="fas fa-arrow-right"></i> Manage</button></div>
                </div>
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-address-book"></i><h3 class="card-title">Contacts</h3></div>
                    <div class="card-stats">
                        <div class="stat-item"><div class="stat-number" id="contacts-count">0</div><div class="stat-label">Contacts</div></div>
                        <div class="stat-item"><div class="stat-number" id="contacts-categories">0</div><div class="stat-label">Categories</div></div>
                    </div>
                    <div class="card-actions"><button class="btn btn-small" onclick="LifeOS.router.navigate('contacts')"><i class="fas fa-arrow-right"></i> Manage</button></div>
                </div>
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-bookmark"></i><h3 class="card-title">Bookmarks</h3></div>
                    <div class="card-stats">
                        <div class="stat-item"><div class="stat-number" id="bookmarks-count">0</div><div class="stat-label">Bookmarks</div></div>
                        <div class="stat-item"><div class="stat-number" id="bookmarks-categories">0</div><div class="stat-label">Categories</div></div>
                    </div>
                    <div class="card-actions"><button class="btn btn-small" onclick="LifeOS.router.navigate('bookmarks')"><i class="fas fa-arrow-right"></i> Manage</button></div>
                </div>
            </div>
            
            <div class="recent-activity-section">
                <h3 class="section-title"><i class="fas fa-history"></i> Recent Activity</h3>
                <div class="activity-feed" id="recent-activity">
                    <!-- Populated by loadRecentActivity() -->
                </div>
            </div>
        `;
    },

    updateStats: function() {
        const data = LifeOS.core.state.data;
        
        // Password stats
        const passwordsCount = data.passwords ? data.passwords.length : 0;
        const passwordsCategories = data.passwords ? new Set(data.passwords.map(p => p.category || 'Personal')).size : 0;
        document.getElementById('passwords-count').textContent = passwordsCount;
        document.getElementById('passwords-categories').textContent = passwordsCategories;
        
        // Contact stats  
        const contactsCount = data.contacts ? data.contacts.length : 0;
        const contactsCategories = data.contacts ? new Set(data.contacts.map(c => c.category || 'Friends')).size : 0;
        document.getElementById('contacts-count').textContent = contactsCount;
        document.getElementById('contacts-categories').textContent = contactsCategories;
        
        // Bookmark stats
        const bookmarksCount = data.bookmarks ? data.bookmarks.length : 0;
        const bookmarksCategories = data.bookmarks ? new Set(data.bookmarks.map(b => b.category || 'Work')).size : 0;
        document.getElementById('bookmarks-count').textContent = bookmarksCount;
        document.getElementById('bookmarks-categories').textContent = bookmarksCategories;
    },

    loadRecentActivity: function() {
        const container = document.getElementById('recent-activity');
        if (!container) return;
        
        // Simulated recent activity
        const activities = [
            { icon: 'fas fa-key', text: 'Password manager accessed', time: 'Just now', type: 'info' },
            { icon: 'fas fa-shield-alt', text: 'Data encrypted and secured', time: '2 minutes ago', type: 'success' },
            { icon: 'fas fa-database', text: 'Local storage updated', time: '5 minutes ago', type: 'info' }
        ];
        
        if (activities.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-history"></i><p>No recent activity</p></div>';
            return;
        }
        
        container.innerHTML = activities.map(activity => `
            <div class="activity-item ${activity.type}">
                <div class="activity-icon"><i class="${activity.icon}"></i></div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }
};