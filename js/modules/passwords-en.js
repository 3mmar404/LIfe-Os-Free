// LifeOS - Passwords Module v3.0 (English)
if (!LifeOS) { var LifeOS = {}; }

LifeOS.passwordsEn = {
    currentFilter: 'all',
    searchQuery: '',

    load: function() {
        this.renderLayout();
        this.renderGrid();
    },

    renderLayout: function() {
        const container = document.getElementById('passwords');
        if (container.childElementCount > 0 && container.querySelector('.filter-tags-container')) return;

        container.innerHTML = `
            <div class="search-filters">
                <div class="search-box">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="passwords-search" class="search-input" placeholder="Search accounts...">
                </div>
                <button class="btn btn-success"><i class="fas fa-plus"></i> Add Account</button>
                <button class="btn btn-secondary import-btn"><i class="fas fa-upload"></i> Import JSON</button>
                <input type="file" class="import-input" accept=".json" style="display:none">
            </div>
            <div class="filters-wrapper">
                <div class="filters-header" onclick="toggleFilters()">
                    <h4><i class="fas fa-filter"></i> Categories</h4>
                    <button class="filters-toggle"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="filters-content expanded">
                    <div id="passwords-filters" class="filter-tags-container"></div>
                </div>
            </div>
            <div id="passwords-grid" class="cards-grid"></div>
            <div id="passwords-empty" style="display:none; text-align:center;">
                <i class="fas fa-key" style="font-size:3rem;color:var(--text-muted);margin-bottom:1rem;"></i>
                <p style="color:var(--text-secondary);">No accounts found. Start by adding a new account.</p>
            </div>`;

        container.querySelector('.btn-success').onclick = () => this.showAddForm();
        container.querySelector('.import-btn').onclick = () => container.querySelector('.import-input').click();
        container.querySelector('.import-input').onchange = (e) => {this.handleExternalImport(e.target.files[0]); e.target.value = null;};
        container.querySelector('#passwords-search').oninput = LifeOS.core.debounce((e) => { this.searchQuery = e.target.value; this.renderGrid();}, 300);
    },

    renderGrid: function() {
        const grid = document.getElementById('passwords-grid');
        const emptyMsg = document.getElementById('passwords-empty');
        grid.innerHTML = '';
        const data = this.getFilteredData();
        if (data.length === 0) {
            grid.style.display = 'none';
            emptyMsg.style.display = 'block';
        } else {
            grid.style.display = 'grid';
            emptyMsg.style.display = 'none';
            data.forEach(item => { grid.appendChild(this.createCard(item)); });
        }
        this.updateFilters();
    },

    getFilteredData: function() {
        let data = LifeOS.core.state.data.passwords;
        const query = this.searchQuery.toLowerCase();
        if (query) {
            data = data.filter(item =>
                item.platform?.toLowerCase().includes(query) ||
                item.username?.toLowerCase().includes(query) ||
                (item.tags || []).some(tag => tag.toLowerCase().includes(query))
            );
        }
        if (this.currentFilter !== 'all') {
            data = data.filter(item => (item.tags || []).includes(this.currentFilter));
        }
        return data.sort((a,b) => a.platform.localeCompare(b.platform));
    },

    createCard: function(item) {
        const card = document.createElement('div');
        card.className = 'data-card';
        card.innerHTML = `
            <div class="card-content">
                <div class="card-header">
                    <i class="fas fa-shield-alt card-icon"></i>
                    <div>
                        <h3 class="card-title">${LifeOS.core.sanitize(item.platform || '')}</h3>
                        <span style="font-size:0.9rem; color:var(--text-secondary); direction:ltr; text-align:left; display:block;">${LifeOS.core.sanitize(item.username || '')}</span>
                    </div>
                </div>
                <div class="password-field" style="background:var(--secondary-color); padding:0.8rem; border-radius:6px; display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                    <span class="password-span" style="font-family:monospace; user-select:none; color: var(--text-primary);">••••••••••</span>
                    <div style="display:flex; gap:0.5rem;">
                        <button title="Show/Hide" class="btn btn-small btn-secondary toggle-vis-btn"><i class="fas fa-eye"></i></button>
                        <button title="Copy Password" class="btn btn-small btn-secondary copy-pass-btn"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
                <div class="tags-container" style="display:flex;gap:0.5rem;flex-wrap:wrap; margin-top:auto;"></div>
            </div>
            <div class="card-actions"></div>`;

        const tagsContainer = card.querySelector('.tags-container');
        (item.tags || []).forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'filter-tag';
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });
        
        card.querySelector('.toggle-vis-btn').onclick = () => this.togglePassword(item.id, card.querySelector('.password-span'), card.querySelector('.toggle-vis-btn i'));
        card.querySelector('.copy-pass-btn').onclick = () => this.copyPassword(item.id);
        
        const actionsContainer = card.querySelector('.card-actions');
        [{icon:'fa-user-tag', title:'Copy Username', action:()=>this.copyUsername(item.id)}, {icon:'fa-edit', title:'Edit', action:()=>this.showForm(item)}, {icon:'fa-trash', title:'Delete', action:()=>this.delete(item.id), danger:true}].forEach(b => {
            const btn = document.createElement('button');
            btn.className = `btn btn-small ${b.danger ? 'btn-danger' : 'btn-secondary'}`;
            btn.title = b.title;
            btn.innerHTML = `<i class="fas ${b.icon}"></i> ${b.title}`;
            btn.onclick = b.action;
            actionsContainer.appendChild(btn);
        });
        
        return card;
    },

    updateFilters: function() {
        const container = document.getElementById('passwords-filters');
        const allTags = [...new Set(LifeOS.core.state.data.passwords.flatMap(p => p.tags || []))];
        
        container.innerHTML = `
            <button class="filter-tag ${this.currentFilter === 'all' ? 'active' : ''}" onclick="LifeOS.passwordsEn.setFilter('all')">
                <i class="fas fa-list"></i> All (${LifeOS.core.state.data.passwords.length})
            </button>
            ${allTags.map(tag => `
                <button class="filter-tag ${this.currentFilter === tag ? 'active' : ''}" onclick="LifeOS.passwordsEn.setFilter('${tag}')">
                    ${tag} (${LifeOS.core.state.data.passwords.filter(p => (p.tags || []).includes(tag)).length})
                </button>
            `).join('')}
        `;
    },

    setFilter: function(filter) {
        this.currentFilter = filter;
        this.renderGrid();
    },

    showAddForm: function() {
        const form = `
            <div class="form-group">
                <label class="form-label">Platform/Service Name</label>
                <input type="text" id="add-platform" class="form-input" placeholder="e.g., Gmail, Facebook, GitHub">
            </div>
            <div class="form-group">
                <label class="form-label">Username</label>
                <input type="text" id="add-username" class="form-input">
            </div>
            <div class="form-group">
                <label class="form-label">Email (optional)</label>
                <input type="email" id="add-email" class="form-input">
            </div>
            <div class="form-group">
                <label class="form-label">Password</label>
                <div class="password-input">
                    <input type="password" id="add-password" class="form-input">
                    <button type="button" class="btn btn-secondary" onclick="LifeOS.passwordsEn.generatePassword()">
                        <i class="fas fa-magic"></i> Generate
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Tags (optional)</label>
                <input type="text" id="add-tags" class="form-input" placeholder="work, personal, social (comma separated)">
            </div>
            <div class="form-group">
                <label class="form-label">Notes (optional)</label>
                <textarea id="add-notes" class="form-textarea" rows="3"></textarea>
            </div>
            <div class="form-actions">
                <button class="btn btn-success" onclick="LifeOS.passwordsEn.savePassword()">
                    <i class="fas fa-save"></i> Save Password
                </button>
            </div>
        `;
        LifeOS.ui.showModal('Add New Password', form);
    },

    generatePassword: function() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        document.getElementById('add-password').value = password;
        LifeOS.ui.showToast('Strong password generated!', 'success');
    },

    savePassword: function() {
        const platform = document.getElementById('add-platform').value.trim();
        const username = document.getElementById('add-username').value.trim();
        const password = document.getElementById('add-password').value;
        
        if (!platform || !username || !password) {
            LifeOS.ui.showToast('Please fill in all required fields', 'error');
            return;
        }

        const newPassword = {
            id: Date.now(),
            platform,
            username,
            email: document.getElementById('add-email').value.trim(),
            password,
            tags: document.getElementById('add-tags').value.split(',').map(t => t.trim()).filter(t => t),
            notes: document.getElementById('add-notes').value.trim(),
            createdAt: new Date().toISOString()
        };

        LifeOS.core.state.data.passwords.push(newPassword);
        LifeOS.core.saveData();
        this.renderGrid();
        LifeOS.ui.closeModal();
        LifeOS.ui.showToast('Password saved successfully!', 'success');
    },

    editPassword: function(item) {
        const form = `
            <div class="form-group">
                <label class="form-label">Platform/Service Name</label>
                <input type="text" id="edit-platform" class="form-input" value="${item.platform}">
            </div>
            <div class="form-group">
                <label class="form-label">Username</label>
                <input type="text" id="edit-username" class="form-input" value="${item.username}">
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" id="edit-email" class="form-input" value="${item.email || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Password</label>
                <div class="password-input">
                    <input type="password" id="edit-password" class="form-input" value="${item.password}">
                    <button type="button" class="btn btn-secondary" onclick="LifeOS.passwordsEn.generateEditPassword()">
                        <i class="fas fa-magic"></i> Generate
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Tags</label>
                <input type="text" id="edit-tags" class="form-input" value="${(item.tags || []).join(', ')}">
            </div>
            <div class="form-group">
                <label class="form-label">Notes</label>
                <textarea id="edit-notes" class="form-textarea" rows="3">${item.notes || ''}</textarea>
            </div>
            <div class="form-actions">
                <button class="btn btn-success" onclick="LifeOS.passwordsEn.updatePassword(${item.id})">
                    <i class="fas fa-save"></i> Update Password
                </button>
            </div>
        `;
        LifeOS.ui.showModal('Edit Password', form);
    },

    generateEditPassword: function() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        document.getElementById('edit-password').value = password;
        LifeOS.ui.showToast('Strong password generated!', 'success');
    },

    updatePassword: function(id) {
        const index = LifeOS.core.state.data.passwords.findIndex(p => p.id === id);
        if (index === -1) return;

        const platform = document.getElementById('edit-platform').value.trim();
        const username = document.getElementById('edit-username').value.trim();
        const password = document.getElementById('edit-password').value;
        
        if (!platform || !username || !password) {
            LifeOS.ui.showToast('Please fill in all required fields', 'error');
            return;
        }

        LifeOS.core.state.data.passwords[index] = {
            ...LifeOS.core.state.data.passwords[index],
            platform,
            username,
            email: document.getElementById('edit-email').value.trim(),
            password,
            tags: document.getElementById('edit-tags').value.split(',').map(t => t.trim()).filter(t => t),
            notes: document.getElementById('edit-notes').value.trim(),
            updatedAt: new Date().toISOString()
        };

        LifeOS.core.saveData();
        this.renderGrid();
        LifeOS.ui.closeModal();
        LifeOS.ui.showToast('Password updated successfully!', 'success');
    },

    confirmDelete: function(item) {
        const confirm = `
            <div style="text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--danger-color); margin-bottom: 1rem;"></i>
                <h3>Delete Password</h3>
                <p>Are you sure you want to delete the password for <strong>${item.platform}</strong>?</p>
                <p style="color: var(--text-muted); font-size: 0.9rem;">This action cannot be undone.</p>
                <div class="form-actions" style="margin-top: 2rem;">
                    <button class="btn btn-secondary" onclick="LifeOS.ui.closeModal()">Cancel</button>
                    <button class="btn btn-danger" onclick="LifeOS.passwordsEn.deletePassword(${item.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        LifeOS.ui.showModal('Confirm Delete', confirm);
    },

    deletePassword: function(id) {
        LifeOS.core.state.data.passwords = LifeOS.core.state.data.passwords.filter(p => p.id !== id);
        LifeOS.core.saveData();
        this.renderGrid();
        LifeOS.ui.closeModal();
        LifeOS.ui.showToast('Password deleted successfully!', 'success');
    },

    handleExternalImport: function(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    const imported = data.map(item => ({
                        ...item,
                        id: Date.now() + Math.random(),
                        importedAt: new Date().toISOString()
                    }));
                    LifeOS.core.state.data.passwords.push(...imported);
                    LifeOS.core.saveData();
                    this.renderGrid();
                    LifeOS.ui.showToast(`Imported ${imported.length} passwords successfully!`, 'success');
                }
            } catch (error) {
                LifeOS.ui.showToast('Invalid JSON file format', 'error');
            }
        };
        reader.readAsText(file);
    },

    togglePassword: function(id, span, icon) {
        const password = LifeOS.core.state.data.passwords.find(p => p.id === id);
        if (!password) return;
        
        if (span.textContent === '••••••••••') {
            span.textContent = password.password;
            span.style.fontFamily = 'monospace';
            icon.className = 'fas fa-eye-slash';
            setTimeout(() => {
                if (span.textContent === password.password) {
                    span.textContent = '••••••••••';
                    icon.className = 'fas fa-eye';
                }
            }, 3000);
        } else {
            span.textContent = '••••••••••';
            icon.className = 'fas fa-eye';
        }
    },

    copyPassword: function(id) {
        const password = LifeOS.core.state.data.passwords.find(p => p.id === id);
        if (password) {
            navigator.clipboard.writeText(password.password);
            LifeOS.ui.showToast('Password copied!', 'success');
        }
    },

    copyUsername: function(id) {
        const password = LifeOS.core.state.data.passwords.find(p => p.id === id);
        if (password) {
            navigator.clipboard.writeText(password.username);
            LifeOS.ui.showToast('Username copied!', 'success');
        }
    },

    delete: function(id) {
        if (confirm('Are you sure you want to delete this password?')) {
            LifeOS.core.state.data.passwords = LifeOS.core.state.data.passwords.filter(p => p.id !== id);
            LifeOS.core.saveData();
            this.renderGrid();
            LifeOS.ui.showToast('Password deleted successfully!', 'success');
        }
    }
};