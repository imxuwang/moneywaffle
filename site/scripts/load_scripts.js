document.addEventListener("DOMContentLoaded", function () {
    // Get the current page's path
    var path = window.location.pathname;

    // Define the mapping of page paths to script paths
    var scripts = {
        '/investment/asset-allocation-comparison': '/scripts/investment/asset_allocation_comparison.js',
        // Add more mappings as needed
    };

    // Load the appropriate script if it exists
    for (var key in scripts) {
        if (path.startsWith(key)) {
            var script = document.createElement('script');
            // script.src = '/assets/js/' + scripts[key];
            script.src = scripts[key];
            document.body.appendChild(script);
            break;
        }
    }
});