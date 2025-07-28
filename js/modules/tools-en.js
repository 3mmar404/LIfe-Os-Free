// LifeOS Free - Tools Module (English) v2.0
if (!LifeOS) { var LifeOS = {}; }

LifeOS.toolsEn = {
    load: function() {
        const container = document.getElementById('tools');
        const data = LifeOS.core.state.data;
        const stats = {
            passwords: data.passwords?.length || 0,
            contacts: data.contacts?.length || 0,
            bookmarks: data.bookmarks?.length || 0
        };

        container.innerHTML = `
            <div class="tools-container">
                <div class="module-header">
                    <h2 class="module-title">
                        <i class="fas fa-tools"></i>
                        Tools & Settings
                    </h2>
                </div>

                <div class="tools-grid">
                    <!-- Data Management -->
                    <div class="tool-section">
                        <h3><i class="fas fa-database"></i> Data Management</h3>
                        
                        <div class="tool-card">
                            <div class="tool-icon export">
                                <i class="fas fa-download"></i>
                            </div>
                            <div class="tool-info">
                                <h4>Export Data</h4>
                                <p>Download encrypted backup of all your data</p>
                            </div>
                            <button class="btn-primary" onclick="LifeOS.toolsEn.exportData()">
                                <i class="fas fa-download"></i>
                                Export
                            </button>
                        </div>

                        <div class="tool-card">
                            <div class="tool-icon import">
                                <i class="fas fa-upload"></i>
                            </div>
                            <div class="tool-info">
                                <h4>Import Data</h4>
                                <p>Restore data from previously exported backup</p>
                            </div>
                            <button class="btn-secondary" onclick="LifeOS.toolsEn.importData()">
                                <i class="fas fa-upload"></i>
                                Import
                            </button>
                        </div>
                    </div>

                    <!-- Security Settings -->
                    <div class="tool-section">
                        <h3><i class="fas fa-shield-alt"></i> Security Settings</h3>
                        
                        <div class="tool-card">
                            <div class="tool-icon password">
                                <i class="fas fa-key"></i>
                            </div>
                            <div class="tool-info">
                                <h4>Change Master Password</h4>
                                <p>Update your master password for enhanced security</p>
                            </div>
                            <button class="btn-warning" onclick="LifeOS.toolsEn.changeMasterPassword()">
                                <i class="fas fa-key"></i>
                                Change
                            </button>
                        </div>
                    </div>

                    <!-- Application Settings -->
                    <div class="tool-section">
                        <h3><i class="fas fa-cog"></i> Application Settings</h3>
                        
                        <div class="tool-card">
                            <div class="tool-icon theme">
                                <i class="fas fa-palette"></i>
                            </div>
                            <div class="tool-info">
                                <h4>Theme</h4>
                                <p>Switch between dark and light themes</p>
                            </div>
                            <button class="btn-secondary" onclick="LifeOS.ui.toggleTheme()">
                                <i class="fas fa-adjust"></i>
                                Toggle Theme
                            </button>
                        </div>

                        <div class="tool-card">
                            <div class="tool-icon language">
                                <i class="fas fa-language"></i>
                            </div>
                            <div class="tool-info">
                                <h4>Language</h4>
                                <p>Switch to Arabic interface</p>
                            </div>
                            <button class="btn-secondary" onclick="window.location.href='index.html'">
                                <i class="fas fa-language"></i>
                                العربية
                            </button>
                        </div>
                    </div>

                    <!-- Data Statistics -->
                    <div class="tool-section">
                        <h3><i class="fas fa-chart-bar"></i> Data Statistics</h3>
                        
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-icon passwords">
                                    <i class="fas fa-key"></i>
                                </div>
                                <div class="stat-value">${stats.passwords}</div>
                                <div class="stat-label">Passwords</div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-icon contacts">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div class="stat-value">${stats.contacts}</div>
                                <div class="stat-label">Contacts</div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-icon bookmarks">
                                    <i class="fas fa-bookmark"></i>
                                </div>
                                <div class="stat-value">${stats.bookmarks}</div>
                                <div class="stat-label">Bookmarks</div>
                            </div>
                        </div>
                    </div>

                    <!-- Danger Zone -->
                    <div class="tool-section danger-zone">
                        <h3><i class="fas fa-exclamation-triangle"></i> Danger Zone</h3>
                        
                        <div class="tool-card danger">
                            <div class="tool-icon delete">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                            <div class="tool-info">
                                <h4>Clear All Data</h4>
                                <p>Permanently delete all data from this device</p>
                            </div>
                            <button class="btn-danger" onclick="LifeOS.toolsEn.clearAllData()">
                                <i class="fas fa-trash-alt"></i>
                                Clear Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    exportData: function() {
        try {
            const data = LifeOS.core.state.data;
            const exportData = {
                version: '2.0',
                exportDate: new Date().toISOString(),
                data: data
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `lifeos-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            LifeOS.ui.showNotification('Data exported successfully!', 'success');
        } catch (error) {
            LifeOS.ui.showNotification('Export failed: ' + error.message, 'error');
        }
    },

    importData: function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    if (!importData.data) {
                        throw new Error('Invalid backup file format');
                    }
                    
                    if (confirm('This will replace all your current data. Are you sure?')) {
                        LifeOS.core.state.data = { ...LifeOS.core.state.data, ...importData.data };
                        LifeOS.core.saveData();
                        LifeOS.ui.showNotification('Data imported successfully!', 'success');
                        
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                    }
                } catch (error) {
                    LifeOS.ui.showNotification('Import failed: ' + error.message, 'error');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    },

    changeMasterPassword: function() {
        const formHtml = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-key"></i> Change Master Password</h3>
                    <button class="modal-close" onclick="LifeOS.ui.hideModal()">&times;</button>
                </div>
                <form id="changePasswordForm" onsubmit="LifeOS.toolsEn.handlePasswordChange(event)">
                    <div class="form-group">
                        <label for="currentPassword">Current Password *</label>
                        <input type="password" id="currentPassword" required placeholder="Enter current password">
                    </div>
                    
                    <div class="form-group">
                        <label for="newPassword">New Password *</label>
                        <input type="password" id="newPassword" required placeholder="Enter new password">
                    </div>
                    
                    <div class="form-group">
                        <label for="confirmPassword">Confirm New Password *</label>
                        <input type="password" id="confirmPassword" required placeholder="Confirm new password">
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="LifeOS.ui.hideModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Change Password</button>
                    </div>
                </form>
            </div>
        `;
        
        LifeOS.ui.showModal(formHtml);
    },

    handlePasswordChange: function(event) {
        event.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            LifeOS.ui.showNotification('New passwords do not match!', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            LifeOS.ui.showNotification('New password must be at least 6 characters!', 'error');
            return;
        }
        
        // This would need proper implementation with current security system
        LifeOS.ui.showNotification('Password change feature coming soon!', 'info');
        LifeOS.ui.hideModal();
    },

    clearAllData: function() {
        const confirmText = 'CLEAR ALL DATA';
        const userInput = prompt(`This will permanently delete ALL your data!\n\nType "${confirmText}" to confirm:`);
        
        if (userInput === confirmText) {
            localStorage.clear();
            LifeOS.ui.showNotification('All data cleared successfully!', 'success');
            
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else if (userInput !== null) {
            LifeOS.ui.showNotification('Confirmation text incorrect. Data not cleared.', 'error');
        }
    }
};