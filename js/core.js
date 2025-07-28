// LifeOS - Core System v2.0
// Manages application state, data persistence, and initialization.

if (!LifeOS) { var LifeOS = {}; }

LifeOS.core = {
    // Application State
    state: {
        currentModule: 'dashboard',
        data: {
            passwords: [],
            contacts: [],
            bookmarks: [],
            settings: {
                theme: 'dark',
                language: 'ar'
            },
            security: {
                salt: null,
                testString: null
            }
        }
    },

    // Initialize the application
    init: async function() {
        console.log('🚀 LifeOS v2.0 Starting...');
        this.loadSettings(); // Load non-sensitive settings first
        LifeOS.ui.applyTheme();

        const hasMasterPassword = !!localStorage.getItem('LifeOS_Security');
        
        if (hasMasterPassword) {
            // If password exists, prompt for it.
            const password = await LifeOS.ui.promptForPassword();
            if (!password) {
                LifeOS.ui.showFatalError("كلمة المرور مطلوبة للوصول إلى بياناتك.");
                return;
            }
            const securityData = JSON.parse(localStorage.getItem('LifeOS_Security'));
            const authenticated = await LifeOS.security.authenticate(password, securityData.salt, securityData.testString);
            
            if (authenticated) {
                await this.loadEncryptedData();
                this.startApplication();
            } else {
                LifeOS.ui.showFatalError("كلمة المرور غير صحيحة. حاول إعادة تحميل الصفحة.");
            }
        } else {
            // No password set, check if there's old unencrypted data to migrate
            const oldData = localStorage.getItem('LifeOS_Data');
            if (oldData) {
                // TODO: Implement migration logic for old unencrypted data
                console.warn("Found old unencrypted data. Migration is required.");
            }
            // Prompt to set a new password
            const newPassword = await LifeOS.ui.promptForNewPassword();
            if (newPassword) {
                const securityPayload = await LifeOS.security.setupMasterPassword(newPassword);
                this.state.data.security = securityPayload;
                localStorage.setItem('LifeOS_Security', JSON.stringify(securityPayload));
                this.startApplication();
            } else {
                 LifeOS.ui.showFatalError("يجب تعيين كلمة مرور رئيسية لاستخدام التطبيق.");
            }
        }
    },

    startApplication: function() {
        LifeOS.router.init();
        LifeOS.ui.init();
        LifeOS.router.navigate('dashboard');
        console.log('✅ LifeOS v2.0 Started Successfully');
    },

    loadSettings: function() {
        const settings = localStorage.getItem('LifeOS_Settings');
        if (settings) {
            this.state.data.settings = JSON.parse(settings);
        }
    },

    saveSettings: function() {
        localStorage.setItem('LifeOS_Settings', JSON.stringify(this.state.data.settings));
    },

    loadEncryptedData: async function() {
        const encryptedData = localStorage.getItem('LifeOS_EncryptedData');
        if (encryptedData) {
            try {
                const decryptedJSON = await LifeOS.security.decrypt(encryptedData, LifeOS.security.encryptionKey);
                const decryptedData = JSON.parse(decryptedJSON);
                
                // Merge decrypted data into state
                this.state.data.passwords = decryptedData.passwords || [];
                this.state.data.contacts = decryptedData.contacts || [];
                this.state.data.bookmarks = decryptedData.bookmarks || [];

                console.log("Encrypted data loaded and decrypted successfully.");

            } catch (error) {
                console.error("FATAL: Could not decrypt data blob.", error);
                LifeOS.ui.showFatalError("فشل في فك تشفير البيانات. قد تكون البيانات تالفة.");
            }
        }
    },

    saveData: async function() {
        if (!LifeOS.security.isAuthenticated) {
            console.error("Cannot save data: Not authenticated.");
            LifeOS.ui.showToast("خطأ: غير مصادق عليه. لا يمكن حفظ البيانات.", "error");
            return;
        }

        try {
            // Prepare data blob for encryption (without settings or security info)
            const dataToEncrypt = {
                passwords: this.state.data.passwords,
                contacts: this.state.data.contacts,
                bookmarks: this.state.data.bookmarks,
            };

            const plaintext = JSON.stringify(dataToEncrypt);
            const encryptedData = await LifeOS.security.encrypt(plaintext, LifeOS.security.encryptionKey);
            
            localStorage.setItem('LifeOS_EncryptedData', encryptedData);
            this.saveSettings(); // Save settings separately and unencrypted
            
            console.log("Data saved and encrypted successfully.");

        } catch (error) {
            console.error("FATAL: Could not encrypt and save data.", error);
            LifeOS.ui.showToast("خطأ فادح في حفظ البيانات", 'error');
        }
    },

    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Improved debouncer function
    debounce: function(func, delay = 300) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    },
    
    // Sanitizer to prevent XSS
    sanitize: function(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
};