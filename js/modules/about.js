// LifeOS - About Module
if (!LifeOS) { var LifeOS = {}; }

LifeOS.about = {
    load: function() {
        const container = document.getElementById('about');
        container.innerHTML = `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-shield-halved card-icon"></i>
                        <div>
                            <h3 class="card-title">LifeOS Free</h3>
                            <p style="color: var(--text-secondary); margin: 0;">نظام إدارة الحياة الرقمية</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.8;">
                            LifeOS Free هو نظام إدارة الحياة الرقمية المجاني والمفتوح المصدر. يوفر لك حلاً شاملاً وآمناً لإدارة كلمات المرور، جهات الاتصال، والمفضلات - كل ذلك مع تشفير محلي قوي يضمن خصوصيتك الكاملة.
                        </p>
                        <div style="display: grid; gap: 0.5rem; margin-bottom: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                                <span>تشفير محلي آمن للبيانات</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                                <span>واجهة عربية سهلة الاستخدام</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                                <span>يعمل بدون اتصال بالإنترنت</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                                <span>مفتوح المصدر ومجاني</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-code card-icon"></i>
                        <div>
                            <h3 class="card-title">معلومات تقنية</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 1rem;">
                            <div>
                                <strong style="color: var(--accent-color);">الإصدار:</strong>
                                <span style="color: var(--text-secondary);">Free Edition</span>
                            </div>
                            <div>
                                <strong style="color: var(--accent-color);">التقنيات:</strong>
                                <span style="color: var(--text-secondary);">HTML5, CSS3, JavaScript</span>
                            </div>
                            <div>
                                <strong style="color: var(--accent-color);">التشفير:</strong>
                                <span style="color: var(--text-secondary);">AES-256 + PBKDF2</span>
                            </div>
                            <div>
                                <strong style="color: var(--accent-color);">التخزين:</strong>
                                <span style="color: var(--text-secondary);">Local Storage (محلي)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-heart card-icon"></i>
                        <div>
                            <h3 class="card-title">الدعم والمساهمة</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.8;">
                            LifeOS مشروع مفتوح المصدر يهدف إلى توفير أدوات إدارة الحياة الرقمية للجميع مجاناً. نؤمن بأن الخصوصية والأمان حق للجميع، لذلك نوفر هذا التطبيق بدون أي تكلفة أو قيود.
                        </p>
                        <p style="margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.8;">
                            يمكنك المساهمة في تطوير المشروع، الإبلاغ عن المشاكل، أو اقتراح ميزات جديدة. كل مساهمة تساعد في جعل التطبيق أفضل للجميع.
                        </p>
                        <div class="card-actions">
                            <button class="btn btn-secondary" onclick="window.open('https://github.com', '_blank')">
                                <i class="fab fa-github"></i> GitHub
                            </button>
                            <button class="btn btn-secondary" onclick="LifeOS.ui.showToast('معلومات التواصل ستكون متاحة قريباً', 'info')">
                                <i class="fas fa-envelope"></i> التواصل
                            </button>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-shield-alt card-icon"></i>
                        <div>
                            <h3 class="card-title">الأمان والخصوصية</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                            نحن نأخذ أمان بياناتك على محمل الجد:
                        </p>
                        <div style="display: grid; gap: 0.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-lock" style="color: var(--success-color);"></i>
                                <span>جميع البيانات مشفرة محلياً</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-user-shield" style="color: var(--success-color);"></i>
                                <span>لا نجمع أي بيانات شخصية</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-wifi" style="color: var(--success-color);"></i>
                                <span>يعمل بدون إرسال بيانات للخوادم</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-rocket card-icon"></i>
                        <div>
                            <h3 class="card-title">الميزات المستقبلية</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.8;">
                            نعمل باستمرار على تطوير LifeOS وإضافة ميزات جديدة:
                        </p>
                        <div style="display: grid; gap: 0.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-globe" style="color: var(--accent-color);"></i>
                                <span>دعم المزيد من اللغات</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-mobile-alt" style="color: var(--accent-color);"></i>
                                <span>تطبيق الهاتف المحمول</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-cloud" style="color: var(--accent-color);"></i>
                                <span>مزامنة آمنة (اختيارية)</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-palette" style="color: var(--accent-color);"></i>
                                <span>المزيد من الثيمات</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-chart-bar" style="color: var(--accent-color);"></i>
                                <span>تقارير وإحصائيات متقدمة</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-users card-icon"></i>
                        <div>
                            <h3 class="card-title">المجتمع</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.8;">
                            انضم إلى مجتمع LifeOS وكن جزءاً من رحلة التطوير:
                        </p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-star" style="color: var(--warning-color);"></i>
                                <span>قيم المشروع على GitHub</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-share-alt" style="color: var(--success-color);"></i>
                                <span>شارك التطبيق مع الأصدقاء</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-bug" style="color: var(--danger-color);"></i>
                                <span>أبلغ عن الأخطاء والمشاكل</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-lightbulb" style="color: var(--accent-color);"></i>
                                <span>اقترح ميزات جديدة</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};