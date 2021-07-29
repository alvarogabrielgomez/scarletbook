const packageJson = require('./package.json');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.clear();
console.log();
console.log('------------------');
console.log(`Package Name: ${packageJson.name} v${packageJson.version}`);
console.log(`App mode: ${process.env.NODE_ENV}`);
console.log('------------------');
console.log('');

process.chdir('./');

require('./scarletbook');