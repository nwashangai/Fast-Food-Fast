/**
 * handles close of all modals
 * @param {Event} event 
 */
window.onclick = (event) => {
    if (event.target == document.getElementById('add-food')) {
        document.getElementById('add-food').style.display = 'none';
    }
    if (event.target == document.getElementById('close-btn')) {
        document.getElementById('alert').style.display = 'none';
    }
    if (event.target == document.getElementById('view-food')) {
        document.getElementById('view-food').style.display = 'none';
    }
    if (event.target == document.getElementById('order-food')) {
        document.getElementById('order-food').style.display = 'none';
    }
}

/**
 * Displays user order cart items on a modal
 * @param {String} id 
 */
const viewFoodItems = id => {
    let item = '';
    const foodItem = orders.find(item => item.id == id);
    let total = 0;
    foodItem.fooditems.forEach(element => {
        item += `
        <div class="item-row">
            <div class="item-name">${element.name}</div>
            <div class="item-price right"></div>
            <div class="item-qty right">${element.quantity}</div>
            <div class="item-sub right">₦ ${element.subTotal}</div>
        </div>
        `;
        total += parseInt(element.subTotal);
    });
    document.getElementById('cart-items').innerHTML = item;
    document.getElementById('total-price').innerHTML = total;
    document.getElementById('view-food').style.display = 'block';
}