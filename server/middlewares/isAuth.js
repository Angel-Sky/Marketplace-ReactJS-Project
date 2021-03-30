module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({message: 'You should sign in first!'})
    }
    next();
}