const isAdmin= (req, res, next) => {
    if(req.user.permission !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' })
    }
    next()

}
module.exports = {isAdmin}