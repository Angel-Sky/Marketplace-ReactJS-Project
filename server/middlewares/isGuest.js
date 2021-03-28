module.exports = (req, res, next) => {
    if (req.user) {
        return res.json({message: 'You are already logged-in'})
    }

    next();
}