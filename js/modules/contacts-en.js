// LifeOS Free - Contacts Module (English) v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.contactsEn = {
    currentFilter: 'all',
    searchQuery: '',

    load: function() {
        const container = document.getElementById('contacts');
        container.innerHTML = `
            <div class="contacts-container">
                <div class="module-header">
                    <div class="header-content">
                        <h2 class="module-title">
                            <i class="fas fa-address-book"></i>
                            Contact Manager
                        </h2>
                        <button class="btn-primary add-contact-btn" onclick="LifeOS.contactsEn.showAddForm()">
                            <i class="fas fa-plus"></i>
                            Add Contact
                        </button>
                    </div>
                </div>

                <div class="module-controls">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="contactSearch" placeholder="Search contacts..." 
                               oninput="LifeOS.contactsEn.handleSearch(this.value)">
                    </div>
                    
                    <div class="filter-tabs">
                        <button class="filter-tab active" data-filter="all" onclick="LifeOS.contactsEn.setFilter('all')">All</button>
                        <button class="filter-tab" data-filter="family" onclick="LifeOS.contactsEn.setFilter('family')">Family</button>
                        <button class="filter-tab" data-filter="friends" onclick="LifeOS.contactsEn.setFilter('friends')">Friends</button>
                        <button class="filter-tab" data-filter="work" onclick="LifeOS.contactsEn.setFilter('work')">Work</button>
                    </div>
                </div>

                <div class="contacts-list" id="contactsList">
                    ${this.renderContactsList()}
                </div>
            </div>
        `;
    },

    renderContactsList: function() {
        const contacts = LifeOS.core.state.data.contacts || [];
        
        if (contacts.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-address-book"></i>
                    </div>
                    <h3>No contacts saved yet</h3>
                    <p>Add your first contact to start building your address book</p>
                    <button class="btn-primary" onclick="LifeOS.contactsEn.showAddForm()">
                        <i class="fas fa-plus"></i>
                        Add First Contact
                    </button>
                </div>
            `;
        }

        let filteredContacts = contacts;
        
        if (this.currentFilter !== 'all') {
            filteredContacts = contacts.filter(c => c.category === this.currentFilter);
        }
        
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filteredContacts = filteredContacts.filter(c => 
                c.name.toLowerCase().includes(query) ||
                c.phone.toLowerCase().includes(query) ||
                c.email.toLowerCase().includes(query)
            );
        }

        return filteredContacts.map(contact => `
            <div class="data-card contact-card" data-id="${contact.id}">
                <div class="card-header">
                    <div class="card-icon ${contact.category}">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="card-info">
                        <h3 class="card-title">${contact.name}</h3>
                        <p class="card-subtitle">${contact.phone}</p>
                        ${contact.email ? `<p class="card-email">${contact.email}</p>` : ''}
                    </div>
                    <div class="card-actions">
                        <button class="btn-icon" onclick="LifeOS.contactsEn.copyPhone('${contact.id}')" title="Copy Phone">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button class="btn-icon edit-btn" onclick="LifeOS.contactsEn.editContact('${contact.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete-btn" onclick="LifeOS.contactsEn.deleteContact('${contact.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    setFilter: function(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        document.getElementById('contactsList').innerHTML = this.renderContactsList();
    },

    handleSearch: function(query) {
        this.searchQuery = query;
        document.getElementById('contactsList').innerHTML = this.renderContactsList();
    },

    showAddForm: function() {
        const formHtml = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> Add New Contact</h3>
                    <button class="modal-close" onclick="LifeOS.ui.hideModal()">&times;</button>
                </div>
                <form id="addContactForm" onsubmit="LifeOS.contactsEn.handleAddContact(event)">
                    <div class="form-group">
                        <label for="contactName">Name *</label>
                        <input type="text" id="contactName" required placeholder="Full name">
                    </div>
                    
                    <div class="form-group">
                        <label for="contactPhone">Phone *</label>
                        <input type="tel" id="contactPhone" required placeholder="Phone number">
                    </div>
                    
                    <div class="form-group">
                        <label for="contactEmail">Email</label>
                        <input type="email" id="contactEmail" placeholder="Email address">
                    </div>
                    
                    <div class="form-group">
                        <label for="contactCategory">Category</label>
                        <select id="contactCategory">
                            <option value="family">Family</option>
                            <option value="friends">Friends</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="LifeOS.ui.hideModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Save Contact</button>
                    </div>
                </form>
            </div>
        `;
        
        LifeOS.ui.showModal(formHtml);
    },

    handleAddContact: function(event) {
        event.preventDefault();
        
        const name = document.getElementById('contactName').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const category = document.getElementById('contactCategory').value;
        
        const newContact = {
            id: 'contact_' + Date.now(),
            name, phone, email, category,
            createdAt: new Date().toISOString()
        };
        
        LifeOS.core.state.data.contacts.push(newContact);
        LifeOS.core.saveData();
        
        LifeOS.ui.hideModal();
        LifeOS.ui.showNotification('Contact saved successfully!', 'success');
        document.getElementById('contactsList').innerHTML = this.renderContactsList();
    },

    copyPhone: function(id) {
        const contact = LifeOS.core.state.data.contacts.find(c => c.id === id);
        if (contact) {
            navigator.clipboard.writeText(contact.phone).then(() => {
                LifeOS.ui.showNotification('Phone number copied!', 'success');
            });
        }
    },

    deleteContact: function(id) {
        if (confirm('Are you sure you want to delete this contact?')) {
            LifeOS.core.state.data.contacts = LifeOS.core.state.data.contacts.filter(c => c.id !== id);
            LifeOS.core.saveData();
            LifeOS.ui.showNotification('Contact deleted successfully!', 'success');
            document.getElementById('contactsList').innerHTML = this.renderContactsList();
        }
    },

    editContact: function(id) {
        // Similar to add form but with pre-filled data
        LifeOS.ui.showNotification('Edit contact feature coming soon!', 'info');
    }
};