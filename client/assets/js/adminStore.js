const logout = () => {
    window.localStorage.removeItem('token-key');
    window.location.replace("../index.html");
}

const loader = document.getElementById("loader");

let user = {};
let foods = [];

let orders = [];
let category = [];

/**
 * Gets food items and pupulate DOM
 * @param {String} foodCategory 
 */
const getFoods = (foodCategory = (foods[0].category || 'vegetables')) => {
  let items = '';
  const foodFiltered = foods.filter(item => item.category.toUpperCase() === foodCategory.toUpperCase());
  if (foodFiltered.length < 1) {
      document.getElementById('food').innerHTML = '<div id="no-data">No entry to show</div>';
  } else {
      foodFiltered.forEach((item) => {
        items += `<li>
                <span class="my-food">
                    <img src="${item.image}" onerror="if (this.src != '../assets/images/imahe.png') this.src = '../assets/images/image.png';">
                </span>
                <span class="in-text"><h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price"><span class="big">Price:</span> ₦ ${item.price} <span>
                <input type="button" class="delete" onclick="confirmDelete('${item.id}', '${item.category}')" value="Delete">
                <input type="button" onclick="edit('${item.id}')" value="Edit"></span></p>
                </span></li>`
      });
      document.getElementById('food').innerHTML = items;
      document.getElementById("category-selected").value = foodCategory.toUpperCase();
  }
}

/**
 * Cancel delet operation
 */
const cancel = () => {
    document.getElementById("confirm").style.display = 'none';
}

/**
 * Confirm dialogue box 
 * @param {String} id 
 * @param {String} fdCategory 
 */
const confirmDelete = (id, fdCategory) => {
    document.getElementById("del").innerHTML = `<input type="button" value="Yes" onclick="deleteItem('${id}', '${fdCategory}')" id="ok-btn" class="status confirm">
                <input type="button" value="No" id="cancel-btn" onclick="cancel()" class="status confirm">`;
    document.getElementById("confirm").style.display = "block";
}

/**
 * Deletes food item
 * @param {*} id 
 * @param {*} fdCategory 
 */
const deleteItem = (id, fdCategory) => {
    document.getElementById("confirm").style.display = "none";
    document.getElementById("loader").style.display = "block";
    request('delete', `menu/${id}`).then((response) => {
        if (response.status === 'error') {
            document.getElementById("loader").style.display = 'none';
            popup('Error', response.message);
            return false;
        } else {
            document.getElementById("loader").style.display = 'none';
            popup('Success', 'Item successfully deleted');
            const index = foods.findIndex(item => item.id === id);
            foods.splice(index, 1);
            getFoods(fdCategory);
        }
    });
}

/**
 * populate dropdown option
 */
const distintOptions = () => {
    const check = {};
    let result = '';
    for (let item, index = 0; item = foods[index++];) {
        let distint = item.category;

        if (!(distint.toUpperCase() in check)) {
            check[distint.toUpperCase()] = 1;
            category.push(distint.toUpperCase());
            result += `<option value="${distint.toUpperCase()}">${distint.toUpperCase()}</option>`
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
            request('get', `orders`).then((userOrders) => {
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
            document.getElementById('user-email').innerHTML = user.email;
            document.getElementById('user-phone').innerHTML = user.phone;
            document.getElementById('user-first-name').innerHTML = user.name.split(" ")[0];
        }
        });
    } else {
        logout();
    }
}

getUser();

/**
 *Convert image file to base64encoded string
 */
const readFile = () => {
        const file = document.getElementById("image").files;

    if (file && file[0]) {

        var FR = new FileReader();

        FR.addEventListener("load", event => {
            document.getElementById("food-image").src = event.target.result;
        });

        FR.readAsDataURL(file[0]);
    }

}

document.getElementById("image").addEventListener("change", readFile);

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
            let statusBtn = (element.status === 'processing') ?
                `<input type="button" value="Deliver" onclick="deliver(event, '${element.id}')" class="status deliver">`:
                (element.status === 'new') ?
                `<input type="button" value="Accept" onclick="accepted(event, '${element.id}')" class="status accept">
                <input type="button" value="Decline" onclick="decline(event, '${element.id}')" class="status decline">`:
                (element.status === 'cancelled') ?
                `<span class="declined">Declined</span>`:
                `<span class="completed">Completed</span>`;
            item += `
                <div class="table-row">
                    <div class="table-body-cell  cell-1">
                        <span class="small-display">#id :</span> <span class="data">${i}</span>
                    </div>
                    <div class="table-body-cell cell-2">
                        <span class="small-display">Name :</span><span class="data">${element.name}</span>
                    </div>
                    <div class="table-body-cell cell-3">
                        <span class = "small-display" > Address: </span><span class="data">${element.address}</span >
                    </div>
                    <div class="table-body-cell cell-4">
                        <span class = "small-display" > Food: </span><span class="data clickable" onclick="viewFoodItems('${element.id}')">View items</span >
                    </div>
                    <div class="table-body-cell cell-5">
                        <span class = "small-display" > Phone: </span><span class="data">${element.phone}</span >
                    </div>
                    <div class="table-body-cell cell-6">
                        ${statusBtn}
                    </div>
                </div>
            `;
            i++;
        });
        document.getElementById('table-body').innerHTML = item;
    }
}

orderList();

/**
 * Find item in food array
 * @param {String} id 
 */
const findItem = (id) => {
    return foods.find(item => item.id === id);
}

/**
 * Find item in order array
 * @param {String} id 
 */
const findOrder = (id) => {
    return orders.find(item => item.id === id);
}

/**
 * Sends new food item to be added to the server
 */
const addFood = () => {
    const imageRegex = /data:image\/([a-zA-Z]*);base64,([^\"]*)/g;
    if (!document.getElementById('food-data').checkValidity()) {
        popup('Error', 'please provide correct input values');
        return false;
    }
    if (document.getElementById("food-image").src && !imageRegex.test(document.getElementById("food-image").src)) {
        popup('Error', 'invalid image url');
        return false;
    }
    const data = {
        name: document.getElementById('foodName').value,
        description: document.getElementById('desc').value,
        price: parseInt(document.getElementById('foodPrice').value),
        category: document.getElementById('foodCategory').value,
        image: document.getElementById("food-image").src || null
    }
    document.getElementById("loader").style.display = "block";
    request('post', `menu`, data).then((response) => {
        if (response.status === 'error') {
            document.getElementById('loader').style.display = 'none';
            popup('Error', response.message);
            return false;
        } else {
            request('get', `menu`).then((menu) => {
                if (menu.status === 'error') {
                    document.getElementById('loader').style.display = 'none';
                    popup('Error', 'please login again');
                } else {
                    foods = menu.data;
                    document.getElementById("loader").style.display = "none";
                    distintOptions();
                    getFoods();
                    document.getElementById('loader').style.display = 'none';
                    popup('success', 'food added successfully');
                    document.getElementById('add-food').style.display = 'none';
                }
            });
        }
    });
}

/**
 * Update a specific food item in the API
 * @param {String} id 
 */
const updateFood = (id) => {
    const imageRegex = /data:image\/([a-zA-Z]*);base64,([^\"]*)/g;
    if (!document.getElementById('food-data').checkValidity()) {
        popup('Error', 'please provide correct input values');
        return false;
    }
    if (document.getElementById("food-image").src && !imageRegex.test(document.getElementById("food-image").src)) {
        popup('Error', 'invalid image url');
        return false;
    }
    const data = {
        name: document.getElementById('foodName').value,
        description: document.getElementById('desc').value,
        price: parseInt(document.getElementById('foodPrice').value),
        category: document.getElementById('foodCategory').value,
        image: document.getElementById("food-image").src || null
    }
    document.getElementById("loader").style.display = "block";
    request('put', `menu/${id}`, data).then((response) => {
        if (response.status === 'error') {
            document.getElementById('loader').style.display = 'none';
            popup('Error', response.message);
            return false;
        } else {
            request('get', `menu`).then((menu) => {
                if (menu.status === 'error') {
                    document.getElementById('loader').style.display = 'none';
                    popup('Error', 'please login again');
                } else {
                    foods = menu.data;
                    document.getElementById("loader").style.display = "none";
                    distintOptions();
                    getFoods(data.category);
                    document.getElementById('loader').style.display = 'none';
                    popup('success', 'update successful');
                    document.getElementById('add-food').style.display = 'none';
                }
            });
        }
    });
}

/**
 * Reset form to add new item
 */
const newItem = () => {
    document.getElementById("food-data").reset();
    document.getElementById("food-image").removeAttribute("src");
    document.getElementById('my-title').innerHTML = 'Add Food';
    document.getElementById('my-submit').innerHTML = '<input type="button" value="ADD FOOD" onclick="addFood()">';
    document.getElementById('add-food').style.display = 'block';
}

/**
 * Populate form with data for edit
 * @param {String} id 
 */
const edit = (id) => {
    document.getElementById("food-image").removeAttribute("src");
    const imageRegex = /data:image\/([a-zA-Z]*);base64,([^\"]*)/g;
    editItem = findItem(id);
    if (imageRegex.test(editItem.image)) {
        document.getElementById("food-image").src = editItem.image;
    }
    document.getElementById('foodName').value = editItem.name;
    document.getElementById('foodCategory').value = editItem.category;
    document.getElementById('desc').value = editItem.description;
    document.getElementById('foodPrice').value = editItem.price;
    document.getElementById('my-title').innerHTML = 'Edit Food';
    document.getElementById('my-submit').innerHTML = `<input type="button" value="UPDATE FOOD" onclick="updateFood('${editItem.id}')">`;
    document.getElementById('add-food').style.display = 'block'
}

/**
 * Update user status to proccessing
 * @param {Event} evt
 * @param {String} id 
 */
const accepted = (evt, id) => {
    evt.currentTarget.parentElement.innerHTML = `<i id="${id}" class="fa fa-refresh fa-spin"></i>Loading`;
    request('put', `orders/${id}`, { status: 'processing'}).then((response) => {
        if (response.status === 'error') {
            document.getElementById(id).parentElement.innerHTML = `<input type="button" value="Accept" onclick="accepted(event, '${id}')" class="status accept">
                    <input type="button" value="Decline" onclick="decline(event, '${id}')" class="status decline">`
            popup('Error', response.message);
        } else {
            const foundIndex = orders.findIndex(x => x.id == id);
            orders[foundIndex].status = 'processing';
            document.getElementById(id).parentElement.innerHTML = `<input type="button" value="Deliver" onclick="deliver(event, '${id}')" class="status deliver">`;
        }
    });
}

/**
 * Update user status to cancelled
 * @param {Event} evt
 * @param {String} id 
 */
const decline = (evt, id) => {
    evt.currentTarget.parentElement.innerHTML = `<i id="${id}" class="fa fa-refresh fa-spin"></i>Loading`;
    request('put', `orders/${id}`, { status: 'cancelled'}).then((response) => {
        if (response.status === 'error') {
            document.getElementById(id).parentElement.innerHTML = `<input type="button" value="Accept" onclick="accepted(event, '${id}')" class="status accept">
                    <input type="button" value="Decline" onclick="decline(event, '${id}')" class="status decline">`
            popup('Error', response.message);
        } else {
            const foundIndex = orders.findIndex(x => x.id == id);
            orders[foundIndex].status = 'cancelled';
            document.getElementById(id).parentElement.innerHTML = `<span class="declined">Declined</span>`;
        }
    });
}

/**
 * Update user status to completed
 * @param {Event} evt
 * @param {String} id 
 */
const deliver = (evt, id) => {
    evt.currentTarget.parentElement.innerHTML = `<i id="${id}" class="fa fa-refresh fa-spin"></i>Loading`;
    request('put', `orders/${id}`, { status: 'completed'}).then((response) => {
        if (response.status === 'error') {
            document.getElementById(id).parentElement.innerHTML = `<input type="button" value="Deliver" onclick="deliver(event, '${id}')" class="status deliver">`
            popup('Error', response.message);
        } else {
            const foundIndex = orders.findIndex(x => x.id == id);
            orders[foundIndex].status = 'completed';
            document.getElementById(id).parentElement.innerHTML = `<span class="completed">Completed</span>`;
        }
    });
}

/**
 * Filters category item
 */
const filterCategory = () => {
    getFoods(document.getElementById("category-selected").value);
}

/**
 * Input auto-complete for food category
 * @param {String} inp 
 * @param {Array} arr 
 */
const autocomplete = (inp, arr) => {
    let currentFocus;
    inp.addEventListener("input", function (event) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (event) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (event) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (event.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (event.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (event.keyCode == 13) {
            event.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    const addActive = (x) => {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    const removeActive = (x) => {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    const closeAllLists = (elmnt) => {
        const x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", (event) => {
        closeAllLists(event.target);
    });
}

autocomplete(document.getElementById("foodCategory"), category);