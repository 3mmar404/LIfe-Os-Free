// LifeOS - UI Module v2.1 (Fortified & Finalized)
if (!LifeOS) { var LifeOS = {}; }

LifeOS.ui = {
    init: function() {
        // Event listeners for static UI elements
        document.querySelector('.theme-toggle').addEventListener('click', this.toggleTheme.bind(this));
        
        // --- TACTICAL FIX IMPLEMENTED ---
        document.querySelector('.settings-btn').addEventListener('click', () => LifeOS.router.navigate('tools'));
        
        // Modal close on outside click
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modal')) {
                this.closeModal();
            }
        });
        
        // Mobile keyboard handling
        this.initMobileKeyboardSupport();
    },

    initMobileKeyboardSupport: function() {
        let viewportHeight = window.innerHeight;
        
        window.addEventListener('resize', () => {
            const currentHeight = window.innerHeight;
            const heightDiff = viewportHeight - currentHeight;
            
            // Keyboard likely opened if height decreased significantly
            if (heightDiff > 150) {
                document.body.classList.add('keyboard-open');
                // Scroll active input into view
                const activeElement = document.activeElement;
                if (activeElement && activeElement.tagName === 'INPUT') {
                    setTimeout(() => {
                        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }
            } else {
                document.body.classList.remove('keyboard-open');
            }
        });
        
        // Handle input focus for mobile
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('input, textarea')) {
                setTimeout(() => {
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    },
    
    showModal: function(title, content) {
        document.querySelector('.modal-title').textContent = title;
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';
        if (typeof content === 'string') {
            modalBody.innerHTML = content;
        } else {
            modalBody.appendChild(content);
        }
        document.getElementById('modal').classList.add('active');
    },

    closeModal: function() {
        document.getElementById('modal').classList.remove('active');
    },

    showToast: function(message, type = 'success') {
        const toast = document.getElementById('toast');
        const messageEl = document.querySelector('.toast-message');
        messageEl.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    },

    applyTheme: function() {
        const root = document.documentElement;
        const theme = LifeOS.core.state.data.settings.theme;
        const themeIcon = document.querySelector('.theme-toggle i');

        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
        } else { // dark
            root.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
        }
    },

    toggleTheme: function() {
        const currentTheme = LifeOS.core.state.data.settings.theme;
        LifeOS.core.state.data.settings.theme = (currentTheme === 'dark' ? 'light' : 'dark');
        this.applyTheme();
        LifeOS.core.saveSettings();
        const isEnglish = LifeOS.core.state.data.settings.language === 'en';
        const message = isEnglish 
            ? `Switched to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`
            : `تم التبديل إلى الثيم ${currentTheme === 'dark' ? 'الفاتح' : 'المظلم'}`;
        this.showToast(message, 'success');
    },

    promptForPassword: function() {
        return new Promise(resolve => {
            const form = document.createElement('form');
            const isEnglish = LifeOS.core.state.data.settings.language === 'en';
            
            const formContent = isEnglish 
                ? `<p class="mb-2 text-secondary">Enter your master password to decrypt your data.</p><div class="form-group"><label class="form-label">Master Password</label><input type="password" class="form-input" id="auth-password" required></div><button type="submit" class="btn btn-success" style="width: 100%;"><i class="fas fa-unlock-alt"></i> Unlock Vault</button>`
                : `<p class="mb-2 text-secondary">أدخل كلمة المرور الرئيسية لفك تشفير بياناتك.</p><div class="form-group"><label class="form-label">كلمة المرور الرئيسية</label><input type="password" class="form-input" id="auth-password" required></div><button type="submit" class="btn btn-success" style="width: 100%;"><i class="fas fa-unlock-alt"></i> فتح الخزنة</button>`;
            
            form.innerHTML = formContent;
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const password = document.getElementById('auth-password').value;
                this.closeModal();
                resolve(password);
            });
            
            const title = isEnglish ? 'Authentication' : 'التحقق من الهوية';
            this.showModal(title, form);
            document.getElementById('auth-password').focus();
        });
    },

    promptForNewPassword: function() {
        return new Promise(resolve => {
            const form = document.createElement('form');
            const isEnglish = LifeOS.core.state.data.settings.language === 'en';
            
            const formContent = isEnglish 
                ? `<p class="mb-2 text-secondary">Welcome to LifeOS. Please set a strong master password to encrypt and protect your data.</p><div class="form-group"><label class="form-label">New Master Password</label><input type="password" class="form-input" id="new-master-password" required minlength="8"></div><div class="form-group"><label class="form-label">Confirm Password</label><input type="password" class="form-input" id="confirm-master-password" required></div><button type="submit" class="btn btn-success" style="width: 100%;"><i class="fas fa-shield-halved"></i> Set & Encrypt</button>`
                : `<p class="mb-2 text-secondary">مرحباً بك في LifeOS. يرجى تعيين كلمة مرور رئيسية قوية لتشفير وحماية بياناتك.</p><div class="form-group"><label class="form-label">كلمة المرور الرئيسية الجديدة</label><input type="password" class="form-input" id="new-master-password" required minlength="8"></div><div class="form-group"><label class="form-label">تأكيد كلمة المرور</label><input type="password" class="form-input" id="confirm-master-password" required></div><button type="submit" class="btn btn-success" style="width: 100%;"><i class="fas fa-shield-halved"></i> تعيين وتشفير</button>`;
            
            form.innerHTML = formContent;
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const newPass = document.getElementById('new-master-password').value;
                const confirmPass = document.getElementById('confirm-master-password').value;
                
                const errorMsg1 = isEnglish ? "Password must be at least 8 characters long" : "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
                const errorMsg2 = isEnglish ? "Passwords do not match" : "كلمات المرور غير متطابقة";
                
                if (newPass.length < 8) { this.showToast(errorMsg1, "error"); return; }
                if (newPass !== confirmPass) { this.showToast(errorMsg2, "error"); return; }
                this.closeModal();
                resolve(newPass);
            });
            
            const title = isEnglish ? 'Setup Digital Vault' : 'إعداد الحصن الرقمي';
            this.showModal(title, form);
            document.getElementById('new-master-password').focus();
        });
    },

    showFatalError: function(message) {
        const isEnglish = LifeOS.core.state.data.settings.language === 'en';
        const title = isEnglish ? 'Fatal Error' : 'خطأ فادح';
        document.body.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; height:100vh; flex-direction:column; padding: 2rem; text-align:center; background-color: var(--bg-color); color: var(--text-primary);"><i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: var(--danger-color); margin-bottom: 1rem;"></i><h1 style="color: var(--danger-color);">${title}</h1><p style="font-size: 1.2rem; margin-top: 1rem;">${message}</p></div>`;
    },

    showNotification: function(message, type = 'info') {
        this.showToast(message, type);
    },

    hideModal: function() {
        this.closeModal();
    }
};

// Global functions for mobile menu and filters
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const btn = document.querySelector('.mobile-menu-btn');
    nav.classList.toggle('mobile-open');
    btn.classList.toggle('active');
}

// Auto-close mobile menu when nav tab is clicked or clicked outside
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Close when nav tab clicked
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            if (nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Close when clicking outside menu
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('mobile-open') && 
            !nav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('mobile-open');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

function toggleFilters() {
    const content = document.querySelector('#passwords .filters-content');
    const toggle = document.querySelector('#passwords .filters-toggle i');
    
    if (content && toggle) {
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            content.classList.add('collapsed');
            toggle.className = 'fas fa-chevron-left';
        } else {
            content.classList.remove('collapsed');
            content.classList.add('expanded');
            toggle.className = 'fas fa-chevron-down';
        }
    }
}

function toggleContactsFilters() {
    const content = document.querySelector('#contacts .filters-content');
    const toggle = document.querySelector('#contacts .filters-toggle i');
    
    if (content && toggle) {
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            content.classList.add('collapsed');
            toggle.className = 'fas fa-chevron-left';
        } else {
            content.classList.remove('collapsed');
            content.classList.add('expanded');
            toggle.className = 'fas fa-chevron-down';
        }
    }
}

function toggleBookmarksFilters() {
    const content = document.querySelector('#bookmarks .filters-content');
    const toggle = document.querySelector('#bookmarks .filters-toggle i');
    
    if (content && toggle) {
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            content.classList.add('collapsed');
            toggle.className = 'fas fa-chevron-left';
        } else {
            content.classList.remove('collapsed');
            content.classList.add('expanded');
            toggle.className = 'fas fa-chevron-down';
        }
    }
}