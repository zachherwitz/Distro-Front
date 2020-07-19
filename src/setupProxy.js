const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/weatherapi',
    createProxyMiddleware({
      target: 'http://api.weatherapi.com/v1/forecast.json?',
      changeOrigin: true,
    })
  );
};
