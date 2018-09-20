window.onclick = (event) => {
    if (event.target == document.getElementById('add-food')) {
        document.getElementById('add-food').style.display = 'none';
    }
    if (event.target == document.getElementById('close-btn')) {
        document.getElementById('alert').style.display = 'none';
    }
}