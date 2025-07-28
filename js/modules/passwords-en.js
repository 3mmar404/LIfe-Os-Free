// LifeOS Free - Passwords Module (English) v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.passwordsEn = {
    currentFilter: 'all',
    searchQuery: '',

    load: function() {
        const container = document.getElementById('passwords');
        container.innerHTML = `
            <div class="passwords-container">
                <div class="module-header">
                    <div class="header-content">
                        <h2 class="module-title">
                            <i class="fas fa-key"></i>
                            Password Manager
                        </h2>
                        <button class="btn-primary add-password-btn" onclick="LifeOS.passwordsEn.showAddForm()">
                            <i class="fas fa-plus"></i>
                            Add Password
                        </button>
                    </div>
                </div>

                <div class="module-controls">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="passwordSearch" placeholder="Search passwords..." 
                               oninput="LifeOS.passwordsEn.handleSearch(this.value)">
                    </div>
                    
                    <div class="filter-tabs">
                        <button class="filter-tab active" data-filter="all" onclick="LifeOS.passwordsEn.setFilter('all')">
                            <i class="fas fa-list"></i>
                            All
                        </button>
                        <button class="filter-tab" data-filter="personal" onclick="LifeOS.passwordsEn.setFilter('personal')">
                            <i class="fas fa-user"></i>
                            Personal
                        </button>
                        <button class="filter-tab" data-filter="work" onclick="LifeOS.passwordsEn.setFilter('work')">
                            <i class="fas fa-briefcase"></i>
                            Work
                        </button>
                        <button class="filter-tab" data-filter="banking" onclick="LifeOS.passwordsEn.setFilter('banking')">
                            <i class="fas fa-university"></i>
                            Banking
                        </button>
                        <button class="filter-tab" data-filter="social" onclick="LifeOS.passwordsEn.setFilter('social')">
                            <i class="fas fa-share-alt"></i>
                            Social
                        </button>
                    </div>
                </div>

                <div class="passwords-list" id="passwordsList">
                    ${this.renderPasswordsList()}
                </div>
            </div>
        `;
        
        this.attachEventListeners();
    },

    renderPasswordsList: function() {
        const passwords = LifeOS.core.state.data.passwords || [];
        
        if (passwords.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-key"></i>
                    </div>
                    <h3>No passwords saved yet</h3>
                    <p>Add your first password to get started with secure management</p>
                    <button class="btn-primary" onclick="LifeOS.passwordsEn.showAddForm()">
                        <i class="fas fa-plus"></i>
                        Add First Password
                    </button>
                </div>
            `;
        }

        let filteredPasswords = passwords;
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            filteredPasswords = passwords.filter(p => p.category === this.currentFilter);
        }
        
        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filteredPasswords = filteredPasswords.filter(p => 
                p.title.toLowerCase().includes(query) ||
                p.username.toLowerCase().includes(query) ||
                p.url.toLowerCase().includes(query)
            );
        }

        if (filteredPasswords.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>No passwords found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
        }

        return filteredPasswords.map(password => `
            <div class="data-card password-card" data-id="${password.id}">
                <div class="card-header">
                    <div class="card-icon ${password.category}">
                        <i class="fas ${this.getCategoryIcon(password.category)}"></i>
                    </div>
                    <div class="card-info">
                        <h3 class="card-title">${password.title}</h3>
                        <p class="card-subtitle">${password.username}</p>
                        ${password.url ? `<p class="card-url">${password.url}</p>` : ''}
                    </div>
                    <div class="card-actions">
                        <button class="btn-icon" onclick="LifeOS.passwordsEn.copyUsername('${password.id}')" title="Copy Username">
                            <i class="fas fa-user"></i>
                        </button>
                        <button class="btn-icon" onclick="LifeOS.passwordsEn.copyPassword('${password.id}')" title="Copy Password">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="btn-icon" onclick="LifeOS.passwordsEn.togglePassword('${password.id}')" title="Show/Hide Password">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon edit-btn" onclick="LifeOS.passwordsEn.editPassword('${password.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete-btn" onclick="LifeOS.passwordsEn.deletePassword('${password.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="password-details" id="password-${password.id}" style="display: none;">
                    <div class="detail-row">
                        <span class="detail-label">Password:</span>
                        <span class="detail-value password-value">••••••••</span>
                    </div>
                    ${password.notes ? `<div class="detail-row"><span class="detail-label">Notes:</span><span class="detail-value">${password.notes}</span></div>` : ''}
                </div>
            </div>
        `).join('');
    },

    getCategoryIcon: function(category) {
        const icons = {
            'personal': 'fa-user',
            'work': 'fa-briefcase',
            'banking': 'fa-university',
            'social': 'fa-share-alt',
            'other': 'fa-globe'
        };
        return icons[category] || 'fa-globe';
    },

    setFilter: function(filter) {
        this.currentFilter = filter;
        
        // Update active filter tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Re-render list
        document.getElementById('passwordsList').innerHTML = this.renderPasswordsList();
    },

    handleSearch: function(query) {
        this.searchQuery = query;
        document.getElementById('passwordsList').innerHTML = this.renderPasswordsList();
    },

    showAddForm: function() {
        const formHtml = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> Add New Password</h3>
                    <button class="modal-close" onclick="LifeOS.ui.hideModal()">&times;</button>
                </div>
                <form id="addPasswordForm" onsubmit="LifeOS.passwordsEn.handleAddPassword(event)">
                    <div class="form-group">
                        <label for="passwordTitle">Title *</label>
                        <input type="text" id="passwordTitle" required placeholder="e.g., Gmail Account">
                    </div>
                    
                    <div class="form-group">
                        <label for="passwordUsername">Username/Email *</label>
                        <input type="text" id="passwordUsername" required placeholder="username or email">
                    </div>
                    
                    <div class="form-group">
                        <label for="passwordPassword">Password *</label>
                        <div class="password-input-group">
                            <input type="password" id="passwordPassword" required placeholder="Enter password">
                            <button type="button" class="btn-icon" onclick="LifeOS.passwordsEn.toggleAddPasswordVisibility()">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon" onclick="LifeOS.passwordsEn.generatePassword()" title="Generate Password">
                                <i class="fas fa-random"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="passwordUrl">Website URL</label>
                        <input type="url" id="passwordUrl" placeholder="https://example.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="passwordCategory">Category</label>
                        <select id="passwordCategory">
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="banking">Banking</option>
                            <option value="social">Social</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="passwordNotes">Notes</label>
                        <textarea id="passwordNotes" placeholder="Additional notes (optional)"></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="LifeOS.ui.hideModal()">Cancel</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save"></i>
                            Save Password
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        LifeOS.ui.showModal(formHtml);
    },

    handleAddPassword: function(event) {
        event.preventDefault();
        
        const title = document.getElementById('passwordTitle').value.trim();
        const username = document.getElementById('passwordUsername').value.trim();
        const password = document.getElementById('passwordPassword').value;
        const url = document.getElementById('passwordUrl').value.trim();
        const category = document.getElementById('passwordCategory').value;
        const notes = document.getElementById('passwordNotes').value.trim();
        
        if (!title || !username || !password) {
            LifeOS.ui.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const newPassword = {
            id: 'pwd_' + Date.now(),
            title,
            username,
            password,
            url,
            category,
            notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        LifeOS.core.state.data.passwords.push(newPassword);
        LifeOS.core.saveData();
        
        LifeOS.ui.hideModal();
        LifeOS.ui.showNotification('Password saved successfully!', 'success');
        
        // Refresh the list
        document.getElementById('passwordsList').innerHTML = this.renderPasswordsList();
    },

    copyUsername: function(id) {
        const password = LifeOS.core.state.data.passwords.find(p => p.id === id);
        if (password) {
            navigator.clipboard.writeText(password.username).then(() => {
                LifeOS.ui.showNotification('Username copied to clipboard!', 'success');
            });
        }
    },

    copyPassword: function(id) {
        const password = LifeOS.core.state.data.passwords.find(p => p.id === id);
        if (password) {
            navigator.clipboard.writeText(password.password).then(() => {
                LifeOS.ui.showNotification('Password copied to clipboard!', 'success');
            });
        }
    },

    togglePassword: function(id) {
        const detailsDiv = document.getElementById(`password-${id}`);
        const passwordValue = detailsDiv.querySelector('.password-value');
        const password = LifeOS.core.state.data.passwords.find(p => p.id === id);
        
        if (detailsDiv.style.display === 'none') {
            detailsDiv.style.display = 'block';
            passwordValue.textContent = password.password;
        } else {
            detailsDiv.style.display = 'none';
            passwordValue.textContent = '••••••••';
        }
    },

    generatePassword: function() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        document.getElementById('passwordPassword').value = password;
    },

    toggleAddPasswordVisibility: function() {
        const input = document.getElementById('passwordPassword');
        const icon = event.target.closest('button').querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    },

    deletePassword: function(id) {
        if (confirm('Are you sure you want to delete this password?')) {
            LifeOS.core.state.data.passwords = LifeOS.core.state.data.passwords.filter(p => p.id !== id);
            LifeOS.core.saveData();
            LifeOS.ui.showNotification('Password deleted successfully!', 'success');
            
            // Refresh the list
            document.getElementById('passwordsList').innerHTML = this.renderPasswordsList();
        }
    },

    editPassword: function(id) {
        const password = LifeOS.core.state.data.passwords.find(p => p.id === id);
        if (!password) return;
        
        const formHtml = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-edit"></i> Edit Password</h3>
                    <button class="modal-close" onclick="LifeOS.ui.hideModal()">&times;</button>
                </div>
                <form id="editPasswordForm" onsubmit="LifeOS.passwordsEn.handleEditPassword(event, '${id}')">
                    <div class="form-group">
                        <label for="editPasswordTitle">Title *</label>
                        <input type="text" id="editPasswordTitle" required value="${password.title}">
                    </div>
                    
                    <div class="form-group">
                        <label for="editPasswordUsername">Username/Email *</label>
                        <input type="text" id="editPasswordUsername" required value="${password.username}">
                    </div>
                    
                    <div class="form-group">
                        <label for="editPasswordPassword">Password *</label>
                        <div class="password-input-group">
                            <input type="password" id="editPasswordPassword" required value="${password.password}">
                            <button type="button" class="btn-icon" onclick="LifeOS.passwordsEn.toggleEditPasswordVisibility()">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="editPasswordUrl">Website URL</label>
                        <input type="url" id="editPasswordUrl" value="${password.url || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label for="editPasswordCategory">Category</label>
                        <select id="editPasswordCategory">
                            <option value="personal" ${password.category === 'personal' ? 'selected' : ''}>Personal</option>
                            <option value="work" ${password.category === 'work' ? 'selected' : ''}>Work</option>
                            <option value="banking" ${password.category === 'banking' ? 'selected' : ''}>Banking</option>
                            <option value="social" ${password.category === 'social' ? 'selected' : ''}>Social</option>
                            <option value="other" ${password.category === 'other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="editPasswordNotes">Notes</label>
                        <textarea id="editPasswordNotes">${password.notes || ''}</textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="LifeOS.ui.hideModal()">Cancel</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save"></i>
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        LifeOS.ui.showModal(formHtml);
    },

    handleEditPassword: function(event, id) {
        event.preventDefault();
        
        const title = document.getElementById('editPasswordTitle').value.trim();
        const username = document.getElementById('editPasswordUsername').value.trim();
        const password = document.getElementById('editPasswordPassword').value;
        const url = document.getElementById('editPasswordUrl').value.trim();
        const category = document.getElementById('editPasswordCategory').value;
        const notes = document.getElementById('editPasswordNotes').value.trim();
        
        if (!title || !username || !password) {
            LifeOS.ui.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const passwordIndex = LifeOS.core.state.data.passwords.findIndex(p => p.id === id);
        if (passwordIndex !== -1) {
            LifeOS.core.state.data.passwords[passwordIndex] = {
                ...LifeOS.core.state.data.passwords[passwordIndex],
                title,
                username,
                password,
                url,
                category,
                notes,
                updatedAt: new Date().toISOString()
            };
            
            LifeOS.core.saveData();
            LifeOS.ui.hideModal();
            LifeOS.ui.showNotification('Password updated successfully!', 'success');
            
            // Refresh the list
            document.getElementById('passwordsList').innerHTML = this.renderPasswordsList();
        }
    },

    toggleEditPasswordVisibility: function() {
        const input = document.getElementById('editPasswordPassword');
        const icon = event.target.closest('button').querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    },

    attachEventListeners: function() {
        // Any additional event listeners can be added here
    }
};