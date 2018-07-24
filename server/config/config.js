const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    let config = require('./config.json'); // this will automatically convert the json file into a JSON object
    let envConfig = config[env];
    for (let key in envConfig) {
        process.env[key] = envConfig[key];
    }
}

// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI =  'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI =  'mongodb://localhost:27017/TodoAppTest';
// }