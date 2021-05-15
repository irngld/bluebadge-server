const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({
            auth: false,
            message: 'No token provided'
        })
    }
    else {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (!err && decodedToken) {
                User.findOne({
                    where: {
                        id: decodedToken.id
                    }
                })
                .then(user => {
                    if (!user) throw err;

                    req.user = user;
                    return next();
                })
                .catch(err => next(err));
            }
            else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        })
    }

}


module.exports = validateSession;