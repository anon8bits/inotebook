var jwt = require('jsonwebtoken')

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using correct token' })
    }
    try {
        const JWT_secret = "secret";
        const data = jwt.verify(token, JWT_secret);
        req.user = data.user;
    } catch (error) {
        return res.status(401).send({ error: 'Please authenticate using correct token' })
    }
    next();
}
module.exports = fetchuser;