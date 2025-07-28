// LifeOS - Router Module v2.0
// Handles navigation between different application modules.

if (!LifeOS) { var LifeOS = {}; }

LifeOS.router = {
    init: function() {
        // Setup navigation tab event listeners
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const moduleName = e.currentTarget.dataset.module;
                this.navigate(moduleName);
            });
        });
    },

    navigate: function(moduleName) {
        // Hide all modules
        document.querySelectorAll('.module').forEach(mod => {
            mod.classList.remove('active');
        });

        // Deactivate all nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show the target module
        const targetModule = document.getElementById(moduleName);
        if (targetModule) {
            targetModule.classList.add('active');
        }

        // Activate the target nav tab
        const targetTab = document.querySelector(`.nav-tab[data-module="${moduleName}"]`);
        if (targetTab) {
            targetTab.classList.add('active');
        }

        // Update current module in state
        LifeOS.core.state.currentModule = moduleName;

        // Load the module's data and render its content
        this.loadModule(moduleName);
    },

    loadModule: function(moduleName) {
        // Each module object must have a `load()` method
        if (LifeOS[moduleName] && typeof LifeOS[moduleName].load === 'function') {
            LifeOS[moduleName].load();
        } else {
            console.warn(`Module "${moduleName}" does not have a load method.`);
        }
    }
};