// LifeOS Free - About Module (English) v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.aboutEn = {
    load: function() {
        const container = document.getElementById('about');
        container.innerHTML = `
            <div class="about-container">
                <!-- Hero Section -->
                <div class="about-hero">
                    <div class="hero-content">
                        <div class="hero-icon">
                            <i class="fas fa-brain"></i>
                        </div>
                        <h1 class="hero-title">LifeOS Free</h1>
                        <p class="hero-subtitle">Digital Life Management System</p>
                        <p class="hero-description">Simple, Secure, and Open Source</p>
                    </div>
                </div>

                <!-- Features Preview -->
                <div class="features-preview">
                    <h2 class="section-title">
                        <i class="fas fa-star"></i>
                        Why LifeOS?
                    </h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon offline">
                                <i class="fas fa-plug"></i>
                            </div>
                            <h4>Works Offline</h4>
                            <p>Everything happens on your device without needing internet connection</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon secure">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h4>Complete Security</h4>
                            <p>Strong local encryption using AES-256</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon opensource">
                                <i class="fas fa-code"></i>
                            </div>
                            <h4>Open Source</h4>
                            <p>You can review and modify the code according to your needs</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon lightweight">
                                <i class="fas fa-feather"></i>
                            </div>
                            <h4>Lightweight & Fast</h4>
                            <p>No installation required, works on any modern browser</p>
                        </div>
                    </div>
                </div>

                <!-- Help Section -->
                <div class="help-section">
                    <h2 class="section-title">
                        <i class="fas fa-question-circle"></i>
                        Need Help?
                    </h2>
                    <div class="help-content">
                        <p>Check out our comprehensive user guide to learn all features in detail</p>
                        <div class="help-buttons">
                            <button class="help-btn primary" onclick="LifeOS.router.navigate('documentation')">
                                <i class="fas fa-book-open"></i>
                                <span>Comprehensive User Guide</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Create English Documentation Module
LifeOS.documentationEn = {
    currentSection: 'about',
    
    load: function() {
        const container = document.getElementById('documentation');
        container.innerHTML = `
            <div class="documentation-container">
                <!-- Header Section -->
                <div class="doc-header">
                    <div class="doc-hero">
                        <div class="doc-title-section">
                            <h1 class="doc-main-title">
                                <i class="fas fa-brain doc-logo"></i>
                                LifeOS Free
                            </h1>
                            <p class="doc-subtitle">Digital Life Management System - Simple, Secure, and Open Source</p>
                        </div>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="doc-nav-tabs">
                    <button class="doc-tab active" data-section="about">
                        <i class="fas fa-info-circle"></i>
                        <span>About App</span>
                    </button>
                    <button class="doc-tab" data-section="quick-start">
                        <i class="fas fa-rocket"></i>
                        <span>Quick Start</span>
                    </button>
                    <button class="doc-tab" data-section="features">
                        <i class="fas fa-cogs"></i>
                        <span>Current Features</span>
                    </button>
                    <button class="doc-tab" data-section="future">
                        <i class="fas fa-road"></i>
                        <span>Future Features</span>
                    </button>
                    <button class="doc-tab" data-section="security">
                        <i class="fas fa-shield-alt"></i>
                        <span>Security & Privacy</span>
                    </button>
                    <button class="doc-tab" data-section="faq">
                        <i class="fas fa-question-circle"></i>
                        <span>FAQ</span>
                    </button>
                    <button class="doc-tab" data-section="contact">
                        <i class="fas fa-envelope"></i>
                        <span>Contact</span>
                    </button>
                </div>

                <!-- Content Area -->
                <div class="doc-content-area">
                    <div id="doc-content">
                        ${this.getAboutContent()}
                    </div>
                </div>
            </div>
        `;

        // Add tab navigation event listeners
        const self = this;
        container.querySelectorAll('.doc-tab').forEach(tab => {
            tab.addEventListener('click', function(e) {
                const section = e.currentTarget.dataset.section;
                
                // Update active tab
                container.querySelectorAll('.doc-tab').forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Show section content
                self.showSection(section);
            });
        });
    },

    showSection: function(section) {
        this.currentSection = section;
        const contentArea = document.getElementById('doc-content');
        
        switch(section) {
            case 'about':
                contentArea.innerHTML = this.getAboutContent();
                break;
            case 'quick-start':
                contentArea.innerHTML = this.getQuickStartContent();
                break;
            case 'features':
                contentArea.innerHTML = this.getFeaturesContent();
                break;
            case 'future':
                contentArea.innerHTML = this.getFutureContent();
                break;
            case 'security':
                contentArea.innerHTML = this.getSecurityContent();
                break;
            case 'faq':
                contentArea.innerHTML = this.getFAQContent();
                break;
            case 'contact':
                contentArea.innerHTML = this.getContactContent();
                break;
        }
    },

    getAboutContent: function() {
        return `
            <div class="doc-section">
                <h2 class="section-title">
                    <i class="fas fa-info-circle"></i>
                    About LifeOS Free
                </h2>
                
                <div class="content-card">
                    <p class="intro-text">
                        LifeOS Free is an open-source project that aims to provide a simple and secure system for managing your essential digital aspects such as:
                    </p>
                    
                    <div class="features-grid">
                        <div class="feature-item">
                            <i class="fas fa-key"></i>
                            <h4>Passwords</h4>
                            <p>Secure management of your accounts</p>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-users"></i>
                            <h4>Contacts</h4>
                            <p>Smart address book</p>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-bookmark"></i>
                            <h4>Bookmarks</h4>
                            <p>Library of your important links</p>
                        </div>
                    </div>
                    
                    <div class="highlight-box">
                        <i class="fas fa-lock"></i>
                        <p>
                            <strong>Everything is done locally on your device</strong> - without the need for internet connection or external servers. 
                            All your data remains completely yours, encrypted locally using strong techniques.
                        </p>
                    </div>
                </div>

                <div class="tech-specs">
                    <h3><i class="fas fa-cog"></i> Technical Information</h3>
                    <div class="specs-grid">
                        <div class="spec-item">
                            <span class="spec-label">Version:</span>
                            <span class="spec-value">Free Edition</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Interface:</span>
                            <span class="spec-value">Multilingual (Arabic/English)</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Technologies:</span>
                            <span class="spec-value">HTML5, CSS3, JavaScript</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Storage:</span>
                            <span class="spec-value">Local Storage (browser-based)</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Encryption:</span>
                            <span class="spec-value">AES-256 + PBKDF2</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Operation Mode:</span>
                            <span class="spec-value">Completely offline</span>
                        </div>
                    </div>
                </div>

                <div class="why-different">
                    <h3><i class="fas fa-star"></i> Why is LifeOS Different?</h3>
                    <div class="difference-items">
                        <div class="diff-item">
                            <i class="fas fa-plug"></i>
                            <span>Works without servers or internet</span>
                        </div>
                        <div class="diff-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>Everything is fully encrypted</span>
                        </div>
                        <div class="diff-item">
                            <i class="fas fa-code"></i>
                            <span>Open source and customizable</span>
                        </div>
                        <div class="diff-item">
                            <i class="fas fa-download"></i>
                            <span>No installation or external software needed</span>
                        </div>
                        <div class="diff-item">
                            <i class="fas fa-feather"></i>
                            <span>Lightweight and works on any modern browser</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getQuickStartContent: function() {
        return `
            <div class="doc-section">
                <h2 class="section-title">
                    <i class="fas fa-rocket"></i>
                    Quick Start
                </h2>
                
                <div class="welcome-message">
                    <h3>Welcome to LifeOS Free!</h3>
                    <p>Follow these steps to start using the system:</p>
                </div>

                <div class="steps-container">
                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4><i class="fas fa-key"></i> Set Master Password</h4>
                            <p>On first use, you'll be asked to create a master password to protect your data.</p>
                            <div class="step-tips">
                                <div class="tip">
                                    <i class="fas fa-lightbulb"></i>
                                    <span>Choose a strong, memorable password</span>
                                </div>
                                <div class="tip warning">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <span>Data cannot be recovered without it</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4><i class="fas fa-plus"></i> Add Your Data</h4>
                            <p>In each section (passwords, contacts, bookmarks), click the ➕ button to add a new item.</p>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4><i class="fas fa-search"></i> Search and Organize</h4>
                            <p>Use the search box to find data quickly and categorize items by type for easier access later.</p>
                        </div>
                    </div>
                </div>

                <div class="quick-actions">
                    <h3><i class="fas fa-bolt"></i> Start Now</h3>
                    <div class="action-buttons">
                        <button class="action-btn primary" onclick="LifeOS.router.navigate('passwords')">
                            <i class="fas fa-key"></i>
                            <span>Add Password</span>
                        </button>
                        <button class="action-btn secondary" onclick="LifeOS.router.navigate('contacts')">
                            <i class="fas fa-user-plus"></i>
                            <span>Add Contact</span>
                        </button>
                        <button class="action-btn tertiary" onclick="LifeOS.router.navigate('bookmarks')">
                            <i class="fas fa-bookmark"></i>
                            <span>Add Bookmark</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    getFeaturesContent: function() {
        return `
            <div class="doc-section">
                <h2 class="section-title">
                    <i class="fas fa-cogs"></i>
                    Current Features Guide
                </h2>

                <div class="feature-section">
                    <h3><i class="fas fa-key"></i> Password Management</h3>
                    <p class="feature-desc">LifeOS Free provides a secure account manager for storing your sensitive data:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-plus-circle"></i> Easy new account addition</li>
                        <li><i class="fas fa-eye"></i> Show/hide password</li>
                        <li><i class="fas fa-copy"></i> Copy username or password with one click</li>
                        <li><i class="fas fa-folder"></i> Categorize accounts (bank, social, work...)</li>
                        <li><i class="fas fa-file-import"></i> Import password files (JSON)</li>
                    </ul>
                </div>

                <div class="feature-section">
                    <h3><i class="fas fa-address-book"></i> Contact Management</h3>
                    <p class="feature-desc">Keep your contacts secure and organized smartly:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-user-plus"></i> Add name, phone, email...</li>
                        <li><i class="fas fa-tags"></i> Categorize by relationship type or workplace</li>
                        <li><i class="fas fa-search"></i> Quick search by name or type</li>
                        <li><i class="fas fa-database"></i> Your data is completely stored in the browser</li>
                    </ul>
                </div>

                <div class="feature-section">
                    <h3><i class="fas fa-bookmark"></i> Bookmark Management</h3>
                    <p class="feature-desc">Create your personal library of links and websites:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-link"></i> Save link + title + description</li>
                        <li><i class="fas fa-folder-open"></i> Organize links in folders</li>
                        <li><i class="fas fa-search-plus"></i> Smart search by keywords or category</li>
                        <li><i class="fas fa-external-link-alt"></i> Open links in new tab</li>
                    </ul>
                </div>

                <div class="feature-section">
                    <h3><i class="fas fa-tools"></i> Tools and Settings</h3>
                    <p class="feature-desc">From the tools section, you can have complete control over your data:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-download"></i> Export data: download encrypted backup</li>
                        <li><i class="fas fa-upload"></i> Import data: restore saved backup</li>
                        <li><i class="fas fa-key"></i> Change master password</li>
                        <li><i class="fas fa-trash-alt"></i> Clear all data from device (permanently)</li>
                    </ul>
                </div>
            </div>
        `;
    },

    getFutureContent: function() {
        return `
            <div class="doc-section">
                <h2 class="section-title">
                    <i class="fas fa-road"></i>
                    Future Features Roadmap
                </h2>
                
                <div class="future-intro">
                    <p class="intro-text">
                        We are currently working on transforming LifeOS Free from a simple tool into an integrated system 
                        for managing digital life without internet, combining absolute privacy with a smooth experience.
                    </p>
                </div>

                <div class="future-features">
                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-user-shield"></i>
                            <h3>1. Advanced Secure Account Manager</h3>
                        </div>
                        <ul class="feature-list">
                            <li>Advanced password categorization</li>
                            <li>Password strength analyzer</li>
                            <li>Duplicate password detector</li>
                            <li>Fake identity generator</li>
                            <li>Browser import functionality</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-address-book"></i>
                            <h3>2. Smart Contact Book</h3>
                        </div>
                        <ul class="feature-list">
                            <li>Google Contacts integration</li>
                            <li>Birthday reminders</li>
                            <li>WhatsApp quick access</li>
                            <li>Contact backup system</li>
                            <li>Relationship categorization</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-chart-line"></i>
                            <h3>3. Personal Finance Tracker</h3>
                        </div>
                        <ul class="feature-list">
                            <li>Expense tracking</li>
                            <li>Budget management</li>
                            <li>Financial reports</li>
                            <li>Goal setting</li>
                            <li>Spending alerts</li>
                        </ul>
                    </div>

                    <div class="future-feature highlight">
                        <div class="feature-header">
                            <i class="fas fa-brain"></i>
                            <h3>4. AI Assistant</h3>
                        </div>
                        <ul class="feature-list">
                            <li>Smart task organization</li>
                            <li>Financial analysis</li>
                            <li>Personalized recommendations</li>
                            <li>Auto-categorization</li>
                            <li>Natural language processing</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    getSecurityContent: function() {
        return `
            <div class="doc-section">
                <h2 class="section-title">
                    <i class="fas fa-shield-alt"></i>
                    Security and Privacy
                </h2>
                
                <div class="security-intro">
                    <div class="security-statement">
                        <i class="fas fa-lock"></i>
                        <h3>We believe that privacy is a fundamental right</h3>
                        <p>That's why LifeOS was built with clear principles that ensure maximum security for your data</p>
                    </div>
                </div>

                <div class="security-principles">
                    <div class="principle-card">
                        <div class="principle-icon">
                            <i class="fas fa-server"></i>
                        </div>
                        <div class="principle-content">
                            <h4>No data is sent outside your device</h4>
                            <p>All operations are performed locally within your browser only. No external servers or internet connections are required.</p>
                        </div>
                    </div>

                    <div class="principle-card">
                        <div class="principle-icon">
                            <i class="fas fa-key"></i>
                        </div>
                        <div class="principle-content">
                            <h4>All data is encrypted locally</h4>
                            <p>All your data is encrypted using a strong master password and advanced encryption algorithms.</p>
                        </div>
                    </div>

                    <div class="principle-card">
                        <div class="principle-icon">
                            <i class="fas fa-cloud-slash"></i>
                        </div>
                        <div class="principle-content">
                            <h4>No default or cloud synchronization</h4>
                            <p>To ensure complete security, nothing is uploaded to the cloud automatically. Synchronization is optional and fully controlled.</p>
                        </div>
                    </div>
                </div>

                <div class="encryption-details">
                    <h3><i class="fas fa-shield-virus"></i> Encryption Details</h3>
                    <div class="encryption-grid">
                        <div class="encryption-item">
                            <h4>AES-256</h4>
                            <p>Standard encryption algorithm used by governments and banks</p>
                        </div>
                        <div class="encryption-item">
                            <h4>PBKDF2</h4>
                            <p>Technology to strengthen passwords and protect them from brute force attacks</p>
                        </div>
                        <div class="encryption-item">
                            <h4>Local Storage</h4>
                            <p>Secure storage within your browser with additional protection layers</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getFAQContent: function() {
        return `
            <div class="doc-section">
                <h2 class="section-title">
                    <i class="fas fa-question-circle"></i>
                    Frequently Asked Questions
                </h2>

                <div class="faq-container">
                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-wifi"></i>
                            <h4>Does LifeOS need internet?</h4>
                        </div>
                        <div class="faq-answer">
                            <p>No, LifeOS works completely offline. All operations are performed within the local browser.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-database"></i>
                            <h4>Where is my data stored?</h4>
                        </div>
                        <div class="faq-answer">
                            <p>All data is saved locally in your browser using LocalStorage and encrypted with a master password.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-shield-alt"></i>
                            <h4>Is my data safe?</h4>
                        </div>
                        <div class="faq-answer">
                            <p>Yes, all data is encrypted locally using strong AES-256 standard. Nothing is sent to the internet or any external servers.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-mobile-alt"></i>
                            <h4>Does LifeOS work on mobile?</h4>
                        </div>
                        <div class="faq-answer">
                            <p>Yes, it works efficiently on smartphones — without needing any additional apps.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getContactContent: function() {
        return `
            <div class="doc-section">
                <h2 class="section-title">
                    <i class="fas fa-envelope"></i>
                    Contact LifeOS Team
                </h2>
                
                <div class="contact-intro">
                    <div class="team-info">
                        <h3><i class="fas fa-users"></i> LifeOS Team</h3>
                        <p>We are a team of developers passionate about privacy and technology, working to provide useful and secure tools for everyone.</p>
                    </div>
                </div>

                <div class="contact-methods">
                    <div class="contact-card facebook">
                        <div class="contact-icon">
                            <i class="fab fa-facebook"></i>
                        </div>
                        <div class="contact-info">
                            <h4>Facebook</h4>
                            <p>Follow us for the latest updates and news</p>
                            <a href="https://www.facebook.com/Mee.A7med.3mar" target="_blank" class="contact-link">
                                <i class="fas fa-external-link-alt"></i>
                                Visit Page
                            </a>
                        </div>
                    </div>

                    <div class="contact-card instagram">
                        <div class="contact-icon">
                            <i class="fab fa-instagram"></i>
                        </div>
                        <div class="contact-info">
                            <h4>Instagram</h4>
                            <p>See behind-the-scenes glimpses and development tips</p>
                            <a href="https://www.instagram.com/_a7med_3mmar_" target="_blank" class="contact-link">
                                <i class="fas fa-external-link-alt"></i>
                                Visit Account
                            </a>
                        </div>
                    </div>

                    <div class="contact-card github">
                        <div class="contact-icon">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="contact-info">
                            <h4>GitHub</h4>
                            <p>Browse source code, report bugs, or contribute to development</p>
                            <a href="https://github.com/3mmar404/LIfe-Os-Free" target="_blank" class="contact-link">
                                <i class="fas fa-external-link-alt"></i>
                                Visit Repository
                            </a>
                        </div>
                    </div>
                </div>

                <div class="response-time">
                    <div class="response-info">
                        <i class="fas fa-clock"></i>
                        <h4>Response Time</h4>
                        <p>We usually respond to messages within 24-48 hours. Your patience is appreciated! 🙏</p>
                    </div>
                </div>
            </div>
        `;
    }
};