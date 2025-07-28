// LifeOS - Main Entry Point v2.0
// Initializes the application when the DOM is ready.

document.addEventListener('DOMContentLoaded', () => {
    // Global LifeOS object should be available now.
    // The core init function will handle everything.
    if (window.LifeOS) {
        LifeOS.core.init();
    } else {
        console.error("FATAL: LifeOS Core not found. Check script loading order.");
        document.body.innerHTML = "<h1>خطأ فادح في تحميل التطبيق.</h1>";
    }
});