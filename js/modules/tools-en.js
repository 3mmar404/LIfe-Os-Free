// LifeOS - Tools Module v2.0 (English)
if (!LifeOS) { var LifeOS = {}; }

LifeOS.toolsEn = {
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
                    <div class="card-header"><i class="card-icon fas fa-download"></i><h3 class="card-title">Export Data</h3></div>
                    <p class="mb-2" style="color: var(--text-secondary);">Export all your data in an encrypted file.</p>
                    <div class="card-actions">
                        <button class="btn btn-success" onclick="LifeOS.toolsEn.exportAll()"><i class="fas fa-file-export"></i> Export All</button>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-upload"></i><h3 class="card-title">Import Data</h3></div>
                    <p class="mb-2" style="color: var(--text-secondary);">Import data from an encrypted backup file. <strong>This will replace current data.</strong></p>
                    <div class="card-actions">
                        <button class="btn btn-info" onclick="document.getElementById('import-file').click()"><i class="fas fa-file-import"></i> Import File</button>
                        <input type="file" id="import-file" accept=".json" style="display: none;">
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header"><i class="card-icon fas fa-key"></i><h3 class="card-title">Change Master Password</h3></div>
                    <p class="mb-2" style="color: var(--text-secondary);">Update your master password for your account. You'll need to enter your current password.</p>
                    <div class="card-actions">
                        <button class="btn btn-warning" onclick="LifeOS.toolsEn.changeMainPassword()"><i class="fas fa-lock"></i> Change Password</button>
                    </div>
                </div>

                 <div class="dashboard-card">
                        <div class="card-header"><i class="card-icon fas fa-trash"></i><h3 class="card-title">Full Reset</h3></div>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                            Permanently delete all data and password. <strong>This action cannot be undone.</strong>
                        </p>
                        <div class="card-actions">
                            <button class="btn btn-danger" onclick="LifeOS.toolsEn.resetAll()">
                                <i class="fas fa-exclamation-triangle"></i> Reset
                            </button>
                        </div>
                    </div>
            </div>
        `;
    },

    exportAll: async function() {
        if (!LifeOS.security.isAuthenticated) {
            LifeOS.ui.showToast('Authentication required first', 'error');
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

    downloadFile: function(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        LifeOS.ui.showToast('File downloaded successfully!', 'success');
    },

    importData: async function(file) {
        if (!file) return;
        
        try {
            const fileContent = await file.text();
            const parsed = JSON.parse(fileContent);
            
            if (!parsed.encryptedData) {
                LifeOS.ui.showToast('Invalid backup file format', 'error');
                return;
            }
            
            if (!LifeOS.security.isAuthenticated) {
                LifeOS.ui.showToast('Authentication required for import', 'error');
                return;
            }
            
            const confirm = await this.showConfirmDialog(
                'Import Data',
                'This will replace all current data. Are you sure?',
                'warning'
            );
            
            if (!confirm) return;
            
            const decryptedData = await LifeOS.security.decrypt(parsed.encryptedData, LifeOS.security.encryptionKey);
            const importedData = JSON.parse(decryptedData);
            
            LifeOS.core.state.data = {
                passwords: importedData.passwords || [],
                contacts: importedData.contacts || [],
                bookmarks: importedData.bookmarks || [],
                settings: LifeOS.core.state.data.settings
            };
            
            LifeOS.core.saveData();
            LifeOS.ui.showToast('Data imported successfully!', 'success');
            
        } catch (error) {
            LifeOS.ui.showToast('Error importing data: Invalid file or wrong password', 'error');
        }
    },

    changeMainPassword: function() {
        LifeOS.ui.showToast('Change password feature coming soon!', 'info');
    },

    resetAll: async function() {
        const confirm = await this.showConfirmDialog(
            'Full Reset',
            'This will permanently delete ALL data. Type "DELETE" to confirm:',
            'danger',
            'DELETE'
        );
        
        if (!confirm) return;
        
        localStorage.clear();
        LifeOS.ui.showToast('All data has been reset', 'success');
        setTimeout(() => location.reload(), 1500);
    },

    showConfirmDialog: function(title, message, type = 'warning', confirmText = null) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <h3><i class="fas fa-exclamation-triangle"></i> ${title}</h3>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                        ${confirmText ? `<input type="text" id="confirm-input" class="form-input" placeholder="${confirmText}">` : ''}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove(); window.tempResolve(false)">Cancel</button>
                        <button class="btn btn-danger" onclick="
                            const input = document.getElementById('confirm-input');
                            if (!input || input.value === '${confirmText || ''}') {
                                this.closest('.modal-overlay').remove();
                                window.tempResolve(true);
                            } else {
                                LifeOS.ui.showToast('Confirmation text does not match', 'error');
                            }
                        ">Confirm</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Make resolve available to onclick handlers
            window.tempResolve = resolve;
            
            // Auto-focus input if exists
            const input = modal.querySelector('#confirm-input');
            if (input) input.focus();
        });
    }
};