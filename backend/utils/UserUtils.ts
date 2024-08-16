const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//encrypt password using bcrypt
async function encryptPassWord (password: string)  {
    const encryptedPassWord = await bcrypt.hash(password, 10)
    return encryptedPassWord
}

//create long term jwt token
function createJWT (id: string, email: string) {
    return jwt.sign(
        {userId: id, name: email},
        process.env.JWT_SECRET,
        {expiresIn: '365d'}
    )
}

//create short term jwt token
function createShortJWT (id: string, email: string) {
    return jwt.sign(
        {userId: id, name: email},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )
}

module.exports = { encryptPassWord, createJWT, createShortJWT }