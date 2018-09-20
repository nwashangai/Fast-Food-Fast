const popup = (title='No title', msg) => {
    document.getElementById('title').innerHTML = title;
    document.getElementById('msg').innerHTML = msg;
    document.getElementById('alert').style.display = 'block';
}

const checkForm = () => {
    if (!document.getElementById('login-form').checkValidity()) {
        popup('Error', 'please provide a valid email');
        return false;
    }
    if (document.getElementById('lpassword').value.trim() === '') {
        popup('Error', 'password should not be empty');
        return false;
    }
    window.location.replace("user.html");
}

const checkSignUpForm = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!(/^[A-Za-z]+$/.test(document.getElementById('Sname').value))) {
        popup('Error', 'invalid name');
        return false;
    }
    if (!regex.test(String(document.getElementById('semail').value).toLowerCase())) {
        popup('Error', 'invalid email');
        return false;
    }
    if (!document.getElementById('signup').checkValidity()) {
        popup('Error', 'incorrect phone number');
        return false;
    }
    if (document.getElementById('spassword').value.trim() === '') {
        popup('Error', 'password should not be empty');
        return false;
    }
    if (document.getElementById('confirmPassword').value !== document.getElementById('spassword').value) {
        popup('Error', 'password does not match');
        return false;
    }
    window.location.replace("admin.html");
}

const checkOrderForm = () => {
    if (!document.getElementById('food-data').checkValidity()) {
        return false;
    }
}