// LifeOS - Tools Module v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.tools = {
    load: function() {
        this.renderLayout();
        // Setup listeners for file inputs, which are now part of the layout
        document.getElementById('import-file')?.addEventListener('change', (e) => this.importData(e.target.files[0]));
    },

    renderLayout: function() {
        const container = document.getElementById('tools');
        container.innerHTML = `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-download"></i><h3 class="card-title">تصدير البيانات</h3></div>
                    <p class="mb-2" style="color: var(--text-secondary);">تصدير كل بياناتك في ملف مشفر.</p>
                    <div class="card-actions">
                        <button class="btn btn-success" onclick="LifeOS.tools.exportAll()"><i class="fas fa-file-export"></i> تصدير الكل</button>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-upload"></i><h3 class="card-title">استيراد البيانات</h3></div>
                    <p class="mb-2" style="color: var(--text-secondary);">استيراد البيانات من ملف احتياطي مشفر. <strong>سيتم استبدال البيانات الحالية.</strong></p>
                    <div class="card-actions">
                        <button class="btn btn-info" onclick="document.getElementById('import-file').click()"><i class="fas fa-file-import"></i> استيراد ملف</button>
                        <input type="file" id="import-file" accept=".json" style="display: none;">
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-key"></i><h3 class="card-title">تغيير كلمة المرور الرئيسية</h3></div>
                    <p class="mb-2" style="color: var(--text-secondary);">حدث كلمة المرور الرئيسية لحسابك. ستحتاج لإدخال كلمة المرور الحالية.</p>
                    <div class="card-actions">
                        <button class="btn btn-warning" onclick="LifeOS.tools.changeMainPassword()"><i class="fas fa-lock"></i> تغيير كلمة المرور</button>
                    </div>
                </div>

                 <div class="dashboard-card">
                        <div class="card-header"><i class="card-icon fas fa-trash"></i><h3 class="card-title">إعادة تعيين كاملة</h3></div>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                            حذف جميع البيانات وكلمة المرور بشكل نهائي. <strong>هذا الإجراء لا يمكن التراجع عنه.</strong>
                        </p>
                        <div class="card-actions">
                            <button class="btn btn-danger" onclick="LifeOS.tools.resetAll()">
                                <i class="fas fa-exclamation-triangle"></i> إعادة تعيين
                            </button>
                        </div>
                    </div>
            </div>
        `;
    },

    exportAll: async function() {
        if (!LifeOS.security.isAuthenticated) {
            LifeOS.ui.showToast('يجب المصادقة أولاً', 'error');
            return;
        }
        
        const dataToExport = {
            passwords: LifeOS.core.state.data.passwords,
            contacts: LifeOS.core.state.data.contacts,
            bookmarks: LifeOS.core.state.data.bookmarks,
        };

        const plaintext = JSON.stringify(dataToExport);
        const encryptedData = await LifeOS.security.encrypt(plaintext, LifeOS.security.encryptionKey);
        const fullPayload = {
            encryptedData: encryptedData,
            exportDate: new Date().toISOString()
        };
        
        this.downloadFile(
            JSON.stringify(fullPayload, null, 2),
            `LifeOS_EncryptedBackup_${new Date().toISOString().split('T')[0]}.json`,
            'application/json'
        );
    },

    importData: function(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const importedPayload = JSON.parse(e.target.result);
                if (!importedPayload.encryptedData) {
                    LifeOS.ui.showToast('ملف الاستيراد غير صالح أو غير مشفر', 'error');
                    return;
                }

                if (confirm('هل أنت متأكد من استيراد البيانات؟ سيتم مسح واستبدال جميع البيانات الحالية!')) {
                    const decryptedJSON = await LifeOS.security.decrypt(importedPayload.encryptedData, LifeOS.security.encryptionKey);
                    const data = JSON.parse(decryptedJSON);

                    LifeOS.core.state.data.passwords = data.passwords || [];
                    LifeOS.core.state.data.contacts = data.contacts || [];
                    LifeOS.core.state.data.bookmarks = data.bookmarks || [];
                    
                    await LifeOS.core.saveData();
                    LifeOS.ui.showToast('تم استيراد واستبدال البيانات بنجاح!', 'success');
                    LifeOS.router.navigate(LifeOS.core.state.currentModule); // Refresh current view
                }

            } catch (error) {
                console.error("Import error:", error);
                LifeOS.ui.showToast('فشل في استيراد البيانات. قد تكون كلمة المرور غير صحيحة أو الملف تالف.', 'error');
            }
        };
        reader.readAsText(file);
    },

    changeMainPassword: function() {
        const content = document.createElement('div');
        content.innerHTML = `
            <form id="change-password-form" style="display: grid; gap: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">كلمة المرور الحالية</label>
                    <div style="position: relative;">
                        <input type="password" id="current-password" class="form-input" placeholder="أدخل كلمة المرور الحالية" required style="padding-left: 3rem;">
                        <button type="button" id="toggle-current" style="position: absolute; left: 0.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-secondary); cursor: pointer;">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">كلمة المرور الجديدة</label>
                    <div style="position: relative;">
                        <input type="password" id="new-password" class="form-input" placeholder="أدخل كلمة المرور الجديدة" required style="padding-left: 3rem;">
                        <button type="button" id="toggle-new" style="position: absolute; left: 0.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-secondary); cursor: pointer;">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">تأكيد كلمة المرور الجديدة</label>
                    <div style="position: relative;">
                        <input type="password" id="confirm-password" class="form-input" placeholder="أعد إدخال كلمة المرور الجديدة" required style="padding-left: 3rem;">
                        <button type="button" id="toggle-confirm" style="position: absolute; left: 0.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-secondary); cursor: pointer;">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div style="background: var(--warning-bg); border: 1px solid var(--warning-color); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-exclamation-triangle" style="color: var(--warning-color);"></i>
                        <strong style="color: var(--warning-color);">تحذير مهم</strong>
                    </div>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
                        تأكد من حفظ كلمة المرور الجديدة في مكان آمن. في حالة نسيانها، لن تتمكن من الوصول لبياناتك نهائياً.
                    </p>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button type="submit" class="btn btn-warning" style="flex: 1;">
                        <i class="fas fa-key"></i> تغيير كلمة المرور
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="LifeOS.ui.closeModal()" style="flex: 1;">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </form>
        `;

        // إضافة أحداث إظهار/إخفاء كلمات المرور
        ['current', 'new', 'confirm'].forEach(type => {
            content.querySelector(`#toggle-${type}`).onclick = function() {
                const input = content.querySelector(`#${type}-password`);
                const icon = this.querySelector('i');
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            };
        });

        content.querySelector('#change-password-form').onsubmit = async (e) => {
            e.preventDefault();
            
            const currentPassword = content.querySelector('#current-password').value;
            const newPassword = content.querySelector('#new-password').value;
            const confirmPassword = content.querySelector('#confirm-password').value;

            // التحقق من كلمة المرور الحالية
            if (!LifeOS.security.verifyPassword(currentPassword)) {
                LifeOS.ui.showToast('كلمة المرور الحالية غير صحيحة', 'error');
                return;
            }

            // التحقق من تطابق كلمة المرور الجديدة
            if (newPassword !== confirmPassword) {
                LifeOS.ui.showToast('كلمة المرور الجديدة غير متطابقة', 'error');
                return;
            }

            // التحقق من قوة كلمة المرور الجديدة
            if (newPassword.length < 6) {
                LifeOS.ui.showToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
                return;
            }

            try {
                // فك تشفير البيانات بكلمة المرور الحالية
                const currentData = LifeOS.core.state.data;
                
                // تشفير البيانات بكلمة المرور الجديدة
                LifeOS.security.masterPassword = newPassword;
                await LifeOS.core.saveData();
                
                // تحديث معلومات الأمان
                LifeOS.security.updatePasswordHash(newPassword);
                
                LifeOS.ui.closeModal();
                LifeOS.ui.showToast('تم تغيير كلمة المرور بنجاح!', 'success');
                
            } catch (error) {
                console.error('Password change error:', error);
                LifeOS.ui.showToast('حدث خطأ أثناء تغيير كلمة المرور', 'error');
            }
        };

        LifeOS.ui.showModal('تغيير كلمة المرور الرئيسية', content);
    },

    resetAll: function() {
        if (confirm('هل أنت متأكد 100% من حذف جميع البيانات وكلمة المرور؟ هذا الإجراء لا يمكن التراجع عنه!')) {
            if (confirm('تأكيد أخير: سيتم حذف كل شيء نهائياً.')) {
                localStorage.removeItem('LifeOS_EncryptedData');
                localStorage.removeItem('LifeOS_Security');
                localStorage.removeItem('LifeOS_Settings');
                
                LifeOS.ui.showToast('تم حذف جميع البيانات. سيتم إعادة تحميل التطبيق.', 'success');
                setTimeout(() => location.reload(), 2000);
            }
        }
    },
    
    downloadFile: function(content, filename, type) {
        const blob = new Blob([content], { type: type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        LifeOS.ui.showToast('تم إعداد ملف التصدير بنجاح');
    }
};