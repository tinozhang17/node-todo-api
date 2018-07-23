const {User} = require('./../models/user');

let authenticate = (req, res, next) => {
    let token = req.header('x-auth'); // get the token from 'x-auth' property of the header of the request

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject(); // this will be passed to the .catch()
        }

        req.user = user;
        req.token = token; // we do this and the above line because authenticate() is a middleware we are creating, which means the results are going to be passed to the next route handler, that's why we need to tack on req.token as well as req.user so that the next handler can use that info to do useful things.
        next();
    }).catch((err) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};