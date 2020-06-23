// const index = require('./index.js')
function unique (username) {
    if (!index.users.includes(username)) {
        return true
    }
    else{return false}
  
};
// module.exports; unique() = unique();
function chechkUsernameLength (username){
    if(username.length<32 && username.length>3){
        return true;
    }
    else return false;
};
module.exports.usernameValidation = function(username){
    if(unique(username) && chechkUsernameLength(username)){
        return true;
    }
    else return false;
}
