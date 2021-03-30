const router = require('express').Router();
const authService = require('../services/authService');
// const isAuth = require('../middlewares/isAuth');
// const isGuest = require('../middlewares/isGuest');
const { SECRET, COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        let createdUser = await authService.registerUser(req.body);
        res.status(201).json({ _id: createdUser._id });
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
});

router.post('/login', (req, res) => {
    authService.loginUser(req.body)
        .then(token => {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    res
                        .status(200)
                        .cookie(COOKIE_NAME, token, { sameSite: 'none', secure: true })
                        .json({ user: decoded })
                }
            })
        })
        .catch(error => res.status(500).json({ error: error }))
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ message: 'Successfully logged out' })
});

router.get('/checkUser', (req, res) => {
    console.log(req.user)
    if (req.user) return res.status(200).json({user: req.user})
    return res.status(200).json({message: "Not loged in"})
})


module.exports = router;