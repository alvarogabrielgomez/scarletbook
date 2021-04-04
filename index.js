const packageJson = require('./package.json');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log();
console.log(`Package Name: ${packageJson.name} v${packageJson.version}`);
console.log(`App mode: ${process.env.NODE_ENV}`);
console.log('');

require('./scarletbook');