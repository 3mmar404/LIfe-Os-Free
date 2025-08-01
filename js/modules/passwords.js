// LifeOS - Passwords Module v3.0 (IRIS Project - Complete)
if (!LifeOS) { var LifeOS = {}; }

LifeOS.passwords = {
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
                    <input type="text" id="passwords-search" class="search-input" placeholder="البحث في الحسابات...">
                </div>
                <button class="btn btn-success"><i class="fas fa-plus"></i> إضافة حساب</button>
                <button class="btn btn-secondary import-btn"><i class="fas fa-upload"></i> استيراد JSON</button>
                <input type="file" class="import-input" accept=".json" style="display:none">
            </div>
            <div class="filters-wrapper">
                <div class="filters-header" onclick="toggleFilters()">
                    <h4><i class="fas fa-filter"></i> التصنيفات</h4>
                    <button class="filters-toggle"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="filters-content expanded">
                    <div id="passwords-filters" class="filter-tags-container"></div>
                </div>
            </div>
            <div id="passwords-grid" class="cards-grid"></div>
            <div id="passwords-empty" style="display:none; text-align:center;">
                <i class="fas fa-key" style="font-size:3rem;color:var(--text-muted);margin-bottom:1rem;"></i>
                <p style="color:var(--text-secondary);">لا توجد حسابات. ابدأ بإضافة حساب جديد.</p>
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
                        <button title="إظهار/إخفاء" class="btn btn-small btn-secondary toggle-vis-btn"><i class="fas fa-eye"></i></button>
                        <button title="نسخ كلمة المرور" class="btn btn-small btn-secondary copy-pass-btn"><i class="fas fa-copy"></i></button>
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
        [{icon:'fa-user-tag', title:'نسخ اسم المستخدم', action:()=>this.copyUsername(item.id)}, {icon:'fa-edit', title:'تعديل', action:()=>this.showForm(item)}, {icon:'fa-trash', title:'حذف', action:()=>this.delete(item.id), danger:true}].forEach(b => {
            const btn = document.createElement('button');
            btn.className = `btn btn-small ${b.danger ? 'btn-danger' : 'btn-secondary'}`;
            btn.title = b.title;
            btn.innerHTML = `<i class="fas ${b.icon}"></i> ${b.title}`;
            btn.onclick = b.action;
            actionsContainer.appendChild(btn);
        });
        return card;
    },

    showForm: function(item = null) {
        const isEdit = !!item;
        const content = document.createElement('div');
        content.innerHTML = `
            <form id="password-edit-form" style="display: grid; gap: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">اسم الموقع/التطبيق</label>
                    <input type="text" id="platform" class="form-input" placeholder="مثال: Gmail, Facebook" required>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">اسم المستخدم/البريد الإلكتروني</label>
                    <input type="text" id="username" class="form-input" placeholder="مثال: user@example.com" required>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">كلمة المرور</label>
                    <div style="position: relative;">
                        <input type="password" id="password" class="form-input" placeholder="كلمة المرور" required style="padding-left: 3rem;">
                        <button type="button" id="toggle-password" style="position: absolute; left: 0.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-secondary); cursor: pointer;">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">رابط الموقع (اختياري)</label>
                    <input type="url" id="website" class="form-input" placeholder="https://example.com">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">الفئة</label>
                    <select id="category" class="form-input">
                        <option value="شخصي">شخصي</option>
                        <option value="عمل">عمل</option>
                        <option value="اجتماعي">اجتماعي</option>
                        <option value="مالي">مالي</option>
                        <option value="ترفيه">ترفيه</option>
                        <option value="تسوق">تسوق</option>
                        <option value="أخرى">أخرى</option>
                        <option value="تخصيص">تخصيص...</option>
                    </select>
                    <input type="text" id="custom-category" class="form-input" placeholder="اكتب اسم الفئة الجديدة" style="display: none; margin-top: 0.5rem;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">ملاحظات (اختياري)</label>
                    <textarea id="notes" class="form-input" rows="3" placeholder="أي ملاحظات إضافية..."></textarea>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button type="submit" class="btn btn-success" style="flex: 1;">
                        <i class="fas fa-save"></i> ${isEdit ? 'تحديث' : 'حفظ'}
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="LifeOS.ui.closeModal()" style="flex: 1;">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </form>
        `;

        // ملء البيانات في حالة التعديل
        if (isEdit) {
            content.querySelector('#platform').value = item.platform || '';
            content.querySelector('#username').value = item.username || '';
            content.querySelector('#password').value = item.password || '';
            content.querySelector('#website').value = item.website || '';
            content.querySelector('#category').value = item.category || 'شخصي';
            content.querySelector('#notes').value = item.notes || '';
        }

        // إضافة الأحداث
        content.querySelector('#toggle-password').onclick = function() {
            const passwordInput = content.querySelector('#password');
            const icon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'fas fa-eye';
            }
        };

        content.querySelector('#category').onchange = function() {
            const customInput = content.querySelector('#custom-category');
            if (this.value === 'تخصيص') {
                customInput.style.display = 'block';
                customInput.required = true;
                customInput.focus();
            } else {
                customInput.style.display = 'none';
                customInput.required = false;
                customInput.value = '';
            }
        };

        content.querySelector('#password-edit-form').onsubmit = async (e) => {
            e.preventDefault();
            
            // تحديد الفئة
            let selectedCategory = content.querySelector('#category').value;
            if (selectedCategory === 'تخصيص') {
                selectedCategory = content.querySelector('#custom-category').value.trim();
                if (!selectedCategory) {
                    LifeOS.ui.showToast('يرجى كتابة اسم الفئة المخصصة', 'error');
                    return;
                }
            }

            const formData = {
                id: isEdit ? item.id : LifeOS.core.generateId(),
                platform: content.querySelector('#platform').value.trim(),
                username: content.querySelector('#username').value.trim(),
                password: content.querySelector('#password').value,
                website: content.querySelector('#website').value.trim(),
                category: selectedCategory,
                notes: content.querySelector('#notes').value.trim(),
                created: isEdit ? (item.created || Date.now()) : Date.now(),
                updated: Date.now(),
                tags: [selectedCategory]
            };

            if (!formData.platform || !formData.username || !formData.password) {
                LifeOS.ui.showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            if (isEdit) {
                const index = LifeOS.core.state.data.passwords.findIndex(p => p.id === item.id);
                if (index > -1) LifeOS.core.state.data.passwords[index] = formData;
            } else {
                LifeOS.core.state.data.passwords.push(formData);
            }

            await LifeOS.core.saveData();
            LifeOS.ui.closeModal();
            LifeOS.ui.showToast(isEdit ? 'تم تحديث كلمة المرور بنجاح' : 'تم إضافة كلمة المرور بنجاح', 'success');
            this.renderGrid();
            LifeOS.dashboard.load();
        };

        LifeOS.ui.showModal(isEdit ? 'تعديل كلمة المرور' : 'إضافة كلمة مرور جديدة', content);
    },
    
    copyUsername: function(id) { const i = LifeOS.core.state.data.passwords.find(p=>p.id===id); if(i) navigator.clipboard.writeText(i.username).then(()=>LifeOS.ui.showToast('تم نسخ اسم المستخدم')).catch(()=>LifeOS.ui.showToast('فشل النسخ','error')); },
    copyPassword: function(id) { const i = LifeOS.core.state.data.passwords.find(p=>p.id===id); if(i) navigator.clipboard.writeText(i.password).then(()=>LifeOS.ui.showToast('تم نسخ كلمة المرور')).catch(()=>LifeOS.ui.showToast('فشل النسخ','error')); },
    togglePassword: function(id, el, iconEl) { const i=LifeOS.core.state.data.passwords.find(p=>p.id===id); if(i){if(el.textContent==='••••••••••'){el.textContent=i.password; el.style.color = 'var(--accent-hover)'; iconEl.className='fas fa-eye-slash';}else{el.textContent='••••••••••'; el.style.color = 'var(--text-primary)'; iconEl.className='fas fa-eye';}}},
    delete: async function(id) { if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) { LifeOS.core.state.data.passwords = LifeOS.core.state.data.passwords.filter(p => p.id !== id); await LifeOS.core.saveData(); LifeOS.ui.showToast('تم حذف الحساب', 'success'); this.renderGrid(); LifeOS.dashboard.load(); } },

    updateFilters: function() { const container = document.getElementById('passwords-filters'); container.innerHTML = ''; const allTags = new Set(LifeOS.core.state.data.passwords.flatMap(item => item.tags || [])); const createTag = (tag) => { const tagEl = document.createElement('div'); tagEl.className = `filter-tag ${tag === this.currentFilter ? 'active' : ''}`; tagEl.dataset.filter = tag; tagEl.textContent = tag === 'all' ? 'الكل' : tag; tagEl.addEventListener('click', () => { this.currentFilter = tag; this.renderGrid(); }); return tagEl; }; container.appendChild(createTag('all')); allTags.forEach(tag => container.appendChild(createTag(tag))); },
    
    handleExternalImport: function(file) { if (!file) return; const reader = new FileReader(); reader.onload = async (e) => { try { const parsedData = this.parseJSON(e.target.result); if (parsedData.length === 0) { LifeOS.ui.showToast('لم يتم العثور على بيانات صالحة في الملف', 'warning'); return; } const confirmed = await this.showImportConfirmation(parsedData); if (confirmed) { this.mergeImportedData(parsedData); await LifeOS.core.saveData(); LifeOS.ui.showToast(`تم دمج ${parsedData.length} حساب بنجاح`, 'success'); this.renderGrid(); LifeOS.dashboard.load(); } } catch (error) { console.error("External import failed:", error); LifeOS.ui.showToast('فشل في معالجة الملف', 'error'); } }; reader.readAsText(file); },
    showImportConfirmation: function(data) { return new Promise(resolve => { const content = document.createElement('div'); content.innerHTML = `<p class="mb-2">تم العثور على <strong>${data.length}</strong> حساب في الملف. هل تود إضافتها؟</p><h4 class="mb-1 mt-3">عينة:</h4><div style="background: var(--bg-color); padding: 0.8rem; border-radius: 8px; font-size: 0.9rem; max-height: 150px; overflow-y: auto;">${data.slice(0, 5).map(item => `<div><strong>${LifeOS.core.sanitize(item.platform || '')}</strong> - ${LifeOS.core.sanitize(item.username || '')}</div>`).join('')}</div><div class="flex gap-2 mt-3"><button class="btn btn-success confirm-btn" style="flex:1;"><i class="fas fa-check"></i> تأكيد الدمج</button><button class="btn btn-danger cancel-btn" style="flex:1;"><i class="fas fa-times"></i> إلغاء</button></div>`; content.querySelector('.confirm-btn').onclick = () => { LifeOS.ui.closeModal(); resolve(true); }; content.querySelector('.cancel-btn').onclick = () => { LifeOS.ui.closeModal(); resolve(false); }; LifeOS.ui.showModal('تأكيد استيراد البيانات الخارجية', content); }); },
    mergeImportedData: function(dataToMerge) { dataToMerge.forEach(item => { const newItem = { id: LifeOS.core.generateId(), platform: item.platform || item.name || 'غير معروف', username: item.username || item.login?.username || '', password: item.password || item.login?.password || '', tags: item.tags ? [...new Set([...item.tags, 'مستورد'])] : ['مستورد'], created: Date.now(), updated: Date.now() }; if (!newItem.platform || !newItem.username || !newItem.password) return; const exists = LifeOS.core.state.data.passwords.some(p => p.platform === newItem.platform && p.username === newItem.username); if (!exists) { LifeOS.core.state.data.passwords.push(newItem); } }); },
    parseJSON: function(content) { try { const data = JSON.parse(content); if (Array.isArray(data)) return data; if (data.passwords && Array.isArray(data.passwords)) return data.passwords; if (data.items && Array.isArray(data.items)) { return data.items.filter(i => i.type === 1 && i.login).map(i => ({ platform: i.name, username: i.login.username, password: i.login.password, })); } return []; } catch { return []; } },

    showAddForm: function() {
        const content = document.createElement('div');
        content.innerHTML = `
            <form id="password-form" style="display: grid; gap: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">اسم الموقع/التطبيق</label>
                    <input type="text" id="platform" class="form-input" placeholder="مثال: Gmail, Facebook" required>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">اسم المستخدم/البريد الإلكتروني</label>
                    <input type="text" id="username" class="form-input" placeholder="مثال: user@example.com" required>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">كلمة المرور</label>
                    <div style="position: relative;">
                        <input type="password" id="password" class="form-input" placeholder="كلمة المرور" required style="padding-left: 3rem;">
                        <button type="button" id="toggle-password" style="position: absolute; left: 0.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-secondary); cursor: pointer;">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">رابط الموقع (اختياري)</label>
                    <input type="url" id="website" class="form-input" placeholder="https://example.com">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">الفئة</label>
                    <select id="category" class="form-input">
                        <option value="شخصي">شخصي</option>
                        <option value="عمل">عمل</option>
                        <option value="اجتماعي">اجتماعي</option>
                        <option value="مالي">مالي</option>
                        <option value="ترفيه">ترفيه</option>
                        <option value="تسوق">تسوق</option>
                        <option value="أخرى">أخرى</option>
                        <option value="تخصيص">تخصيص...</option>
                    </select>
                    <input type="text" id="custom-category" class="form-input" placeholder="اكتب اسم الفئة الجديدة" style="display: none; margin-top: 0.5rem;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">ملاحظات (اختياري)</label>
                    <textarea id="notes" class="form-input" rows="3" placeholder="أي ملاحظات إضافية..."></textarea>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button type="submit" class="btn btn-success" style="flex: 1;">
                        <i class="fas fa-save"></i> حفظ
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="LifeOS.ui.closeModal()" style="flex: 1;">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </form>
        `;

        // إضافة الأحداث
        content.querySelector('#toggle-password').onclick = function() {
            const passwordInput = content.querySelector('#password');
            const icon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'fas fa-eye';
            }
        };

        content.querySelector('#category').onchange = function() {
            const customInput = content.querySelector('#custom-category');
            if (this.value === 'تخصيص') {
                customInput.style.display = 'block';
                customInput.required = true;
                customInput.focus();
            } else {
                customInput.style.display = 'none';
                customInput.required = false;
                customInput.value = '';
            }
        };

        content.querySelector('#password-form').onsubmit = async (e) => {
            e.preventDefault();
            // تحديد الفئة
            let selectedCategory = content.querySelector('#category').value;
            if (selectedCategory === 'تخصيص') {
                selectedCategory = content.querySelector('#custom-category').value.trim();
                if (!selectedCategory) {
                    LifeOS.ui.showToast('يرجى كتابة اسم الفئة المخصصة', 'error');
                    return;
                }
            }

            const formData = {
                id: LifeOS.core.generateId(),
                platform: content.querySelector('#platform').value.trim(),
                username: content.querySelector('#username').value.trim(),
                password: content.querySelector('#password').value,
                website: content.querySelector('#website').value.trim(),
                category: selectedCategory,
                notes: content.querySelector('#notes').value.trim(),
                created: Date.now(),
                updated: Date.now(),
                tags: [selectedCategory]
            };

            if (!formData.platform || !formData.username || !formData.password) {
                LifeOS.ui.showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            LifeOS.core.state.data.passwords.push(formData);
            await LifeOS.core.saveData();
            LifeOS.ui.closeModal();
            LifeOS.ui.showToast('تم إضافة كلمة المرور بنجاح', 'success');
            this.renderGrid();
            LifeOS.dashboard.load();
        };

        LifeOS.ui.showModal('إضافة كلمة مرور جديدة', content);
    }
};