const user = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '08012345676'
};
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

const orders = [
    {
      id: '1234567',
      userid: 'egfwegfj',
      name: 'john',
      totalPrice: '700',
      status: 'new',
      phone: '08036829642',
      address: '56 ikeja lagos',
          date: '8/3/2018, 9:35:59 AM',
      fooditems: [
          {
            foodId: '1',
            name: 'Burger bacon snacks',
            price: 100,
            quantity: 2,
            subTotal: "200"
          }, {
              foodId: '2',
              name: 'Toasted bread & potato chips',
              price: 300,
              quantity: 1,
              subTotal: "300"
          }, {
              foodId: '3',
              name: 'Fried plantain',
              price: 200,
              quantity: 1,
              subTotal: "200"
          },
      ]
    }, {
      id: '1297967',
      userid: 'natgls',
      name: 'Mike',
      totalPrice: '500',
      status: 'proccessing',
      phone: '08036829642',
      address: '56 ikeja lagos',
      date: '8/3/2018, 9:35:59 AM',
      fooditems: [
          {
            foodId: '1',
            name: 'Burger bacon snacks',
            price: 100,
            quantity: 2,
            subTotal: "200"
          }, {
              foodId: '2',
              name: 'Toasted bread & potato chips',
              price: 300,
              quantity: 1,
              subTotal: "300"
          }
      ]
    }, {
      id: '7258502',
      userid: 'snjsv',
      name: 'Fred',
      totalPrice: '300',
      status: 'completed',
      phone: '08036829642',
      address: '56 ikeja lagos',
      date: '8/3/2018, 9:35:59 AM',
      fooditems: [
          {
              foodId: '2',
              name: 'Toasted bread & potato chips',
              price: 300,
              quantity: 1,
              subTotal: "300"
          }
      ]
    }
];

document.getElementById('user-name').innerHTML = user.name;
document.getElementById('user-first-name').innerHTML = user.name.split(" ")[0];
document.getElementById('user-phone').innerHTML = user.phone;

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


const orderList = () => {
    let item = '', i = 1;
    if(orders.length < 1) {
        document.getElementById('table-body').innerHTML = '<div id="no-data">No entry to show</div>';
    } else {
        orders.forEach(element => {
            let statusBtn = (element.status === 'proccessing') ?
                '<span class="waiting">Proccessing..</span>':
                (element.status === 'new') ?
                `<span class="waiting">Waiting..</span>`:
                (element.status === 'declined') ?
                `<span class="declined">Declined</span>`:
                `<span class="completed">Completed</span>`;
            item += `
                <div class="table-row">
                    <div class="table-body-cell  cell-11">
                        <span class="small-display">#id :</span> <span class="data">${i}</span>
                    </div>
                    <div class="table-body-cell cell-12">
                        <span class="small-display">Name :</span><span class="data">${element.date}</span>
                    </div>
                    <div class="table-body-cell cell-13">
                        <span class = "small-display" > Address: </span><span class="data">${element.address}</span >
                    </div>
                    <div class="table-body-cell cell-14">
                        <span class = "small-display" > Food: </span><span class="data clickable" onclick="viewFoodItems(${element.id})">View items</span >
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

orderList();

const makeOrder = () => {
    if (cart.length > 0) {
        document.getElementById('order-food').style.display = 'block';
    } else {
        popup('Error', 'please select a food item');
    }
}

const sendOrder = () => {
    if (document.getElementById('address').value.trim() === '') {
        popup('Error', 'please provide your address');
    } else {
        document.getElementById('order-food').style.display = 'none';
        popup('Success', 'Order sent successfully');
    }
}

const findItem = (id) => {
    return foods.find(item => item.id === id);
}

const refreshCart = () => {
    let cartItems = '', total = 0;
    cart.forEach((item) => {
        total += item.subTotal;
        cartItems += `<p><span>${item.name}</span>
                <span class="cart-price">
                <span class="cart-currency">  ₦</span>
                <span class="digit">${item.subTotal}</span></span>
                <span class="qty">
                <span class="ctr"  onclick="minus('${item.id}')">- </span>
                ${item.qty}
                <span class="ctr"  onclick="plus('${item.id}')"> +</span>
                </span></p>`
    });
    document.getElementById('cart-content').innerHTML = cartItems;
    document.getElementById('total').innerHTML = total;
};

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

const minus = id => {
    cart.forEach((item) => {
        if (item.id === id && item.qty > 0) {
            item.qty -= 1;
            item.subTotal = item.price * item.qty;
        }
    });
    refreshCart();
}

const plus = id => {
    cart.forEach((item) => {
        if (item.id === id && item.qty < 30) {
            item.qty += 1;
            item.subTotal = item.price * item.qty;
        }
    });
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

const logout = () => {
    window.location.replace("index.html");
}