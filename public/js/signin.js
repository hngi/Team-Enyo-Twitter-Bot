document.getElementById("myForm").onsubmit = function (){
 let naming =  document.forms["myForm"]["username"].value;
 let hiding = document.forms["myForm"]["password"].value;

 if(naming === ''){
   document.getElementById('ist').innerHTML = 'invalid username';
   return false;
}
if(hiding < 6){
   document.getElementById('secs').innerHTML = 'invalid password';
   return false;
}
return true;
 }

 function clearErrorMsg() {
   document.getElementById(this.id + "_error").innerHTML = "" ; 
 }
 document.getElementById("username").onkeyup = clearErrorMsg;
 document.getElementById("password").onkeyup = clearErrorMsg;
 