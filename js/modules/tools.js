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