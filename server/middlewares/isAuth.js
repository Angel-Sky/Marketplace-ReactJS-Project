module.exports = (req, res, next) => {
    if(!req.user) {
        return res.json({message: 'You should sign in first!'})
    }
    next();
}