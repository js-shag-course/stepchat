const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 10))

module.exports.hashPassword = async function (password) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
  return hashedPassword
}
// Синхронное
// module.exports.hashPassword = function(password) {
//   return  bcrypt.hashSync(password, salt);
// }

async function checkUser (user, password) {
  const match = await bcrypt.compare(password, user.passwordHash)
  if (match) {
    // login in account
  } else {
    // error uncorrect password or username
  }
}
