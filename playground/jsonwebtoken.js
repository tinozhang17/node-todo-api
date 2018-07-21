const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
};

let token = jwt.sign(data, '123abc'); // sign(data, salt)

let decoded = jwt.verify(token, '123abc');

console.log('token:', token);
console.log('dcoded:', decoded);