const logout = () => {
    window.localStorage.removeItem('token-key');
    window.location.replace("index.html");
}

let user = {};
let cart = [];
let foods = [];

let orders = [];

/**
 * Gets food items and pupulate DOM
 * @param {String} foodCategory 
 */
const getFoods = (foodCategory = (foods[0].category || 'vegetables')) => {
  let items = '';
  const foodFiltered = foods.filter(item => item.category === foodCategory);
  if (foodFiltered.length < 1) {
      document.getElementById('food').innerHTML = '<div id="no-data">No entry to show</div>';
  } else {
      foodFiltered.forEach((item) => {
        items += `<li>
                    <span class="my-food">
                      <img src = "${item.image}" onerror="if (this.src != './assets/images/imahe.png') this.src = './assets/images/image.png';" alt="${item.category}">
                    </span>
                    <span class="in-text"><h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price"><span class="big">Price:</span> ₦ ${item.price} <span>
                    <input type="button" class="order animate" onclick="pushOrder('${item.id}')" value="Add"></span></p>
                    </span>
                </li>`
      });
      document.getElementById('food').innerHTML = items;
      document.getElementById("category-selected").value = foodCategory;
  }
}

/**
 * populate dropdown option
 */
const distintOptions = () => {
    const check = {};
    let result = '';
    for (let item, index = 0; item = foods[index++];) {
        let distint = item.category;

        if (!(distint in check)) {
            check[distint] = 1;
            result += `<option value="${distint}">${distint}</option>`
        }
    }
    document.getElementById('category-selected').innerHTML = result;
}

/**
 * Get User data
 */
const getUser = () => {
    const access = window.localStorage.getItem('token-key');
    if (access) {
        document.getElementById("loader").style.display = "block";
        request('get', `user`).then((response) => {
            if (response.status === 'error') {
            popup('Error', 'please login again');
            logout();
        } else {
            decoded = jwt_decode(window.localStorage.getItem('token-key'));
            request('get', `users/${decoded.payload.userId}/orders`).then((userOrders) => {
                if (userOrders.status === 'error') {
                    popup('Error', 'please login again');
                    logout();
                } else {
                    orders = userOrders.data;
                    orderList();
                }
            });
            request('get', `menu`).then((menu) => {
                if (menu.status === 'error') {
                    popup('Error', 'please login again');
                    logout();
                } else {
                    foods = menu.data;
                    document.getElementById("loader").style.display = "none";
                    distintOptions();
                    getFoods();
                }
            });
            user = response.data;
            document.getElementById('user-name').innerHTML = user.name;
            document.getElementById('user-first-name').innerHTML = user.name.split(" ")[0];
            document.getElementById('user-phone').innerHTML = user.phone;
        }
        });
    } else {
        logout();
    }
}

getUser();

/**
 * Populates the DOM with Orders list
 */
const orderList = () => {
    let item = '', i = 1;
    if(orders.length < 1) {
        document.getElementById('no-item').innerHTML = '<div id="no-data">No entry to show</div>';
    } else {
        document.getElementById('no-item').innerHTML = '<div id="no-data"></div>';
        orders.forEach(element => {
            let statusBtn = (element.status === 'proccessing') ?
                '<span class="waiting">Proccessing..</span>':
                (element.status === 'new') ?
                `<span class="waiting">Waiting..</span>`:
                (element.status === 'cancelled') ?
                `<span class="declined">Declined</span>`:
                `<span class="completed">Completed</span>`;
            item += `
                <div class="table-row">
                    <div class="table-body-cell  cell-11">
                        <span class="small-display">#id :</span> <span class="data">${i}</span>
                    </div>
                    <div class="table-body-cell cell-12">
                        <span class = "small-display" > Name: </span><span class="data">${new Date(element.date).toLocaleString()}</span >
                    </div>
                    <div class="table-body-cell cell-13">
                        <span class = "small-display" > Address: </span><span class="data">${element.address}</span >
                    </div>
                    <div class="table-body-cell cell-14">
                        <span class = "small-display" > Food: </span><span class="data clickable" onclick="viewFoodItems('${element.id}')">View items</span >
                    </div>
                    <div class="table-body-cell cell-15">
                        ${statusBtn}
                    </div>
                </div>
            `;
            i++;
        });
        document.getElementById('table-body').innerHTML = item;
    }
}

/**
 * Displays modal to add address and place order
 */
const makeOrder = () => {
    if (cart.length > 0) {
        document.getElementById('order-food').style.display = 'block';
    } else {
        popup('Error', 'please select a food item');
    }
}

/**
 * Send Order to the API
 */
const sendOrder = () => {
    if (document.getElementById('address').value.trim() === '') {
        popup('Error', 'please provide your address');
    } else {
        const myOrder = {
            address: document.getElementById('address').value,
            foodItems: cart
        }
        document.getElementById("loader").style.display = "block";
        request('post', `orders`, myOrder).then((response) => {
            if (response.status === 'error') {
                document.getElementById("loader").style.display = "none";
                popup('Error', response.message);
            } else {
                document.getElementById("loader").style.display = "none";
                clearCart();
                popup('Success', 'Order sent successfully');
                document.getElementById('order-food').style.display = 'none';
            }
        });
    }
}

/**
 * Find item in food array
 * @param {String} id 
 */
const findItem = (id) => {
    return foods.find(item => item.id === id);
}

/**
 * Refresh Cart UI
 */
const refreshCart = () => {
    let cartItems = '', total = 0;
    cart.forEach((item) => {
        total += item.subTotal;
        cartItems += `<p><span>${item.name}</span>
                <span class="cart-price">
                <span class="cart-currency">  ₦</span>
                <span class="digit">${item.subTotal}</span></span>
                <span class="qty">
                <span class="ctr"  onclick="minus('${item.foodId}')">- </span>
                ${item.quantity}
                <span class="ctr"  onclick="plus('${item.foodId}')"> +</span>
                </span></p>`
    });
    document.getElementById('cart-content').innerHTML = cartItems;
    document.getElementById('total').innerHTML = total;
};

/**
 * Add item to the cart
 */
const pushOrder = (id) => {
    let track = 0;
    cart.forEach((item) => {
        if (item.foodId === id) {
            const food = findItem(id);
            item.quantity += 1;
            item.subTotal = parseFloat(food.price) * parseInt(item.quantity);
            track = 1;
        }
    });
    if (track === 0) {
        const food = findItem(id);
        const newCart = {
            foodId: food.id,
            quantity: 1,
            name: food.name,
            subTotal: parseFloat(food.price)
        };
        cart.push(newCart);
    }
    refreshCart();
}

/**
 * Decrease quantity of item by one 
 */
const minus = id => {
    const food = findItem(id);
    cart.forEach((item) => {
        if (item.foodId === id && item.quantity > 1) {
            item.quantity -= 1;
            item.subTotal = food.price * item.quantity;
        }
    });
    refreshCart();
}

/**
 * Increase quantity of item by one 
 */
const plus = id => {
    const food = findItem(id);
    cart.forEach((item) => {
        if (item.foodId === id && item.quantity < 30) {
            item.quantity += 1;
            item.subTotal = food.price * item.quantity;
        }
    });
    refreshCart();
}

/**
 * Clears the cart
 */
const clearCart = () => {
    cart = [];
    refreshCart();
};

/**
 * Filters category item
 */
const filterCategory = () => {
    getFoods(document.getElementById("category-selected").value);
}


