// LifeOS - Contacts Module v3.0 (English)
if (!LifeOS) { var LifeOS = {}; }

LifeOS.contactsEn = {
    currentFilter: 'all',
    searchQuery: '',
    viewMode: 'dossier',

    load: function() {
        this.renderLayout();
        this.renderGrid();
    },
    
    renderLayout: function() {
        const container = document.getElementById('contacts');
        if (container.childElementCount > 0 && container.querySelector('.view-mode-toggle')) return;
        container.innerHTML = `<div class="search-filters"><div class="search-box"><i class="fas fa-search search-icon"></i><input type="text" class="search-input" id="contacts-search" placeholder="Search contacts..."></div><div class="view-mode-toggle"><button class="btn btn-small" data-view="dossier" title="Card View"><i class="fas fa-th-large"></i></button><button class="btn btn-small" data-view="list" title="List View"><i class="fas fa-list"></i></button></div><button class="btn btn-success"><i class="fas fa-plus"></i> Add Contact</button><button class="btn btn-secondary import-btn"><i class="fas fa-upload"></i> Import CSV</button><input type="file" class="import-input" accept=".csv" style="display: none;"></div><div class="filters-wrapper"><div class="filters-header" onclick="toggleContactsFilters()"><h4><i class="fas fa-filter"></i> Categories</h4><button class="filters-toggle"><i class="fas fa-chevron-down"></i></button></div><div class="filters-content expanded"><div class="filter-tags-container" id="contacts-filters"></div></div></div><div id="contacts-grid"></div><div class="text-center" id="contacts-empty" style="display: none;"><i class="fas fa-address-book" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i><p style="color: var(--text-secondary);">No contacts found. Start by adding a new contact or importing.</p></div>`;
        
        container.querySelector('.btn-success').addEventListener('click', () => this.showForm());
        container.querySelector('.import-btn').addEventListener('click', () => container.querySelector('.import-input').click());
        container.querySelector('.import-input').addEventListener('change', (e) => { this.handleExternalImport(e.target.files[0]); e.target.value = null; });
        container.querySelector('#contacts-search').addEventListener('input', LifeOS.core.debounce((e) => { this.searchQuery = e.target.value; this.renderGrid(); }, 300));
        
        container.querySelectorAll('.view-mode-toggle button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.viewMode = btn.dataset.view;
                this.renderGrid();
                this._updateViewModeToggle();
            });
        });
        this._updateViewModeToggle();
    },
    
    _updateViewModeToggle: function() {
        document.querySelectorAll('.view-mode-toggle button').forEach(btn => {
            btn.classList.toggle('active', this.viewMode === btn.dataset.view);
            // Quick CSS for active state without needing CSS file update
            btn.style.backgroundColor = (this.viewMode === btn.dataset.view) ? 'var(--accent-color)' : '';
            btn.style.color = (this.viewMode === btn.dataset.view) ? '#0d1117' : '';
        });
        const grid = document.getElementById('contacts-grid');
        grid.className = this.viewMode === 'dossier' ? 'cards-grid' : 'list-view-grid';
        if (this.viewMode === 'list') grid.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;'; else grid.style.cssText = ''; // Reset for grid
    },
    
    renderGrid: function() {
        const grid = document.getElementById('contacts-grid'); const emptyMsg = document.getElementById('contacts-empty');
        grid.innerHTML = ''; const data = this.getFilteredData();
        if (data.length === 0) { grid.style.display = 'none'; emptyMsg.style.display = 'block'; }
        else {
            grid.style.display = this.viewMode === 'list' ? 'flex' : 'grid'; emptyMsg.style.display = 'none';
            data.forEach(item => {
                const element = (this.viewMode === 'dossier') ? this.createCard(item) : this.createListItem(item);
                grid.appendChild(element);
            });
        } this.updateFilters();
    },

    getFilteredData: function() { 
        let data = LifeOS.core.state.data.contacts; 
        const query = this.searchQuery.toLowerCase(); 
        if (query) { 
            data = data.filter(item => 
                Object.values(item).some(val => typeof val === 'string' && val.toLowerCase().includes(query)) || 
                (item.organization && Object.values(item.organization).some(val => val.toLowerCase().includes(query))) || 
                (item.phones || []).some(p => p.value.toLowerCase().includes(query)) || 
                (item.emails || []).some(e => e.value.toLowerCase().includes(query))
            ); 
        } 
        if (this.currentFilter !== 'all') { 
            data = data.filter(item => (item.labels || []).includes(this.currentFilter)); 
        } 
        return data.sort((a,b) => a.name.localeCompare(b.name)); 
    },

    createCard: function(item) {
        const card = document.createElement('div'); 
        card.className = 'data-card';
        let photoHTML = `<div class="contact-initials" style="width:60px;height:60px;background:var(--secondary-color);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--accent-color);font-weight:bold;font-size:1.8rem;flex-shrink:0;">${item.name?item.name.charAt(0).toUpperCase():'?'}</div>`;
        if (item.photo) { 
            photoHTML = `<img src="${item.photo}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid var(--border-color);flex-shrink:0;">`;
        }
        let orgHTML = ''; 
        if (item.organization?.name) { 
            orgHTML = `<div style="color:var(--text-secondary);font-size:0.9rem;">${LifeOS.core.sanitize(item.organization.name)}${item.organization.title?`, ${LifeOS.core.sanitize(item.organization.title)}`:''}</div>`;
        }
        
        card.innerHTML = `<div class="card-content"><div class="card-header" style="align-items:center;gap:1rem;">${photoHTML}<div style="flex:1;"><h3 class="card-title">${LifeOS.core.sanitize(item.name||'Unknown')}</h3>${orgHTML}</div></div><div id="collapsible-${item.id}" class="contact-details" style="margin:1.5rem 0 1rem 0; display:none;"></div></div><div class="card-actions"></div>`;
        
        const detailsContainer = card.querySelector('.contact-details');
        const hasDetails = (item.phones && item.phones.length > 0) || (item.emails && item.emails.length > 0) || (item.websites && item.websites.length > 0) || (item.labels && item.labels.length > 0);
        
        if (hasDetails) {
            let detailsHTML = '';
            if (item.phones && item.phones.length > 0) {
                detailsHTML += '<div class="detail-section"><strong>Phone:</strong>';
                item.phones.forEach(phone => {
                    detailsHTML += `<div class="detail-item"><span>${phone.label}: ${phone.value}</span><button class="btn btn-small" onclick="navigator.clipboard.writeText('${phone.value}'); LifeOS.ui.showToast('Phone copied!', 'success');"><i class="fas fa-copy"></i></button></div>`;
                });
                detailsHTML += '</div>';
            }
            if (item.emails && item.emails.length > 0) {
                detailsHTML += '<div class="detail-section"><strong>Email:</strong>';
                item.emails.forEach(email => {
                    detailsHTML += `<div class="detail-item"><span>${email.label}: ${email.value}</span><button class="btn btn-small" onclick="navigator.clipboard.writeText('${email.value}'); LifeOS.ui.showToast('Email copied!', 'success');"><i class="fas fa-copy"></i></button></div>`;
                });
                detailsHTML += '</div>';
            }
            if (item.websites && item.websites.length > 0) {
                detailsHTML += '<div class="detail-section"><strong>Websites:</strong>';
                item.websites.forEach(website => {
                    detailsHTML += `<div class="detail-item"><a href="${website}" target="_blank">${website}</a></div>`;
                });
                detailsHTML += '</div>';
            }
            if (item.labels && item.labels.length > 0) {
                detailsHTML += `<div class="detail-section"><strong>Categories:</strong><div class="tags">${item.labels.map(label => `<span class="tag">${label}</span>`).join('')}</div></div>`;
            }
            detailsContainer.innerHTML = detailsHTML;
        }
        
        // Add action buttons
        const actionsContainer = card.querySelector('.card-actions');
        let actionsHTML = '';
        
        if (hasDetails) {
            actionsHTML += `<button class="btn btn-small expand-btn" onclick="LifeOS.contactsEn.toggleDetails('${item.id}')"><i class="fas fa-chevron-down"></i></button>`;
        }
        
        actionsHTML += `<button class="btn btn-small" onclick="LifeOS.contactsEn.editContact('${item.id}')"><i class="fas fa-edit"></i></button>`;
        actionsHTML += `<button class="btn btn-small btn-danger" onclick="LifeOS.contactsEn.deleteContact('${item.id}')"><i class="fas fa-trash"></i></button>`;
        
        actionsContainer.innerHTML = actionsHTML;
        return card;
    },

    createListItem: function(item) {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        
        let photoHTML = `<div class="contact-initials" style="width:40px;height:40px;background:var(--secondary-color);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--accent-color);font-weight:bold;font-size:1.2rem;flex-shrink:0;">${item.name?item.name.charAt(0).toUpperCase():'?'}</div>`;
        if (item.photo) {
            photoHTML = `<img src="${item.photo}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid var(--border-color);flex-shrink:0;">`;
        }
        
        let contactInfo = '';
        if (item.phones && item.phones.length > 0) {
            contactInfo += `<span class="contact-phone">${item.phones[0].value}</span>`;
        }
        if (item.emails && item.emails.length > 0) {
            contactInfo += contactInfo ? ' • ' : '';
            contactInfo += `<span class="contact-email">${item.emails[0].value}</span>`;
        }
        
        listItem.innerHTML = `
            <div style="display:flex;align-items:center;gap:1rem;flex:1;">
                ${photoHTML}
                <div style="flex:1;">
                    <h4 style="margin:0;color:var(--text-primary);">${LifeOS.core.sanitize(item.name||'Unknown')}</h4>
                    ${contactInfo ? `<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;">${contactInfo}</p>` : ''}
                    ${item.organization?.name ? `<p style="margin:0;color:var(--text-muted);font-size:0.8rem;">${LifeOS.core.sanitize(item.organization.name)}</p>` : ''}
                </div>
            </div>
            <div class="list-actions">
                <button class="btn btn-small" onclick="LifeOS.contactsEn.editContact('${item.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn btn-small btn-danger" onclick="LifeOS.contactsEn.deleteContact('${item.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        return listItem;
    },

    updateFilters: function() {
        const container = document.getElementById('contacts-filters');
        const allLabels = [...new Set(LifeOS.core.state.data.contacts.flatMap(c => c.labels || []))];
        
        container.innerHTML = `
            <button class="filter-tag ${this.currentFilter === 'all' ? 'active' : ''}" onclick="LifeOS.contactsEn.setFilter('all')">
                <i class="fas fa-list"></i> All (${LifeOS.core.state.data.contacts.length})
            </button>
            ${allLabels.map(label => `
                <button class="filter-tag ${this.currentFilter === label ? 'active' : ''}" onclick="LifeOS.contactsEn.setFilter('${label}')">
                    ${label} (${LifeOS.core.state.data.contacts.filter(c => (c.labels || []).includes(label)).length})
                </button>
            `).join('')}
        `;
    },

    setFilter: function(filter) {
        this.currentFilter = filter;
        this.renderGrid();
    },

    toggleDetails: function(contactId) {
        const details = document.getElementById(`collapsible-${contactId}`);
        const btn = details.parentElement.parentElement.querySelector('.expand-btn i');
        if (details.style.display === 'none') {
            details.style.display = 'block';
            btn.className = 'fas fa-chevron-up';
        } else {
            details.style.display = 'none';
            btn.className = 'fas fa-chevron-down';
        }
    },

    showForm: function(editingId = null) {
        let contact = null;
        if (editingId) {
            contact = LifeOS.core.state.data.contacts.find(c => c.id === editingId);
        }
        
        const form = `
            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" id="contact-name" class="form-input" value="${contact ? contact.name : ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Phone Numbers</label>
                <div id="phones-container">
                    ${contact && contact.phones && contact.phones.length > 0 ? 
                        contact.phones.map((phone, index) => `
                            <div class="phone-input">
                                <select class="form-select" style="width:auto;">
                                    <option value="mobile" ${phone.label === 'mobile' ? 'selected' : ''}>Mobile</option>
                                    <option value="home" ${phone.label === 'home' ? 'selected' : ''}>Home</option>
                                    <option value="work" ${phone.label === 'work' ? 'selected' : ''}>Work</option>
                                </select>
                                <input type="tel" class="form-input" value="${phone.value}" style="flex:1;">
                                <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
                            </div>
                        `).join('') :
                        `<div class="phone-input">
                            <select class="form-select" style="width:auto;">
                                <option value="mobile">Mobile</option>
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                            </select>
                            <input type="tel" class="form-input" style="flex:1;" required>
                            <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
                        </div>`
                    }
                </div>
                <button type="button" class="btn btn-secondary btn-small" onclick="LifeOS.contactsEn.addPhoneField()">
                    <i class="fas fa-plus"></i> Add Phone
                </button>
            </div>
            <div class="form-group">
                <label class="form-label">Email Addresses</label>
                <div id="emails-container">
                    ${contact && contact.emails && contact.emails.length > 0 ? 
                        contact.emails.map((email, index) => `
                            <div class="email-input">
                                <select class="form-select" style="width:auto;">
                                    <option value="personal" ${email.label === 'personal' ? 'selected' : ''}>Personal</option>
                                    <option value="work" ${email.label === 'work' ? 'selected' : ''}>Work</option>
                                    <option value="other" ${email.label === 'other' ? 'selected' : ''}>Other</option>
                                </select>
                                <input type="email" class="form-input" value="${email.value}" style="flex:1;">
                                <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
                            </div>
                        `).join('') : ''
                    }
                </div>
                <button type="button" class="btn btn-secondary btn-small" onclick="LifeOS.contactsEn.addEmailField()">
                    <i class="fas fa-plus"></i> Add Email
                </button>
            </div>
            <div class="form-group">
                <label class="form-label">Organization</label>
                <input type="text" id="contact-org-name" class="form-input" placeholder="Company name" value="${contact && contact.organization ? contact.organization.name : ''}">
                <input type="text" id="contact-org-title" class="form-input" placeholder="Job title" value="${contact && contact.organization ? contact.organization.title : ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Categories</label>
                <input type="text" id="contact-labels" class="form-input" placeholder="family, friends, work (comma separated)" value="${contact && contact.labels ? contact.labels.join(', ') : ''}">
            </div>
            <div class="form-actions">
                <button class="btn btn-success" onclick="LifeOS.contactsEn.saveContact(${editingId || 'null'})">
                    <i class="fas fa-save"></i> Save Contact
                </button>
            </div>
        `;
        LifeOS.ui.showModal(editingId ? 'Edit Contact' : 'Add New Contact', form);
    },

    addPhoneField: function() {
        const container = document.getElementById('phones-container');
        const phoneInput = document.createElement('div');
        phoneInput.className = 'phone-input';
        phoneInput.innerHTML = `
            <select class="form-select" style="width:auto;">
                <option value="mobile">Mobile</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
            </select>
            <input type="tel" class="form-input" style="flex:1;">
            <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        container.appendChild(phoneInput);
    },

    addEmailField: function() {
        const container = document.getElementById('emails-container');
        const emailInput = document.createElement('div');
        emailInput.className = 'email-input';
        emailInput.innerHTML = `
            <select class="form-select" style="width:auto;">
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
            </select>
            <input type="email" class="form-input" style="flex:1;">
            <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        container.appendChild(emailInput);
    },

    saveContact: function(editingId) {
        const name = document.getElementById('contact-name').value.trim();
        if (!name) {
            LifeOS.ui.showToast('Name is required', 'error');
            return;
        }

        const phones = [];
        document.querySelectorAll('.phone-input').forEach(phoneDiv => {
            const label = phoneDiv.querySelector('select').value;
            const value = phoneDiv.querySelector('input').value.trim();
            if (value) phones.push({ label, value });
        });

        const emails = [];
        document.querySelectorAll('.email-input').forEach(emailDiv => {
            const label = emailDiv.querySelector('select').value;
            const value = emailDiv.querySelector('input').value.trim();
            if (value) emails.push({ label, value });
        });

        const orgName = document.getElementById('contact-org-name').value.trim();
        const orgTitle = document.getElementById('contact-org-title').value.trim();
        const organization = (orgName || orgTitle) ? { name: orgName, title: orgTitle } : null;

        const labels = document.getElementById('contact-labels').value.split(',').map(l => l.trim()).filter(l => l);

        const contactData = {
            name,
            phones,
            emails,
            organization,
            labels,
            updatedAt: new Date().toISOString()
        };

        if (editingId) {
            const index = LifeOS.core.state.data.contacts.findIndex(c => c.id === editingId);
            if (index !== -1) {
                LifeOS.core.state.data.contacts[index] = { ...LifeOS.core.state.data.contacts[index], ...contactData };
            }
        } else {
            contactData.id = Date.now();
            contactData.createdAt = new Date().toISOString();
            LifeOS.core.state.data.contacts.push(contactData);
        }

        LifeOS.core.saveData();
        this.renderGrid();
        LifeOS.ui.closeModal();
        LifeOS.ui.showToast(`Contact ${editingId ? 'updated' : 'saved'} successfully!`, 'success');
    },

    editContact: function(contactId) {
        this.showForm(contactId);
    },

    deleteContact: function(contactId) {
        const contact = LifeOS.core.state.data.contacts.find(c => c.id === contactId);
        if (contact && confirm(`Are you sure you want to delete ${contact.name}?`)) {
            LifeOS.core.state.data.contacts = LifeOS.core.state.data.contacts.filter(c => c.id !== contactId);
            LifeOS.core.saveData();
            this.renderGrid();
            LifeOS.ui.showToast('Contact deleted successfully!', 'success');
        }
    },

    handleExternalImport: function(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csvData = e.target.result;
                const lines = csvData.split('\n');
                const headers = lines[0].split(',').map(h => h.trim());
                
                const contacts = [];
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = lines[i].split(',').map(v => v.trim());
                        const contact = {
                            id: Date.now() + i,
                            name: values[0] || 'Unknown',
                            phones: values[1] ? [{ label: 'mobile', value: values[1] }] : [],
                            emails: values[2] ? [{ label: 'personal', value: values[2] }] : [],
                            labels: ['imported'],
                            importedAt: new Date().toISOString()
                        };
                        contacts.push(contact);
                    }
                }
                
                LifeOS.core.state.data.contacts.push(...contacts);
                LifeOS.core.saveData();
                this.renderGrid();
                LifeOS.ui.showToast(`Imported ${contacts.length} contacts successfully!`, 'success');
            } catch (error) {
                LifeOS.ui.showToast('Error importing CSV file', 'error');
            }
        };
        reader.readAsText(file);
    }
};

// Global function for filters toggle
function toggleContactsFilters() {
    const content = document.querySelector('.filters-content');
    const toggle = document.querySelector('.filters-toggle i');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        content.style.display = 'none';
        toggle.className = 'fas fa-chevron-right';
    } else {
        content.classList.add('expanded');
        content.style.display = 'block';
        toggle.className = 'fas fa-chevron-down';
    }
}