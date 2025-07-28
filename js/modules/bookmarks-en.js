// LifeOS Free - Bookmarks Module (English) v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.bookmarksEn = {
    currentFilter: 'all',
    searchQuery: '',

    load: function() {
        const container = document.getElementById('bookmarks');
        container.innerHTML = `
            <div class="bookmarks-container">
                <div class="module-header">
                    <div class="header-content">
                        <h2 class="module-title">
                            <i class="fas fa-bookmark"></i>
                            Bookmark Manager
                        </h2>
                        <button class="btn-primary add-bookmark-btn" onclick="LifeOS.bookmarksEn.showAddForm()">
                            <i class="fas fa-plus"></i>
                            Add Bookmark
                        </button>
                    </div>
                </div>

                <div class="module-controls">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="bookmarkSearch" placeholder="Search bookmarks..." 
                               oninput="LifeOS.bookmarksEn.handleSearch(this.value)">
                    </div>
                    
                    <div class="filter-tabs">
                        <button class="filter-tab active" data-filter="all" onclick="LifeOS.bookmarksEn.setFilter('all')">All</button>
                        <button class="filter-tab" data-filter="work" onclick="LifeOS.bookmarksEn.setFilter('work')">Work</button>
                        <button class="filter-tab" data-filter="entertainment" onclick="LifeOS.bookmarksEn.setFilter('entertainment')">Entertainment</button>
                        <button class="filter-tab" data-filter="education" onclick="LifeOS.bookmarksEn.setFilter('education')">Education</button>
                    </div>
                </div>

                <div class="bookmarks-list" id="bookmarksList">
                    ${this.renderBookmarksList()}
                </div>
            </div>
        `;
    },

    renderBookmarksList: function() {
        const bookmarks = LifeOS.core.state.data.bookmarks || [];
        
        if (bookmarks.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-bookmark"></i>
                    </div>
                    <h3>No bookmarks saved yet</h3>
                    <p>Add your first bookmark to start organizing your favorite links</p>
                    <button class="btn-primary" onclick="LifeOS.bookmarksEn.showAddForm()">
                        <i class="fas fa-plus"></i>
                        Add First Bookmark
                    </button>
                </div>
            `;
        }

        let filteredBookmarks = bookmarks;
        
        if (this.currentFilter !== 'all') {
            filteredBookmarks = bookmarks.filter(b => b.category === this.currentFilter);
        }
        
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filteredBookmarks = filteredBookmarks.filter(b => 
                b.title.toLowerCase().includes(query) ||
                b.url.toLowerCase().includes(query) ||
                (b.description && b.description.toLowerCase().includes(query))
            );
        }

        return filteredBookmarks.map(bookmark => `
            <div class="data-card bookmark-card" data-id="${bookmark.id}">
                <div class="card-header">
                    <div class="card-icon ${bookmark.category}">
                        <i class="fas fa-bookmark"></i>
                    </div>
                    <div class="card-info">
                        <h3 class="card-title">${bookmark.title}</h3>
                        <p class="card-subtitle">${bookmark.url}</p>
                        ${bookmark.description ? `<p class="card-description">${bookmark.description}</p>` : ''}
                    </div>
                    <div class="card-actions">
                        <button class="btn-icon" onclick="window.open('${bookmark.url}', '_blank')" title="Open Link">
                            <i class="fas fa-external-link-alt"></i>
                        </button>
                        <button class="btn-icon" onclick="LifeOS.bookmarksEn.copyUrl('${bookmark.id}')" title="Copy URL">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="btn-icon edit-btn" onclick="LifeOS.bookmarksEn.editBookmark('${bookmark.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete-btn" onclick="LifeOS.bookmarksEn.deleteBookmark('${bookmark.id}')" title="Delete">
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
        document.getElementById('bookmarksList').innerHTML = this.renderBookmarksList();
    },

    handleSearch: function(query) {
        this.searchQuery = query;
        document.getElementById('bookmarksList').innerHTML = this.renderBookmarksList();
    },

    showAddForm: function() {
        const formHtml = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> Add New Bookmark</h3>
                    <button class="modal-close" onclick="LifeOS.ui.hideModal()">&times;</button>
                </div>
                <form id="addBookmarkForm" onsubmit="LifeOS.bookmarksEn.handleAddBookmark(event)">
                    <div class="form-group">
                        <label for="bookmarkTitle">Title *</label>
                        <input type="text" id="bookmarkTitle" required placeholder="Bookmark title">
                    </div>
                    
                    <div class="form-group">
                        <label for="bookmarkUrl">URL *</label>
                        <input type="url" id="bookmarkUrl" required placeholder="https://example.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="bookmarkDescription">Description</label>
                        <textarea id="bookmarkDescription" placeholder="Optional description"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="bookmarkCategory">Category</label>
                        <select id="bookmarkCategory">
                            <option value="work">Work</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="education">Education</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="LifeOS.ui.hideModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Save Bookmark</button>
                    </div>
                </form>
            </div>
        `;
        
        LifeOS.ui.showModal(formHtml);
    },

    handleAddBookmark: function(event) {
        event.preventDefault();
        
        const title = document.getElementById('bookmarkTitle').value.trim();
        const url = document.getElementById('bookmarkUrl').value.trim();
        const description = document.getElementById('bookmarkDescription').value.trim();
        const category = document.getElementById('bookmarkCategory').value;
        
        const newBookmark = {
            id: 'bookmark_' + Date.now(),
            title, url, description, category,
            createdAt: new Date().toISOString()
        };
        
        LifeOS.core.state.data.bookmarks.push(newBookmark);
        LifeOS.core.saveData();
        
        LifeOS.ui.hideModal();
        LifeOS.ui.showNotification('Bookmark saved successfully!', 'success');
        document.getElementById('bookmarksList').innerHTML = this.renderBookmarksList();
    },

    copyUrl: function(id) {
        const bookmark = LifeOS.core.state.data.bookmarks.find(b => b.id === id);
        if (bookmark) {
            navigator.clipboard.writeText(bookmark.url).then(() => {
                LifeOS.ui.showNotification('URL copied to clipboard!', 'success');
            });
        }
    },

    deleteBookmark: function(id) {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            LifeOS.core.state.data.bookmarks = LifeOS.core.state.data.bookmarks.filter(b => b.id !== id);
            LifeOS.core.saveData();
            LifeOS.ui.showNotification('Bookmark deleted successfully!', 'success');
            document.getElementById('bookmarksList').innerHTML = this.renderBookmarksList();
        }
    },

    editBookmark: function(id) {
        LifeOS.ui.showNotification('Edit bookmark feature coming soon!', 'info');
    }
};