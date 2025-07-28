// LifeOS Free - Professional Documentation Module v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.documentation = {
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
                            <p class="doc-subtitle">نظام إدارة الحياة الرقمية - بسيط، آمن، ومفتوح المصدر</p>
                        </div>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="doc-nav-tabs">
                    <button class="doc-tab active" data-section="about">
                        <i class="fas fa-info-circle"></i>
                        <span>عن التطبيق</span>
                    </button>
                    <button class="doc-tab" data-section="quick-start">
                        <i class="fas fa-rocket"></i>
                        <span>البدء السريع</span>
                    </button>
                    <button class="doc-tab" data-section="features">
                        <i class="fas fa-cogs"></i>
                        <span>الميزات الحالية</span>
                    </button>
                    <button class="doc-tab" data-section="future">
                        <i class="fas fa-road"></i>
                        <span>الميزات المستقبلية</span>
                    </button>
                    <button class="doc-tab" data-section="security">
                        <i class="fas fa-shield-alt"></i>
                        <span>الأمان والخصوصية</span>
                    </button>
                    <button class="doc-tab" data-section="faq">
                        <i class="fas fa-question-circle"></i>
                        <span>الأسئلة الشائعة</span>
                    </button>
                    <button class="doc-tab" data-section="contact">
                        <i class="fas fa-envelope"></i>
                        <span>التواصل</span>
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
                    عن LifeOS Free
                </h2>
                
                <div class="content-card">
                    <p class="intro-text">
                        LifeOS Free هو مشروع مفتوح المصدر يهدف لتوفير نظام بسيط وآمن لإدارة جوانبك الرقمية الأساسية مثل:
                    </p>
                    
                    <div class="features-grid">
                        <div class="feature-item">
                            <i class="fas fa-key"></i>
                            <h4>كلمات المرور</h4>
                            <p>إدارة آمنة لحساباتك</p>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-users"></i>
                            <h4>جهات الاتصال</h4>
                            <p>دفتر عناوين ذكي</p>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-bookmark"></i>
                            <h4>المواقع المفضلة</h4>
                            <p>مكتبة روابطك المهمة</p>
                        </div>
                    </div>
                    
                    <div class="highlight-box">
                        <i class="fas fa-lock"></i>
                        <p>
                            <strong>كل شيء يتم محليًا على جهازك</strong> - بدون الحاجة إلى اتصال إنترنت أو خوادم خارجية. 
                            كل بياناتك تبقى ملكك بالكامل، ومشفّرة محليًا باستخدام تقنيات قوية.
                        </p>
                    </div>
                </div>

                <div class="tech-specs">
                    <h3><i class="fas fa-cog"></i> المعلومات التقنية</h3>
                    <div class="specs-grid">
                        <div class="spec-item">
                            <span class="spec-label">الإصدار:</span>
                            <span class="spec-value">Free Edition</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">الواجهة:</span>
                            <span class="spec-value">عربية بالكامل</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">التقنيات:</span>
                            <span class="spec-value">HTML5, CSS3, JavaScript</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">التخزين:</span>
                            <span class="spec-value">Local Storage (محلي)</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">التشفير:</span>
                            <span class="spec-value">AES-256 + PBKDF2</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">نظام العمل:</span>
                            <span class="spec-value">بدون إنترنت تمامًا</span>
                        </div>
                    </div>
                </div>

                <div class="why-different">
                    <h3><i class="fas fa-star"></i> لماذا LifeOS يختلف؟</h3>
                    <div class="difference-items">
                        <div class="diff-item">
                            <i class="fas fa-plug"></i>
                            <span>يعمل بدون خوادر أو إنترنت</span>
                        </div>
                        <div class="diff-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>كل شيء مشفّر بالكامل</span>
                        </div>
                        <div class="diff-item">
                            <i class="fas fa-code"></i>
                            <span>مفتوح المصدر ويمكن تعديله</span>
                        </div>
                        <div class="diff-item">
                            <i class="fas fa-download"></i>
                            <span>لا يحتاج تثبيت أو برامج خارجية</span>
                        </div>
                        <div class="diff-item">
                            <i class="fas fa-feather"></i>
                            <span>خفيف ويعمل على أي متصفح حديث</span>
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
                    البداية السريعة
                </h2>
                
                <div class="welcome-message">
                    <h3>مرحبًا بك في LifeOS Free!</h3>
                    <p>اتبع هذه الخطوات لبدء استخدام النظام:</p>
                </div>

                <div class="steps-container">
                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4><i class="fas fa-key"></i> إعداد كلمة المرور الرئيسية</h4>
                            <p>في أول مرة، سيُطلب منك إنشاء كلمة مرور رئيسية لحماية بياناتك.</p>
                            <div class="step-tips">
                                <div class="tip">
                                    <i class="fas fa-lightbulb"></i>
                                    <span>اختر كلمة قوية لا تُنسى</span>
                                </div>
                                <div class="tip warning">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <span>لن يمكن استعادة البيانات بدونها</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4><i class="fas fa-plus"></i> إضافة بياناتك</h4>
                            <p>في كل قسम (كلمات المرور، جهات الاتصال، المفضلات)، اضغط على زر ➕ لإضافة عنصر جديد.</p>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4><i class="fas fa-search"></i> البحث والتنظيم</h4>
                            <p>استخدم مربع البحث للعثور على البيانات بسرعة وصنّف العناصر حسب الفئات لتسهيل الوصول لاحقًا.</p>
                        </div>
                    </div>
                </div>

                <div class="quick-actions">
                    <h3><i class="fas fa-bolt"></i> ابدأ الآن</h3>
                    <div class="action-buttons">
                        <button class="action-btn primary" onclick="LifeOS.router.navigate('passwords')">
                            <i class="fas fa-key"></i>
                            <span>إضافة كلمة مرور</span>
                        </button>
                        <button class="action-btn secondary" onclick="LifeOS.router.navigate('contacts')">
                            <i class="fas fa-user-plus"></i>
                            <span>إضافة جهة اتصال</span>
                        </button>
                        <button class="action-btn tertiary" onclick="LifeOS.router.navigate('bookmarks')">
                            <i class="fas fa-bookmark"></i>
                            <span>إضافة مفضلة</span>
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
                    دليل الميزات الحالية
                </h2>

                <div class="feature-section">
                    <h3><i class="fas fa-key"></i> إدارة كلمات المرور</h3>
                    <p class="feature-desc">نظام LifeOS Free يوفر مدير حسابات آمن لتخزين بياناتك الحساسة:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-plus-circle"></i> إضافة حساب جديد بسهولة</li>
                        <li><i class="fas fa-eye"></i> إظهار/إخفاء كلمة المرور</li>
                        <li><i class="fas fa-copy"></i> نسخ اسم المستخدم أو كلمة المرور بنقرة واحدة</li>
                        <li><i class="fas fa-folder"></i> تصنيف الحسابات (بنك، سوشيال، عمل...)</li>
                        <li><i class="fas fa-file-import"></i> استيراد ملفات كلمات المرور (JSON)</li>
                    </ul>
                </div>

                <div class="feature-section">
                    <h3><i class="fas fa-address-book"></i> إدارة جهات الاتصال</h3>
                    <p class="feature-desc">احتفظ بجهات اتصالك بأمان، ونظمها بذكاء:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-user-plus"></i> إضافة اسم، رقم، بريد إلكتروني...</li>
                        <li><i class="fas fa-tags"></i> تصنيف حسب نوع العلاقة أو جهة العمل</li>
                        <li><i class="fas fa-search"></i> بحث سريع حسب الاسم أو النوع</li>
                        <li><i class="fas fa-database"></i> بياناتك محفوظة بالكامل داخل المتصفح</li>
                    </ul>
                </div>

                <div class="feature-section">
                    <h3><i class="fas fa-bookmark"></i> إدارة المفضلات</h3>
                    <p class="feature-desc">أنشئ مكتبتك الخاصة من الروابط والمواقع:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-link"></i> حفظ رابط + عنوان + وصف</li>
                        <li><i class="fas fa-folder-open"></i> تنظيم الروابط في مجلدات</li>
                        <li><i class="fas fa-search-plus"></i> البحث الذكي حسب الكلمات أو الفئة</li>
                        <li><i class="fas fa-external-link-alt"></i> فتح الروابط في تبويب جديد</li>
                    </ul>
                </div>

                <div class="feature-section">
                    <h3><i class="fas fa-tools"></i> الأدوات والإعدادات</h3>
                    <p class="feature-desc">من خلال قسم الأدوات، يمكنك التحكم الكامل ببياناتك:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-download"></i> تصدير البيانات: تحميل نسخة احتياطية مشفرة</li>
                        <li><i class="fas fa-upload"></i> استيراد البيانات: استعادة نسخة محفوظة</li>
                        <li><i class="fas fa-key"></i> تغيير كلمة المرور الرئيسية</li>
                        <li><i class="fas fa-trash-alt"></i> مسح جميع البيانات من الجهاز (بشكل نهائي)</li>
                    </ul>
                </div>

                <div class="mobile-section">
                    <h3><i class="fas fa-mobile-alt"></i> استخدام LifeOS على الهاتف</h3>
                    <p class="feature-desc">تم تحسين LifeOS للعمل بكفاءة على الهواتف الذكية:</p>
                    <ul class="feature-list">
                        <li><i class="fas fa-bars"></i> استخدم زر القائمة للتنقل بين الأقسام</li>
                        <li><i class="fas fa-filter"></i> التصنيفات تساعدك في التصفية والتنظيم</li>
                        <li><i class="fas fa-hand-pointer"></i> اضغط مطولاً على أي بطاقة لعرض مزيد من الخيارات</li>
                    </ul>
                </div>

                <div class="tips-section">
                    <h3><i class="fas fa-lightbulb"></i> نصائح مهمة</h3>
                    <div class="tips-grid">
                        <div class="tip-card security">
                            <i class="fas fa-shield-alt"></i>
                            <h4>الأمان أولًا</h4>
                            <p>لا تنسَ: فقدان كلمة المرور الرئيسية = فقدان دائم للبيانات</p>
                        </div>
                        <div class="tip-card backup">
                            <i class="fas fa-save"></i>
                            <h4>النسخ الاحتياطي</h4>
                            <p>ننصحك بتصدير نسخة احتياطية من بياناتك كل فترة</p>
                        </div>
                        <div class="tip-card update">
                            <i class="fas fa-sync-alt"></i>
                            <h4>تحديث المتصفح</h4>
                            <p>احرص على استخدام أحدث إصدار من المتصفح</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getFutureContent: function() {
        return `
            <div class="doc-section">
                <h2 class="section-title">
                    <i class="fas fa-road"></i>
                    الميزات المستقبلية
                </h2>
                
                <div class="future-intro">
                    <p class="intro-text">
                        نعمل حالياً على تحويل LifeOS Free من أداة بسيطة إلى نظام متكامل لإدارة الحياة الرقمية 
                        بدون إنترنت، يجمع بين الخصوصية المطلقة والتجربة السلسة.
                    </p>
                </div>

                <div class="future-features">
                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-user-shield"></i>
                            <h3>1. مدير الحسابات الآمن المتقدم</h3>
                        </div>
                        <p class="feature-desc">أداة متقدمة لحفظ وتنظيم بيانات تسجيل الدخول:</p>
                        <ul class="feature-list">
                            <li>حفظ وتصنيف كلمات المرور</li>
                            <li>مولد كلمات مرور قوية قابلة للتخصيص</li>
                            <li>مولد هويات وهمية (أسماء، عناوين، أرقام)</li>
                            <li>تنبيهات ذكية للكلمات الضعيفة أو المكررة</li>
                            <li>استيراد تلقائي من المتصفحات والتطبيقات</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-address-book"></i>
                            <h3>2. دفتر جهات الاتصال الذكي</h3>
                        </div>
                        <p class="feature-desc">دفتر شامل لبيانات التواصل، مصمم لحياتك الاجتماعية والمهنية:</p>
                        <ul class="feature-list">
                            <li>استيراد من Google Contacts</li>
                            <li>تصنيف مرن (عائلة، أصدقاء، عمل، عملاء...)</li>
                            <li>تذكيرات تلقائية بأعياد الميلاد</li>
                            <li>فتح مباشر لـ WhatsApp</li>
                            <li>نسخ احتياطية مشفرة للجهات</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-globe"></i>
                            <h3>3. مركز المواقع المفضلة</h3>
                        </div>
                        <p class="feature-desc">مكتبتك الشخصية لكل ما تحتاجه على الإنترنت:</p>
                        <ul class="feature-list">
                            <li>مكتبة جاهزة تضم +1000 موقع مهم</li>
                            <li>إمكانية إضافة مواقعك الخاصة مع ملاحظات</li>
                            <li>تنظيم هرمي داخل مجلدات ومجلدات فرعية</li>
                            <li>بحث ذكي بالعناوين والوصف والتصنيفات</li>
                            <li>مزامنة اختيارية في الإصدارات القادمة</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-chart-line"></i>
                            <h3>4. المتتبع المالي الشخصي</h3>
                        </div>
                        <p class="feature-desc">أداة لمراقبة نفقاتك اليومية وتحقيق أهدافك المالية:</p>
                        <ul class="feature-list">
                            <li>تسجيل المصروفات والدخل بسهولة</li>
                            <li>تصنيف الإنفاق (أساسي، ترفيهي، عمل...)</li>
                            <li>رسوم بيانية تفاعلية وتقارير شهرية</li>
                            <li>تنبيهات عند تجاوز الميزانية المحددة</li>
                            <li>إعداد أهداف مالية ومتابعة التقدم</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-robot"></i>
                            <h3>5. مكتبة برومبتات الذكاء الاصطناعي</h3>
                        </div>
                        <p class="feature-desc">مركز تنظيمي لكل البرومبتات الخاصة بك:</p>
                        <ul class="feature-list">
                            <li>حفظ وتنظيم برومبتات ChatGPT وClaude وGemini...</li>
                            <li>تصنيفات حسب الاستخدام (كتابة، برمجة، تسويق، تعليم...)</li>
                            <li>إمكانية البحث، التعديل، والمشاركة</li>
                            <li>ميزة النسخ الفوري وملاحظات المستخدم</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-calendar-alt"></i>
                            <h3>6. التقويم الشخصي الذكي</h3>
                        </div>
                        <p class="feature-desc">تنظيم حياتك اليومية والمالية في مكان واحد:</p>
                        <ul class="feature-list">
                            <li>تسجيل الأحداث والمناسبات</li>
                            <li>تذكيرات تلقائية بأعياد الميلاد (من جهات الاتصال)</li>
                            <li>متتبع للأقساط، الفواتير، والالتزامات</li>
                            <li>عرض شهري وأسبوعي</li>
                            <li>تنبيهات مرئية قابلة للتخصيص</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-folder-open"></i>
                            <h3>7. الصفحة الشخصية الآمنة</h3>
                        </div>
                        <p class="feature-desc">خزنة مشفّرة لملفاتك ومستنداتك الهامة:</p>
                        <ul class="feature-list">
                            <li>تخزين آمن للسيرة الذاتية، الشهادات، العقود</li>
                            <li>تشفير داخلي قبل الحفظ</li>
                            <li>تصنيف حسب النوع</li>
                            <li>بحث داخلي في محتوى الملفات</li>
                            <li>إمكانية الحفظ المؤقت أو طويل الأجل</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-tasks"></i>
                            <h3>8. إدارة المهام اليومية</h3>
                        </div>
                        <p class="feature-desc">لوحة تحكم خفيفة لتنظيم مهامك بشكل بسيط:</p>
                        <ul class="feature-list">
                            <li>إنشاء قوائم مهام وتصنيفات (شخصي، شغل، عاجل...)</li>
                            <li>تحديد مواعيد نهائية وتنبيهات</li>
                            <li>عرض مهام اليوم، الأسبوع، المتأخرة</li>
                            <li>إشارة "تم الإنجاز" وتحليل الإنتاجية</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-sticky-note"></i>
                            <h3>9. النوتات والملاحظات</h3>
                        </div>
                        <p class="feature-desc">مساحة مرنة لحفظ أفكارك وملاحظاتك:</p>
                        <ul class="feature-list">
                            <li>إنشاء ملاحظات قصيرة أو طويلة</li>
                            <li>دعم للروابط والتصنيفات والمرفقات</li>
                            <li>وضع "ليلي" للقراءة المريحة</li>
                            <li>تصدير كملاحظات Markdown أو PDF</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-edit"></i>
                            <h3>10. صفحة الرمي السريع</h3>
                        </div>
                        <p class="feature-desc">لو عايز "ترمي فكرة بسرعة"، بدون تنسيق:</p>
                        <ul class="feature-list">
                            <li>مساحة فارغة للكتابة العشوائية</li>
                            <li>حفظ تلقائي عند الخروج</li>
                            <li>دعم الصور والروابط والقصاصات</li>
                            <li>يمكن تحويل المحتوى لاحقًا إلى نوت منظمة أو مهمة</li>
                        </ul>
                    </div>

                    <div class="future-feature">
                        <div class="feature-header">
                            <i class="fas fa-images"></i>
                            <h3>11. خزن الصور والوسائط</h3>
                        </div>
                        <p class="feature-desc">احفظ صورك المهمة في مكان مشفّر وآمن:</p>
                        <ul class="feature-list">
                            <li>رفع الصور يدويًا أو بالسحب</li>
                            <li>تصنيف الصور (مستندات، تذكارات، ميمز، ...)</li>
                            <li>عرض شبكي مع إمكانية البحث</li>
                            <li>تشفير الصور وعدم رفعها للسحابة</li>
                            <li>دعم ملفات .jpg .png .webp</li>
                        </ul>
                    </div>

                    <div class="future-feature highlight">
                        <div class="feature-header">
                            <i class="fas fa-brain"></i>
                            <h3>12. المساعد الذكي (AI Assistant)</h3>
                        </div>
                        <p class="feature-desc">رفيقك الرقمي اللي بيساعدك تنظم حياتك وقت ما تتلخبط:</p>
                        
                        <div class="ai-features">
                            <h4><i class="fas fa-clipboard-list"></i> في المهام والملاحظات:</h4>
                            <ul class="feature-list">
                                <li>تقسيم المهام تلقائياً</li>
                                <li>اقتراح عناوين مناسبة</li>
                                <li>تصنيفات وتنظيم داخل النظام</li>
                                <li>مواعيد واقعية للتنفيذ</li>
                                <li>زر "تنسيق تلقائي بالذكاء الاصطناعي"</li>
                            </ul>

                            <h4><i class="fas fa-coins"></i> في التتبع المالي:</h4>
                            <ul class="feature-list">
                                <li>تحليل بيانات الإنفاق والدخل الشهرية</li>
                                <li>اقتراح طرق التوفير بناءً على سلوكك</li>
                                <li>اكتشاف أنماط إنفاق غريبة أو متكررة</li>
                                <li>تنبيهات للمصروفات التي يمكن الاستغناء عنها</li>
                                <li>تقرير شهري بلغة بشرية</li>
                            </ul>

                            <h4><i class="fas fa-cog"></i> التكامل داخل النظام:</h4>
                            <ul class="feature-list">
                                <li>مساعد جانبي (Chat Pane) في أي صفحة</li>
                                <li>قابل للتخصيص حسب أسلوب المستخدم</li>
                                <li>أنماط متعددة: رسمي / شخصي / ساخر 😄</li>
                            </ul>
                        </div>
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
                    الأمان والخصوصية
                </h2>
                
                <div class="security-intro">
                    <div class="security-statement">
                        <i class="fas fa-lock"></i>
                        <h3>نحن نؤمن بأن الخصوصية حق أساسي</h3>
                        <p>ولهذا تم بناء LifeOS بمبادئ واضحة تضمن أقصى درجات الأمان لبياناتك</p>
                    </div>
                </div>

                <div class="security-principles">
                    <div class="principle-card">
                        <div class="principle-icon">
                            <i class="fas fa-server"></i>
                        </div>
                        <div class="principle-content">
                            <h4>لا يتم إرسال أي بيانات خارج جهازك</h4>
                            <p>كل العمليات تتم محلياً داخل متصفحك فقط. لا توجد خوادم خارجية أو اتصالات إنترنت مطلوبة.</p>
                        </div>
                    </div>

                    <div class="principle-card">
                        <div class="principle-icon">
                            <i class="fas fa-key"></i>
                        </div>
                        <div class="principle-content">
                            <h4>كل البيانات مشفّرة محليًا</h4>
                            <p>يتم تشفير جميع بياناتك باستخدام كلمة مرور رئيسية قوية وخوارزميات تشفير متقدمة.</p>
                        </div>
                    </div>

                    <div class="principle-card">
                        <div class="principle-icon">
                            <i class="fas fa-cloud-slash"></i>
                        </div>
                        <div class="principle-content">
                            <h4>لا يوجد مزامنة افتراضية أو سحابية</h4>
                            <p>لضمان الأمان التام، لا يتم رفع أي شيء للسحابة تلقائياً. المزامنة اختيارية ومحكومة بالكامل.</p>
                        </div>
                    </div>

                    <div class="principle-card">
                        <div class="principle-icon">
                            <i class="fas fa-browser"></i>
                        </div>
                        <div class="principle-content">
                            <h4>كل ما تراه، يتم تشغيله في متصفحك فقط</h4>
                            <p>التطبيق بالكامل يعمل كـ Client-Side فقط، بدون أي معالجة على خوادم خارجية.</p>
                        </div>
                    </div>
                </div>

                <div class="encryption-details">
                    <h3><i class="fas fa-shield-virus"></i> تفاصيل التشفير</h3>
                    <div class="encryption-grid">
                        <div class="encryption-item">
                            <h4>AES-256</h4>
                            <p>خوارزمية التشفير المعيارية المستخدمة من قبل الحكومات والبنوك</p>
                        </div>
                        <div class="encryption-item">
                            <h4>PBKDF2</h4>
                            <p>تقنية لتقوية كلمات المرور وحمايتها من هجمات القوة الغاشمة</p>
                        </div>
                        <div class="encryption-item">
                            <h4>Local Storage</h4>
                            <p>التخزين الآمن داخل متصفحك مع طبقات حماية إضافية</p>
                        </div>
                        <div class="encryption-item">
                            <h4>Salt & Hash</h4>
                            <p>تقنيات إضافية لحماية كلمة المرور الرئيسية</p>
                        </div>
                    </div>
                </div>

                <div class="security-tips">
                    <h3><i class="fas fa-lightbulb"></i> نصائح الأمان</h3>
                    <div class="tips-list">
                        <div class="security-tip important">
                            <i class="fas fa-exclamation-triangle"></i>
                            <div class="tip-content">
                                <h4>كلمة المرور الرئيسية</h4>
                                <p>اختر كلمة مرور قوية ولا تنساها. فقدانها يعني فقدان البيانات نهائياً.</p>
                            </div>
                        </div>
                        <div class="security-tip">
                            <i class="fas fa-save"></i>
                            <div class="tip-content">
                                <h4>النسخ الاحتياطي</h4>
                                <p>قم بعمل نسخة احتياطية بانتظام واحفظها في مكان آمن.</p>
                            </div>
                        </div>
                        <div class="security-tip">
                            <i class="fas fa-sync-alt"></i>
                            <div class="tip-content">
                                <h4>تحديث المتصفح</h4>
                                <p>استخدم أحدث إصدار من المتصفح للحصول على أحدث تحديثات الأمان.</p>
                            </div>
                        </div>
                        <div class="security-tip">
                            <i class="fas fa-wifi"></i>
                            <div class="tip-content">
                                <h4>الشبكات العامة</h4>
                                <p>تجنب استخدام التطبيق على شبكات WiFi عامة غير موثوقة.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="privacy-commitment">
                    <h3><i class="fas fa-handshake"></i> التزامنا بالخصوصية</h3>
                    <div class="commitment-content">
                        <div class="commitment-item">
                            <i class="fas fa-check-circle"></i>
                            <span>لا نجمع أي بيانات شخصية</span>
                        </div>
                        <div class="commitment-item">
                            <i class="fas fa-check-circle"></i>
                            <span>لا نستخدم ملفات تتبع أو كوكيز للتجسس</span>
                        </div>
                        <div class="commitment-item">
                            <i class="fas fa-check-circle"></i>
                            <span>المصدر مفتوح بالكامل للمراجعة</span>
                        </div>
                        <div class="commitment-item">
                            <i class="fas fa-check-circle"></i>
                            <span>لا نبيع أو نشارك أي معلومات</span>
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
                    الأسئلة الشائعة
                </h2>

                <div class="faq-container">
                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-wifi"></i>
                            <h4>هل يحتاج LifeOS للإنترنت؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>لا، يعمل LifeOS كليًا بدون إنترنت. كل العمليات تتم داخل المتصفح المحلي.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-database"></i>
                            <h4>أين يتم تخزين بياناتي؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>كل البيانات تحفظ محليًا في متصفحك باستخدام LocalStorage وتُشفّر بكلمة مرور رئيسية.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-sync-alt"></i>
                            <h4>هل يمكن نقل البيانات بين الأجهزة؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>نعم، يمكنك تصدير البيانات من جهاز واستيرادها في جهاز آخر يدويًا. المزامنة التلقائية قيد التطوير.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-key"></i>
                            <h4>ماذا يحدث إذا نسيت كلمة المرور الرئيسية؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>للأسف لن تتمكن من استعادة البيانات، حفاظًا على الأمان التام. احفظ كلمة المرور في مكان آمن، واحتفظ بنسخة احتياطية مشفرة.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-shield-alt"></i>
                            <h4>هل بياناتي آمنة؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>نعم، جميع البيانات مشفرة محليًا باستخدام معيار AES-256 القوي. لا يتم إرسال أي شيء إلى الإنترنت أو إلى أي خوادم خارجية.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-download"></i>
                            <h4>كيف أقوم بعمل نسخة احتياطية؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>اذهب إلى قسم "الأدوات" → "تصدير البيانات". سيتم تحميل ملف مشفر يحتوي على كل بياناتك.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-mobile-alt"></i>
                            <h4>هل يعمل LifeOS على الهاتف؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>نعم، يعمل بكفاءة عالية على الهواتف الذكية — بدون الحاجة لأي تطبيق إضافي.</p>
                        </div>
                    </div>

                    <div class="faq-item important">
                        <div class="faq-question">
                            <i class="fas fa-exclamation-triangle"></i>
                            <h4>نسيت كلمة المرور ولا أملك نسخة احتياطية، ماذا أفعل؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>للأسف، في هذه الحالة لا يمكن استعادة البيانات نهائياً. هذا التصميم مقصود لضمان أقصى درجات الأمان. ستحتاج لبدء جديد وإنشاء كلمة مرور جديدة.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-code"></i>
                            <h4>هل يمكنني تعديل الكود أو إضافة ميزات؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>بالطبع! المشروع مفتوح المصدر بالكامل. يمكنك تحميل الكود من GitHub وتعديله حسب احتياجاتك.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <i class="fas fa-bug"></i>
                            <h4>وجدت مشكلة أو خطأ، كيف أبلغ عنه؟</h4>
                        </div>
                        <div class="faq-answer">
                            <p>يمكنك التواصل معنا عبر GitHub أو صفحات التواصل الاجتماعي. نحن نقدر ملاحظاتك وتقاريرك!</p>
                        </div>
                    </div>
                </div>

                <div class="faq-footer">
                    <div class="help-card">
                        <i class="fas fa-question"></i>
                        <h3>لم تجد إجابة لسؤالك؟</h3>
                        <p>تواصل معنا مباشرة وسنكون سعداء بمساعدتك</p>
                        <button class="contact-btn" onclick="LifeOS.documentation.showSection('contact')">
                            <i class="fas fa-envelope"></i>
                            تواصل معنا
                        </button>
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
                    التواصل مع فريق LifeOS
                </h2>
                
                <div class="contact-intro">
                    <div class="team-info">
                        <h3><i class="fas fa-users"></i> LifeOS Team</h3>
                        <p>نحن فريق مطورين شغوفين بالخصوصية والتكنولوجيا، نعمل على توفير أدوات مفيدة وآمنة للجميع.</p>
                    </div>
                </div>

                <div class="contact-methods">
                    <div class="contact-card facebook">
                        <div class="contact-icon">
                            <i class="fab fa-facebook"></i>
                        </div>
                        <div class="contact-info">
                            <h4>Facebook</h4>
                            <p>تابعنا للحصول على آخر التحديثات والأخبار</p>
                            <a href="https://www.facebook.com/Mee.A7med.3mar" target="_blank" class="contact-link">
                                <i class="fas fa-external-link-alt"></i>
                                زيارة الصفحة
                            </a>
                        </div>
                    </div>

                    <div class="contact-card instagram">
                        <div class="contact-icon">
                            <i class="fab fa-instagram"></i>
                        </div>
                        <div class="contact-info">
                            <h4>Instagram</h4>
                            <p>شاهد لمحات من وراء الكواليس ونصائح التطوير</p>
                            <a href="https://www.instagram.com/_a7med_3mmar_" target="_blank" class="contact-link">
                                <i class="fas fa-external-link-alt"></i>
                                زيارة الحساب
                            </a>
                        </div>
                    </div>

                    <div class="contact-card github">
                        <div class="contact-icon">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="contact-info">
                            <h4>GitHub</h4>
                            <p>تصفح الكود المصدري، أبلغ عن الأخطاء، أو ساهم في التطوير</p>
                            <a href="https://github.com/3mmar404/LIfe-Os-Free" target="_blank" class="contact-link">
                                <i class="fas fa-external-link-alt"></i>
                                زيارة المستودع
                            </a>
                        </div>
                    </div>
                </div>

                <div class="contact-guidelines">
                    <h3><i class="fas fa-info-circle"></i> إرشادات التواصل</h3>
                    <div class="guidelines-grid">
                        <div class="guideline-item">
                            <i class="fas fa-bug"></i>
                            <h4>الإبلاغ عن الأخطاء</h4>
                            <p>استخدم GitHub لتقارير الأخطاء مع وصف مفصل للمشكلة</p>
                        </div>
                        <div class="guideline-item">
                            <i class="fas fa-lightbulb"></i>
                            <h4>اقتراح الميزات</h4>
                            <p>شاركنا أفكارك لتحسين التطبيق عبر أي من منصات التواصل</p>
                        </div>
                        <div class="guideline-item">
                            <i class="fas fa-question"></i>
                            <h4>طلب المساعدة</h4>
                            <p>لا تتردد في السؤال عن أي شيء متعلق بالاستخدام أو التقنية</p>
                        </div>
                        <div class="guideline-item">
                            <i class="fas fa-handshake"></i>
                            <h4>المساهمة</h4>
                            <p>مرحب بالمساهمات سواء بالكود أو الترجمة أو التصميم</p>
                        </div>
                    </div>
                </div>

                <div class="support-info">
                    <h3><i class="fas fa-heart"></i> دعم المشروع</h3>
                    <div class="support-content">
                        <p>إذا كان LifeOS يساعدك في تنظيم حياتك الرقمية، يمكنك دعم المشروع بطرق مختلفة:</p>
                        <ul class="support-list">
                            <li><i class="fas fa-star"></i> قم بعمل Star للمشروع على GitHub</li>
                            <li><i class="fas fa-share"></i> شارك التطبيق مع أصدقائك</li>
                            <li><i class="fas fa-code"></i> ساهم في التطوير أو الترجمة</li>
                            <li><i class="fas fa-feedback"></i> أرسل ملاحظاتك واقتراحاتك</li>
                        </ul>
                    </div>
                </div>

                <div class="response-time">
                    <div class="response-info">
                        <i class="fas fa-clock"></i>
                        <h4>وقت الاستجابة</h4>
                        <p>عادة نرد على الرسائل خلال 24-48 ساعة. صبرك مقدر! 🙏</p>
                    </div>
                </div>
            </div>
        `;
    }
};