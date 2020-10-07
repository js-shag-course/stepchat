window.onload = function() {
const but = document.getElementById('but');
let user = {
    name : 'Heigen'
}
but.onclick = function(){
    console.log("f");
    let response =  fetch('http://localhost:3000/user',{
        method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
    })
}
}