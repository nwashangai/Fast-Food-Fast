const checkForm = () => {
    if (!document.getElementById('signup').checkValidity()) {
        // $('form').find('input[type="submit"]').click();
        alert('nooo');
        return false;
    }
}