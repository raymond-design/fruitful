// next.config.js
    
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['www.gravatar.com', 'localhost']
  }
};