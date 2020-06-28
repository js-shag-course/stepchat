module.exports.checkLength = function(name){
    if(name.length<32 && name.length>3){
        return true;
    }
    else return false;
};