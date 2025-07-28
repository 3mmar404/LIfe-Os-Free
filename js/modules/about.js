// LifeOS Free - About Module v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.about = {
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
                        <p class="hero-subtitle">نظام إدارة الحياة الرقمية</p>
                        <p class="hero-description">بسيط، آمن، ومفتوح المصدر</p>
                    </div>
                </div>



                <!-- Features Preview -->
                <div class="features-preview">
                    <h2 class="section-title">
                        <i class="fas fa-star"></i>
                        لماذا LifeOS؟
                    </h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon offline">
                                <i class="fas fa-plug"></i>
                            </div>
                            <h4>يعمل بدون إنترنت</h4>
                            <p>كل شيء يحدث على جهازك بدون الحاجة لاتصال</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon secure">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h4>أمان كامل</h4>
                            <p>تشفير محلي قوي باستخدام AES-256</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon opensource">
                                <i class="fas fa-code"></i>
                            </div>
                            <h4>مفتوح المصدر</h4>
                            <p>يمكنك مراجعة الكود وتعديله حسب احتياجك</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon lightweight">
                                <i class="fas fa-feather"></i>
                            </div>
                            <h4>خفيف وسريع</h4>
                            <p>لا يحتاج تثبيت، يعمل على أي متصفح حديث</p>
                        </div>
                    </div>
                </div>

                <!-- Help Section -->
                <div class="help-section">
                    <h2 class="section-title">
                        <i class="fas fa-question-circle"></i>
                        هل تحتاج مساعدة؟
                    </h2>
                    <div class="help-content">
                        <p>اطلع على دليل الاستخدام الشامل لتعلم جميع الميزات بالتفصيل</p>
                        <div class="help-buttons">
                            <button class="help-btn primary" onclick="LifeOS.router.navigate('documentation')">
                                <i class="fas fa-book-open"></i>
                                <span>دليل الاستخدام الشامل</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    }
};