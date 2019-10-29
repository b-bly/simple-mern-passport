const proxy = require('http-proxy-middleware');

    module.exports = function(app) {
        app.use(proxy('/api/**', { target: 'http://localhost:8080' }));
        app.use(proxy('/user/**', { target: 'http://localhost:8080' }));
        app.use(proxy('/socket.io/**', { target: 'http://localhost:8080' }));
    };