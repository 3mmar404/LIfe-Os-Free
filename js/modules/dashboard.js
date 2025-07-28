// LifeOS - Dashboard Module v3.0 (Command & Control Center)
if (!LifeOS) { var LifeOS = {}; }

LifeOS.dashboard = {
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
            <h2 class="welcome-header" style="margin-bottom: 2rem;">لوحة التحكم، مرحبًا أيها القائد.</h2>
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-key"></i><h3 class="card-title">كلمات المرور</h3></div>
                    <div class="card-stats">
                        <div class="stat-item"><div class="stat-number" id="passwords-count">0</div><div class="stat-label">ملف</div></div>
                        <div class="stat-item"><div class="stat-number" id="passwords-categories">0</div><div class="stat-label">تصنيف</div></div>
                    </div>
                    <div class="card-actions"><button class="btn btn-small" onclick="LifeOS.router.navigate('passwords')"><i class="fas fa-arrow-left"></i> إدارة</button></div>
                </div>
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-address-book"></i><h3 class="card-title">ملفات الاتصال</h3></div>
                    <div class="card-stats">
                        <div class="stat-item"><div class="stat-number" id="contacts-count">0</div><div class="stat-label">ملف</div></div>
                        <div class="stat-item"><div class="stat-number" id="contacts-recent">0</div><div class="stat-label">أضيف بالأسبوع الأخير</div></div>
                    </div>
                     <div class="card-actions"><button class="btn btn-small" onclick="LifeOS.router.navigate('contacts')"><i class="fas fa-arrow-left"></i> إدارة</button></div>
                </div>
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-bookmark"></i><h3 class="card-title">الروابط المفضلة</h3></div>
                    <div class="card-stats">
                        <div class="stat-item"><div class="stat-number" id="bookmarks-count">0</div><div class="stat-label">رابط</div></div>
                        <div class="stat-item"><div class="stat-number" id="bookmarks-categories">0</div><div class="stat-label">مجموعة</div></div>
                    </div>
                     <div class="card-actions"><button class="btn btn-small" onclick="LifeOS.router.navigate('bookmarks')"><i class="fas fa-arrow-left"></i> إدارة</button></div>
                </div>
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-hdd"></i><h3 class="card-title">إحصائيات النظام</h3></div>
                    <div class="card-stats">
                        <div class="stat-item"><div class="stat-number" id="total-items">0</div><div class="stat-label">إجمالي العناصر</div></div>
                        <div class="stat-item"><div class="stat-number" id="storage-used">0</div><div class="stat-label">KB (مشفّر)</div></div>
                    </div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem;">
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-history"></i><h3 class="card-title">موجز النشاط الذكي</h3></div>
                    <div id="recent-activity-container" style="display: flex; flex-direction: column; gap: 0.8rem;">
                        <p class="text-center" style="color: var(--text-secondary);"><i class="fas fa-info-circle"></i> لا توجد أنشطة حديثة</p>
                    </div>
                </div>
                <div class="dashboard-card" style="display: flex; align-items: center; justify-content: center; padding: 1rem;">
                    <img src="assests/poster.webp" alt="LifeOS Free" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
                </div>
            </div>
        `;
    },

    updateStats: function() {
        const { passwords, contacts, bookmarks } = LifeOS.core.state.data;
        document.getElementById('passwords-count').textContent = passwords.length;
        document.getElementById('contacts-count').textContent = contacts.length;
        document.getElementById('bookmarks-count').textContent = bookmarks.length;
        document.getElementById('total-items').textContent = passwords.length + contacts.length + bookmarks.length;
        
        const passCats = new Set(passwords.flatMap(p => p.tags || []));
        document.getElementById('passwords-categories').textContent = passCats.size;
        
        const recentContacts = contacts.filter(c => new Date(c.created || 0) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
        document.getElementById('contacts-recent').textContent = recentContacts;
        
        const bookCats = new Set(bookmarks.flatMap(b => b.categories || []));
        document.getElementById('bookmarks-categories').textContent = bookCats.size;

        const encryptedData = localStorage.getItem('LifeOS_EncryptedData');
        const storageUsed = encryptedData ? Math.round(encryptedData.length / 1024) : 0;
        document.getElementById('storage-used').textContent = storageUsed;
    },

    loadRecentActivity: function() {
        const activityContainer = document.getElementById('recent-activity-container');
        const allItems = [
            ...LifeOS.core.state.data.passwords.map(p => ({ type: 'password', name: p.platform, date: p.updated || p.created })),
            ...LifeOS.core.state.data.contacts.map(c => ({ type: 'contact', name: c.name, date: c.updated || c.created })),
            ...LifeOS.core.state.data.bookmarks.map(b => ({ type: 'bookmark', name: b.title, date: b.updated || b.created }))
        ];

        const recent = allItems
            .filter(item => item.date)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        activityContainer.innerHTML = '';
        if (recent.length === 0) {
            const placeholder = document.createElement('p');
            placeholder.className = 'text-center';
            placeholder.style.color = 'var(--text-secondary)';
            placeholder.innerHTML = `<i class="fas fa-info-circle"></i> لا توجد أنشطة حديثة`;
            activityContainer.appendChild(placeholder);
            return;
        }

        const icons = {
            password: 'fas fa-key',
            contact: 'fas fa-address-book',
            bookmark: 'fas fa-bookmark'
        };

        recent.forEach(item => {
            const activityElement = document.createElement('div');
            activityElement.style.cssText = "display: flex; align-items: center; gap: 1rem; padding: 0.8rem; background-color: var(--secondary-color); border-radius: var(--border-radius); border-left: 3px solid var(--accent-color)";
            
            const icon = document.createElement('i');
            icon.className = `${icons[item.type]} card-icon`;
            icon.style.fontSize = '1.2rem';

            const textDiv = document.createElement('div');
            textDiv.style.flex = '1';

            const nameDiv = document.createElement('div');
            nameDiv.style.fontWeight = '500';
            nameDiv.textContent = item.name || 'عنصر';

            const dateDiv = document.createElement('div');
            dateDiv.style.color = 'var(--text-secondary)';
            dateDiv.style.fontSize = '0.9rem';
            dateDiv.textContent = this._getRelativeTime(item.date);

            textDiv.append(nameDiv, dateDiv);
            activityElement.append(icon, textDiv);
            activityContainer.appendChild(activityElement);
        });
    },
    
    _getRelativeTime: function(date) {
        const now = new Date();
        const past = new Date(date);
        const diffInSeconds = Math.floor((now - past) / 1000);

        const intervals = {
            'عام': 31536000,
            'شهر': 2592000,
            'أسبوع': 604800,
            'يوم': 86400,
            'ساعة': 3600,
            'دقيقة': 60
        };

        if (diffInSeconds < 30) return "الآن";
        if (diffInSeconds < 60) return `قبل ${diffInSeconds} ثانية`;
        
        for (const [intervalName, secondsInInterval] of Object.entries(intervals)) {
            const intervalCount = Math.floor(diffInSeconds / secondsInInterval);
            if (intervalCount >= 1) {
                if(intervalCount === 1) return `منذ ${intervalName}`;
                if(intervalCount === 2) return `منذ ${intervalName.replace('ا','').replace('و','ي')}ين`;
                if(intervalCount > 2 && intervalCount < 11) {
                    if(intervalName === 'عام') return `منذ ${intervalCount} أعوام`;
                    if(intervalName === 'شهر') return `منذ ${intervalCount} أشهر`;
                    return `منذ ${intervalCount} ${intervalName === 'أسبوع' ? 'أسابيع' : intervalName === 'يوم' ? 'أيام' : intervalName + 'ات' }`;
                }
                return `منذ ${intervalCount} ${intervalName}`;
            }
        }
        return `قبل ${diffInSeconds} ثانية`;
    }
};