// LifeOS - Bookmarks Module v3.0 (English)
if (!LifeOS) { var LifeOS = {}; }

LifeOS.bookmarksEn = {
    currentFilter: 'all',
    searchQuery: '',

    load: function() {
        this.renderLayout();
        this.renderGrid();
    },

    renderLayout: function() {
        const container = document.getElementById('bookmarks');
        if (container.childElementCount > 0 && container.querySelector('.filter-tags-container')) return;
        container.innerHTML = `<div class="search-filters"><div class="search-box"><i class="fas fa-search search-icon"></i><input type="text" id="bookmarks-search" placeholder="Search bookmarks..." class="search-input"></div><button class="btn btn-success"><i class="fas fa-plus"></i> Add Bookmark</button><button class="btn btn-secondary import-btn"><i class="fas fa-upload"></i> Import HTML/JSON</button><input type="file" class="import-input" accept=".json,.html" style="display:none;"></div><div class="filters-wrapper"><div class="filters-header" onclick="toggleBookmarksFilters()"><h4><i class="fas fa-filter"></i> Categories</h4><button class="filters-toggle"><i class="fas fa-chevron-down"></i></button></div><div class="filters-content expanded"><div id="bookmarks-filters" class="filter-tags-container"></div></div></div><div id="bookmarks-grid" class="cards-grid"></div><div id="bookmarks-empty" style="display:none; text-align:center;"><i class="fas fa-bookmark" style="font-size:3rem;color:var(--text-muted);margin-bottom:1rem;"></i><p style="color:var(--text-secondary)">No bookmarks found.</p></div>`;
        container.querySelector('.btn-success').onclick = () => this.showAddForm();
        container.querySelector('.import-btn').onclick = () => container.querySelector('.import-input').click();
        container.querySelector('.import-input').onchange = e => { this.handleExternalImport(e.target.files[0]); e.target.value = null; };
        container.querySelector('#bookmarks-search').oninput = LifeOS.core.debounce(e => { this.searchQuery = e.target.value; this.renderGrid(); }, 300);
    },

    renderGrid: function() {
        const grid = document.getElementById('bookmarks-grid');
        const emptyMsg = document.getElementById('bookmarks-empty');
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
        let data = LifeOS.core.state.data.bookmarks;
        const query = this.searchQuery.toLowerCase();
        if (query) {
            data = data.filter(item =>
                item.title?.toLowerCase().includes(query) ||
                item.url?.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query) ||
                (item.tags || []).some(tag => tag.toLowerCase().includes(query))
            );
        }
        if (this.currentFilter !== 'all') {
            data = data.filter(item => (item.tags || []).includes(this.currentFilter));
        }
        return data.sort((a,b) => a.title.localeCompare(b.title));
    },

    createCard: function(item) {
        const card = document.createElement('div');
        card.className = 'data-card bookmark-card';
        
        const favicon = item.favicon || `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=64`;
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-header">
                    <div class="bookmark-favicon">
                        <img src="${favicon}" alt="Favicon" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTZMMCA4TDggMEwxNiA4TDggMTZaTTggMkwyIDhMOCAxNEwxNCA4TDggMloiIGZpbGw9IiM5OTk5OTkiLz4KPHN2Zz4='">
                    </div>
                    <div class="bookmark-info">
                        <h3 class="card-title">${LifeOS.core.sanitize(item.title)}</h3>
                        <p class="bookmark-url">${LifeOS.core.sanitize(item.url)}</p>
                        ${item.description ? `<p class="bookmark-description">${LifeOS.core.sanitize(item.description)}</p>` : ''}
                    </div>
                </div>
                ${(item.tags && item.tags.length > 0) ? `<div class="tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
            </div>
            <div class="card-actions">
                <button class="btn btn-small" onclick="window.open('${item.url}', '_blank')" title="Open Link">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="btn btn-small" onclick="navigator.clipboard.writeText('${item.url}'); LifeOS.ui.showToast('Link copied!', 'success');" title="Copy Link">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="btn btn-small" onclick="LifeOS.bookmarksEn.editBookmark('${item.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="LifeOS.bookmarksEn.deleteBookmark('${item.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return card;
    },

    updateFilters: function() {
        const container = document.getElementById('bookmarks-filters');
        const allTags = [...new Set(LifeOS.core.state.data.bookmarks.flatMap(b => b.tags || []))];
        
        container.innerHTML = `
            <button class="filter-tag ${this.currentFilter === 'all' ? 'active' : ''}" onclick="LifeOS.bookmarksEn.setFilter('all')">
                <i class="fas fa-list"></i> All (${LifeOS.core.state.data.bookmarks.length})
            </button>
            ${allTags.map(tag => `
                <button class="filter-tag ${this.currentFilter === tag ? 'active' : ''}" onclick="LifeOS.bookmarksEn.setFilter('${tag}')">
                    ${tag} (${LifeOS.core.state.data.bookmarks.filter(b => (b.tags || []).includes(tag)).length})
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
                <label class="form-label">Title</label>
                <input type="text" id="bookmark-title" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label">URL</label>
                <input type="url" id="bookmark-url" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label">Description (optional)</label>
                <textarea id="bookmark-description" class="form-textarea" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Tags (optional)</label>
                <input type="text" id="bookmark-tags" class="form-input" placeholder="work, tools, reference (comma separated)">
            </div>
            <div class="form-actions">
                <button class="btn btn-success" onclick="LifeOS.bookmarksEn.saveBookmark()">
                    <i class="fas fa-save"></i> Save Bookmark
                </button>
            </div>
        `;
        LifeOS.ui.showModal('Add New Bookmark', form);
    },

    saveBookmark: function() {
        const title = document.getElementById('bookmark-title').value.trim();
        const url = document.getElementById('bookmark-url').value.trim();
        
        if (!title || !url) {
            LifeOS.ui.showToast('Title and URL are required', 'error');
            return;
        }

        const newBookmark = {
            id: Date.now(),
            title,
            url,
            description: document.getElementById('bookmark-description').value.trim(),
            tags: document.getElementById('bookmark-tags').value.split(',').map(t => t.trim()).filter(t => t),
            createdAt: new Date().toISOString()
        };

        LifeOS.core.state.data.bookmarks.push(newBookmark);
        LifeOS.core.saveData();
        this.renderGrid();
        LifeOS.ui.closeModal();
        LifeOS.ui.showToast('Bookmark saved successfully!', 'success');
    },

    editBookmark: function(bookmarkId) {
        const bookmark = LifeOS.core.state.data.bookmarks.find(b => b.id == bookmarkId);
        if (!bookmark) return;

        const form = `
            <div class="form-group">
                <label class="form-label">Title</label>
                <input type="text" id="edit-bookmark-title" class="form-input" value="${bookmark.title}" required>
            </div>
            <div class="form-group">
                <label class="form-label">URL</label>
                <input type="url" id="edit-bookmark-url" class="form-input" value="${bookmark.url}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea id="edit-bookmark-description" class="form-textarea" rows="3">${bookmark.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Tags</label>
                <input type="text" id="edit-bookmark-tags" class="form-input" value="${(bookmark.tags || []).join(', ')}">
            </div>
            <div class="form-actions">
                <button class="btn btn-success" onclick="LifeOS.bookmarksEn.updateBookmark(${bookmarkId})">
                    <i class="fas fa-save"></i> Update Bookmark
                </button>
            </div>
        `;
        LifeOS.ui.showModal('Edit Bookmark', form);
    },

    updateBookmark: function(bookmarkId) {
        const index = LifeOS.core.state.data.bookmarks.findIndex(b => b.id == bookmarkId);
        if (index === -1) return;

        const title = document.getElementById('edit-bookmark-title').value.trim();
        const url = document.getElementById('edit-bookmark-url').value.trim();
        
        if (!title || !url) {
            LifeOS.ui.showToast('Title and URL are required', 'error');
            return;
        }

        LifeOS.core.state.data.bookmarks[index] = {
            ...LifeOS.core.state.data.bookmarks[index],
            title,
            url,
            description: document.getElementById('edit-bookmark-description').value.trim(),
            tags: document.getElementById('edit-bookmark-tags').value.split(',').map(t => t.trim()).filter(t => t),
            updatedAt: new Date().toISOString()
        };

        LifeOS.core.saveData();
        this.renderGrid();
        LifeOS.ui.closeModal();
        LifeOS.ui.showToast('Bookmark updated successfully!', 'success');
    },

    deleteBookmark: function(bookmarkId) {
        const bookmark = LifeOS.core.state.data.bookmarks.find(b => b.id == bookmarkId);
        if (bookmark && confirm(`Are you sure you want to delete "${bookmark.title}"?`)) {
            LifeOS.core.state.data.bookmarks = LifeOS.core.state.data.bookmarks.filter(b => b.id != bookmarkId);
            LifeOS.core.saveData();
            this.renderGrid();
            LifeOS.ui.showToast('Bookmark deleted successfully!', 'success');
        }
    },

    handleExternalImport: function(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                let bookmarks = [];

                if (file.type === 'application/json' || file.name.endsWith('.json')) {
                    // JSON import
                    const data = JSON.parse(content);
                    if (Array.isArray(data)) {
                        bookmarks = data.map(item => ({
                            id: Date.now() + Math.random(),
                            title: item.title || item.name || 'Untitled',
                            url: item.url || item.href,
                            description: item.description || '',
                            tags: item.tags || ['imported'],
                            importedAt: new Date().toISOString()
                        }));
                    }
                } else {
                    // HTML bookmarks import
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html');
                    const links = doc.querySelectorAll('a[href]');
                    
                    links.forEach(link => {
                        bookmarks.push({
                            id: Date.now() + Math.random(),
                            title: link.textContent.trim() || 'Untitled',
                            url: link.href,
                            description: link.title || '',
                            tags: ['imported'],
                            importedAt: new Date().toISOString()
                        });
                    });
                }

                if (bookmarks.length > 0) {
                    LifeOS.core.state.data.bookmarks.push(...bookmarks);
                    LifeOS.core.saveData();
                    this.renderGrid();
                    LifeOS.ui.showToast(`Imported ${bookmarks.length} bookmarks successfully!`, 'success');
                } else {
                    LifeOS.ui.showToast('No valid bookmarks found in file', 'error');
                }
            } catch (error) {
                LifeOS.ui.showToast('Error importing file', 'error');
            }
        };
        reader.readAsText(file);
    }
};

// Global function for filters toggle
function toggleBookmarksFilters() {
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