// LifeOS - Documentation Module
if (!LifeOS) { var LifeOS = {}; }

LifeOS.documentation = {
    load: function() {
        const container = document.getElementById('documentation');
        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-book card-icon"></i>
                        <div>
                            <h3 class="card-title">دليل استخدام LifeOS Free</h3>
                            <p style="color: var(--text-secondary); margin: 0;">دليل شامل ومفصل لاستخدام جميع ميزات نظام إدارة الحياة الرقمية</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="background: linear-gradient(135deg, var(--accent-color), var(--accent-hover)); padding: 1.5rem; border-radius: 8px; color: white; text-align: center; margin-bottom: 1rem;">
                            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.2rem;">مرحباً بك في LifeOS Free!</h4>
                            <p style="margin: 0; opacity: 0.9;">هذا الدليل سيساعدك على الاستفادة الكاملة من جميع ميزات التطبيق</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-play-circle card-icon"></i>
                        <div>
                            <h3 class="card-title">البدء السريع</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 1rem;">
                            <div style="padding: 1rem; background: var(--secondary-color); border-radius: 6px;">
                                <h4 style="color: var(--accent-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-key"></i> 1. إعداد كلمة المرور الرئيسية
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0;">
                                    عند أول استخدام، ستحتاج لإنشاء كلمة مرور رئيسية قوية لحماية بياناتك. تأكد من حفظها في مكان آمن.
                                </p>
                            </div>
                            <div style="padding: 1rem; background: var(--secondary-color); border-radius: 6px;">
                                <h4 style="color: var(--accent-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-plus"></i> 2. إضافة البيانات
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0;">
                                    استخدم أزرار "إضافة" في كل قسم لإضافة كلمات المرور وجهات الاتصال والمفضلات.
                                </p>
                            </div>
                            <div style="padding: 1rem; background: var(--secondary-color); border-radius: 6px;">
                                <h4 style="color: var(--accent-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-search"></i> 3. البحث والتصفية
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0;">
                                    استخدم مربع البحث والتصنيفات للعثور على البيانات بسرعة.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-key card-icon"></i>
                        <div>
                            <h3 class="card-title">إدارة كلمات المرور</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <h4 style="color: var(--accent-color); margin-bottom: 1rem;">الميزات المتاحة:</h4>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-plus-circle" style="color: var(--success-color);"></i>
                                <span><strong>إضافة حساب جديد:</strong> احفظ معلومات تسجيل الدخول لأي موقع</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-eye" style="color: var(--accent-color);"></i>
                                <span><strong>إظهار/إخفاء كلمة المرور:</strong> اضغط على أيقونة العين</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-copy" style="color: var(--warning-color);"></i>
                                <span><strong>نسخ البيانات:</strong> انسخ اسم المستخدم أو كلمة المرور بنقرة واحدة</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-tags" style="color: var(--accent-hover);"></i>
                                <span><strong>التصنيفات:</strong> نظم حساباتك باستخدام التصنيفات</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-upload" style="color: var(--text-secondary);"></i>
                                <span><strong>الاستيراد:</strong> استورد كلمات المرور من ملفات JSON</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-address-book card-icon"></i>
                        <div>
                            <h3 class="card-title">إدارة جهات الاتصال</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                            احفظ معلومات الاتصال المهمة مع إمكانية التصنيف والبحث السريع.
                        </p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-user-plus" style="color: var(--success-color);"></i>
                                <span>إضافة جهات اتصال جديدة</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-phone" style="color: var(--accent-color);"></i>
                                <span>حفظ أرقام الهاتف والبريد الإلكتروني</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-building" style="color: var(--warning-color);"></i>
                                <span>تنظيم جهات الاتصال حسب الشركة أو النوع</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-bookmark card-icon"></i>
                        <div>
                            <h3 class="card-title">إدارة المفضلات</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                            احفظ الروابط المهمة مع أوصاف وتصنيفات لسهولة الوصول.
                        </p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-link" style="color: var(--success-color);"></i>
                                <span>حفظ الروابط مع العناوين والأوصاف</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-external-link-alt" style="color: var(--accent-color);"></i>
                                <span>فتح الروابط في تبويب جديد</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-folder" style="color: var(--warning-color);"></i>
                                <span>تنظيم المفضلات في مجلدات</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-tools card-icon"></i>
                        <div>
                            <h3 class="card-title">الأدوات والإعدادات</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-download" style="color: var(--success-color);"></i>
                                <span><strong>تصدير البيانات:</strong> احفظ نسخة احتياطية من بياناتك</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-upload" style="color: var(--accent-color);"></i>
                                <span><strong>استيراد البيانات:</strong> استعد البيانات من نسخة احتياطية</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-key" style="color: var(--warning-color);"></i>
                                <span><strong>تغيير كلمة المرور الرئيسية:</strong> حدث كلمة المرور الرئيسية</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-trash" style="color: var(--danger-color);"></i>
                                <span><strong>مسح البيانات:</strong> احذف جميع البيانات المحفوظة</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-mobile-alt card-icon"></i>
                        <div>
                            <h3 class="card-title">الاستخدام على الهاتف</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                            LifeOS محسن للاستخدام على الهواتف الذكية:
                        </p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-bars" style="color: var(--accent-color);"></i>
                                <span>استخدم زر القائمة (☰) للتنقل بين الأقسام</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-filter" style="color: var(--success-color);"></i>
                                <span>اضغط على "التصنيفات" لإظهار/إخفاء الفلاتر</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-touch" style="color: var(--warning-color);"></i>
                                <span>اضغط مطولاً على البطاقات للمزيد من الخيارات</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-question-circle card-icon"></i>
                        <div>
                            <h3 class="card-title">نصائح مهمة</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 1rem;">
                            <div style="padding: 1rem; background: var(--success-color); color: white; border-radius: 6px;">
                                <h4 style="margin-bottom: 0.5rem;">
                                    <i class="fas fa-shield-alt"></i> الأمان
                                </h4>
                                <p style="margin: 0; opacity: 0.9;">
                                    احفظ كلمة المرور الرئيسية في مكان آمن. فقدانها يعني فقدان الوصول لجميع بياناتك.
                                </p>
                            </div>
                            <div style="padding: 1rem; background: var(--warning-color); color: white; border-radius: 6px;">
                                <h4 style="margin-bottom: 0.5rem;">
                                    <i class="fas fa-download"></i> النسخ الاحتياطية
                                </h4>
                                <p style="margin: 0; opacity: 0.9;">
                                    قم بعمل نسخة احتياطية من بياناتك بانتظام من قسم الأدوات.
                                </p>
                            </div>
                            <div style="padding: 1rem; background: var(--accent-color); color: white; border-radius: 6px;">
                                <h4 style="margin-bottom: 0.5rem;">
                                    <i class="fas fa-sync"></i> التحديثات
                                </h4>
                                <p style="margin: 0; opacity: 0.9;">
                                    تأكد من استخدام أحدث إصدار من المتصفح للحصول على أفضل أداء.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-question-circle card-icon"></i>
                        <div>
                            <h3 class="card-title">الأسئلة الشائعة</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 1.5rem;">
                            <div style="border-right: 3px solid var(--accent-color); padding-right: 1rem;">
                                <h4 style="color: var(--accent-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-lock"></i> هل بياناتي آمنة؟
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    نعم، جميع بياناتك مشفرة محلياً باستخدام تشفير AES-256 القوي. لا يتم إرسال أي بيانات للإنترنت، وكل شيء محفوظ في متصفحك فقط.
                                </p>
                            </div>
                            
                            <div style="border-right: 3px solid var(--success-color); padding-right: 1rem;">
                                <h4 style="color: var(--success-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-key"></i> ماذا لو نسيت كلمة المرور الرئيسية؟
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    للأسف، إذا نسيت كلمة المرور الرئيسية فلن تتمكن من الوصول لبياناتك. هذا ضمان إضافي للأمان. لذلك احفظها في مكان آمن واعمل نسخ احتياطية.
                                </p>
                            </div>
                            
                            <div style="border-right: 3px solid var(--warning-color); padding-right: 1rem;">
                                <h4 style="color: var(--warning-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-download"></i> كيف أعمل نسخة احتياطية؟
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    اذهب إلى قسم "الأدوات" واضغط على "تصدير البيانات". سيتم تحميل ملف مشفر يحتوي على جميع بياناتك. احفظه في مكان آمن.
                                </p>
                            </div>
                            
                            <div style="border-right: 3px solid var(--danger-color); padding-right: 1rem;">
                                <h4 style="color: var(--danger-color); margin-bottom: 0.5rem;">
                                    <i class="fas fa-mobile-alt"></i> هل يعمل على الهاتف؟
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    نعم! التطبيق محسن للهواتف الذكية. استخدم زر القائمة (☰) للتنقل واضغط على "التصنيفات" لإظهار/إخفاء الفلاتر.
                                </p>
                            </div>
                            
                            <div style="border-right: 3px solid var(--accent-hover); padding-right: 1rem;">
                                <h4 style="color: var(--accent-hover); margin-bottom: 0.5rem;">
                                    <i class="fas fa-sync"></i> هل يمكن مزامنة البيانات بين الأجهزة؟
                                </h4>
                                <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">
                                    حالياً لا، لضمان الخصوصية الكاملة. لكن يمكنك تصدير البيانات من جهاز واستيرادها في جهاز آخر. المزامنة الآمنة قيد التطوير.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <i class="fas fa-life-ring card-icon"></i>
                        <div>
                            <h3 class="card-title">الحصول على المساعدة</h3>
                        </div>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.8;">
                            إذا واجهت أي مشكلة أو كان لديك سؤال غير مجاب عليه:
                        </p>
                        <div class="card-actions">
                            <button class="btn btn-secondary" onclick="window.open('https://github.com', '_blank')">
                                <i class="fab fa-github"></i> GitHub Issues
                            </button>
                            <button class="btn btn-secondary" onclick="LifeOS.ui.showToast('معلومات التواصل ستكون متاحة قريباً', 'info')">
                                <i class="fas fa-envelope"></i> التواصل المباشر
                            </button>
                            <button class="btn btn-secondary" onclick="LifeOS.router.navigate('about')">
                                <i class="fas fa-info-circle"></i> حول التطبيق
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};