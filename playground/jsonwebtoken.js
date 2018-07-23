const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
};

let token = jwt.sign(data, '123abc', {
    expiresIn: '10s'
}); // sign(data, salt)

let decoded = setTimeout(() => {
    let decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUzMjI2ODczNCwiZXhwIjoxNTMyMjY4NzQ0fQ.jbYiCOjXe5I5e1LD4JhaiVKTo35FoMYVOQejD5HVdMU", '123abc');
    console.log(decoded);
}, 5000);

console.log('token:', token);