module.exports = {
    apps: [{
        name: 'API',
        script: 'dist/app.js',
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '1G'
    }]
};
