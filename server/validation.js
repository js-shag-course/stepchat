const index = require('./index.js')
function unique(username) {
    if (!index.users.includes(str)) {
        return true
    }
    else{return false}
  
};
// module.exports; unique() = unique();
function chechkUsernameLength(username){
    if(username.length<32 && username.length>3){
        return true;
    }
    else return false;
};
function usernameValidation(username){
    if(unique(username) && chechkUsernameLength(username)){
        return true;
    }
    else return false;
}


