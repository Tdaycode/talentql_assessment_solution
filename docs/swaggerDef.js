const { version } = require('../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com',
    },
  },
  servers: [
    {
      url: `http://localhost:3000/api/v1`,
    },
  ],
};

module.exports = swaggerDef;
