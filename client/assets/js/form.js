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
    document.getElementById("loader").style.display = "block";
    const data = {
        email: document.getElementById('lemail').value,
        password: document.getElementById('lpassword').value
    }
    request('post', `auth/login`, data).then((response) => {
        document.getElementById("loader").style.display = "none";
        if (response.status === 'error') {
            popup('Error', response.message);
        } else {
            window.localStorage.setItem('token-key', response.token);
            var decoded = jwt_decode(response.token);
            if (decoded.payload.isAdmin) {
                window.location.replace("admin/admin.html");
            } else {
                window.location.replace("user.html");
            }
        }
    }).catch((err) => {
        document.getElementById("loader").style.display = "none";
        popup('Error', err.message);
    });
}

const checkSignUpForm = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!(/^[A-Za-z\s]+$/.test(document.getElementById('sname').value))) {
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
    document.getElementById("loader").style.display = "block";
    const data = {
        name: document.getElementById('sname').value,
        email: document.getElementById('semail').value,
        phone: document.getElementById('sphone').value,
        password: document.getElementById('spassword').value
    }
    request('post', `auth/signup`, data).then((response) => {
        document.getElementById("loader").style.display = "none";
        if (response.status === 'error') {
            popup('Error', response.message);
        } else {
            window.localStorage.setItem('token-key', response.data.token);
            const decoded = jwt_decode(response.data.token);
            if (decoded.payload.isAdmin) {
                window.location.replace("admin/admin.html");
            } else {
                window.location.replace("user.html");
            }
        }
    }).catch((err) => {
        document.getElementById("loader").style.display = "none";
        popup('Error', err.message);
    });
}

const checkOrderForm = () => {
    if (!document.getElementById('food-data').checkValidity()) {
        return false;
    }
}