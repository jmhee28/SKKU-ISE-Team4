const crypto = require('crypto');
const bcrypt = require("bcrypt");

const createhash = async function(password){
    let newhashpassword = await bcrypt.hash(password, 10)
    return newhashpassword 
} 

const createSalt = async () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

const createHashedPassword = async (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });

const makePasswordHashed = (userId, plainPassword) =>
    new Promise(async (resolve, reject) => {
        
        // userId와 일치하는 DB에 저장된 salt를 가져와야한다
        // salt를 가져오는 부분은 DB에 따라 수정 (아래는 예시)
        const salt = await models.user
            .findOne({
                attributes: ['salt'],
                raw: true,
                where: {
                    userId,
                },
            })
            .then((result) => result.salt);
        
        // 가져온 user salt로 다시 암호화 진행해서 return
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });

exports.makePasswordHashed = makePasswordHashed
exports.createHashedPassword = createHashedPassword
module.exports = {createhash}