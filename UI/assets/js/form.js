const checkForm = () => {
    if (!document.getElementById('login-form').checkValidity()) {
        alert('please provide correct input values')
        return false;
    }
    window.location.replace("user.html");
}

const checkSignUpForm = () => {
    if (!document.getElementById('signup').checkValidity()) {
        alert('please provide correct input values')
        return false;
    }
    window.location.replace("admin.html");
}

const checkOrderForm = () => {
    if (!document.getElementById('food-data').checkValidity()) {
        return false;
    }
}