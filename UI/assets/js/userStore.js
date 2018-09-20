let cart = [];
const foods = [
    {
        id: '1',
        name: 'Burger bacon snacks',
        image: './assets/images/burger-bacon-snack-fast-food-47320.jpeg',
        category: 'vegetables',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
        price: 1000,
    }, {
        id: '2',
        name: 'Toasted bread & potato chips',
        image: './assets/images/toasted.jpeg',
        category: 'vegetables',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
        price: 1200,
    }, {
        id: '3',
        name: 'Fried plantain',
        image: './assets/images/fried plantain.jpeg',
        category: 'poultry',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
        price: 950,
    }
];

const getFoods = (foodCategory = 'vegetables') => {
  let items = '';
  const foodFiltered = foods.filter(item => item.category === foodCategory);
  if (foodFiltered.length < 1) {
      document.getElementById('food').innerHTML = '<div id="no-data">No entry to show</div>';
  } else {
      foodFiltered.forEach((item) => {
        items += `<li><span class="my-food"><img src="${item.image}" alt="${item.category}"></span>`
                +`<span class="in-text"><h3>${item.name}</h3>`
                +`<p>${item.description}</p>`
                +`<p class="price"><span class="big">Price:</span> ₦ ${item.price} <span>`
                +`<input type="button" class="order animate" onclick="pushOrder('${item.id}')" value="Add"></span></p>`
                +`</span></li>`
      });
      document.getElementById('food').innerHTML = items;
      document.getElementById("category-selected").value = foodCategory;
  }
}

const makeOrder = () => {
    if (cart.length > 0) {
        document.getElementById('add-food').style.display = 'block';
    } else {
        alert('please select a food item');
    }
}

const sendOrder = () => {
    if (document.getElementById('address').value.trim() === '') {
        alert('please provide your address');
    } else {
        document.getElementById('add-food').style.display = 'none';
        alert('Order sent successfully');
    }
}

const findItem = (id) => {
    return foods.find(item => item.id === id);
}

const refreshCart = () => {
    let cartItems = '', total = 0;
    cart.forEach((item) => {
        total += item.subTotal;
        cartItems += `<p><span>${item.name}</span>`
                +`<span class="cart-price">`
                +`<span class="cart-currency">₦</span>`
                +`<span class="digit">${item.price}</span></span>`
                +`<span class="qty">${item.qty}</span></p>`
    });
    document.getElementById('cart-content').innerHTML = cartItems;
    document.getElementById('total').innerHTML = total;
}

const pushOrder = (id) => {
    let track = 0;
    cart.forEach((item) => {
        if (item.id === id) {
            item.qty += 1;
            item.subTotal = item.price * item.qty;
            track = 1;
        }
    });
    if (track === 0) {
        const newCart = findItem(id);
        newCart.qty = 1;
        newCart.subTotal = newCart.price * newCart.qty;
        cart.push(newCart);
    }
    refreshCart();
}

const clearCart = () => {
    cart = [];
    refreshCart();
};

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

const filterCategory = () => {
    getFoods(document.getElementById("category-selected").value);
}

getFoods();
distintOptions();


