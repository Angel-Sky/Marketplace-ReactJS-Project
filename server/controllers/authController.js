const router = require('express').Router();
const authService = require('../services/authService');
// const isAuth = require('../middlewares/isAuth');
// const isGuest = require('../middlewares/isGuest');
const { SECRET, COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const {email, password, repeatPassword} = req.body;
    try {
        let createdUser = await authService.registerUser(email, password);   
        res.status(201).json({_id: createdUser._id})     
    } catch (error) {
        console.log(error)
        res.status(404).json({error})     
    } 
});

router.post('/login', (req, res) => {
    authService.loginUser(req.body)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {httpOnly: true});

            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    res.status(200).json(decoded);
                }
            })

        }).catch((error) => res.status(500).json(error))
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({message: 'Successfully logged out'})
});


module.exports = router;