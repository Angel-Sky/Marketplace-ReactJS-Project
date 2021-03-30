const { SECRET, COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

const auth = () => {
    return (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];
        if (token) {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    req.user = decoded;
                }
            })
        }
        next();
    }
}

module.exports = auth;