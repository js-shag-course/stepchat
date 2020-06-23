const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

async function hashPassword (password) {

  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
    // console.log(hashedPassword);
    return hashedPassword
}

async function checkUser(user, password) {
 
    const match = await bcrypt.compare(password, user.passwordHash);
 
    if(match) {
        //login in account
    }
    else{
        //error uncorrect password or username
    }

}
