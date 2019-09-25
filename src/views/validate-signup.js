// this whole function will validate the signup from for correct user input before submission
document.getElementById("myForm").onsubmit = function () {
    let firstname = document.forms["myForm"]["fname"].value;
    let lastname = document.forms["myForm"]["lname"].value;
    let email = document.forms["myForm"]["email"].value;
    let password = document.forms["myForm"]["password"].value;
    let confirm_password = document.forms["myForm"]["cpassword"].value;
   
    // throws error message if firstname field is empty
    if(firstname === "" || firstname  === null){
        document.getElementById("fname_error").innerHTML = "first name required";
        return false;
    }

    // throws error message if lastname field is empty
    if(lastname === "" || lastname === null){
        document.getElementById("lname_error").innerHTML = " last name required";
        return false;
    }

    // throws error message if email field is empty
    if(email === ""){
        document.getElementById("email_error").innerHTML = " email required";
        return false;
    }

   //  throws error if password is empty  
    if(password === "" || password === null || password.length < 6){
        document.getElementById("password_error").innerHTML = "Password cannot be empty or less than 6 characters";
        return false;
    }

    // throw error if passowrd does not match
    if(confirm_password === "" || confirm_password !== password){
        document.getElementById("cpassword_error").innerHTML = "password does not match";
        return false;
    }
    
    return true;
}

// function to remove error warning in form
function removeWarning() {
    document.getElementById(this.id + "_error").innerHTML = "";
}

// calls the removeWarning function to each field
document.getElementById("fname").onkeyup = removeWarning;
document.getElementById("lname").onkeyup = removeWarning;
document.getElementById("email").onkeyup = removeWarning;
document.getElementById("password").onkeyup = removeWarning;
document.getElementById("cpassword").onkeyup = removeWarning;
