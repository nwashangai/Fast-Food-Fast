const user = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '08012345676'
};
const foods = [{
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
}];

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
document.getElementById('user-email').innerHTML = user.email;
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
                +`<input type="button" class="delete" onclick="deleteItem('${item.id}', '${item.category}')" value="Delete">`
                +`<input type="button" onclick="edit('${item.id}')" value="Edit"></span></p>`
                +`</span></li>`
      });
      document.getElementById('food').innerHTML = items;
      document.getElementById("category-selected").value = foodCategory;
  }
}

const readFile = _ => {
        const file = document.getElementById("image").files;

    if (file && file[0]) {
        console.log(file[0]);

        var FR = new FileReader();

        FR.addEventListener("load", e => {
            document.getElementById("food-image").src = e.target.result;
        });

        FR.readAsDataURL(file[0]);
    }

}

document.getElementById("image").addEventListener("change", readFile);

const orderList = () => {
    let item = '', i = 1;
    if(orders.length < 1) {
        document.getElementById('table-body').innerHTML = '<div id="no-data">No entry to show</div>';
    } else {
        orders.forEach(element => {
            let statusBtn = (element.status === 'proccessing') ?
                '<input type="button" value="Deliver" onclick="deliver(event)" class="status deliver">':
                (element.status === 'new') ?
                `<input type="button" value="Accept" onclick="accepted(event)" class="status accept">
                <input type="button" value="Decline" onclick="decline(event)" class="status decline">`:
                (element.status === 'declined') ?
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
                        <span class = "small-display" > Food: </span><span class="data clickable" onclick="viewFoodItems(${element.id})">View items</span >
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

const findItem = (id) => {
    return foods.find(item => item.id === id);
}

const updateFood = () => {
    if (!document.getElementById('food-data').checkValidity()) {
        popup('Error', 'please provide correct input values');
        return false;
    }
    document.getElementById('add-food').style.display = 'none';
    popup('success', 'update successful');
}

const addFood = () => {
    if (!document.getElementById('food-data').checkValidity()) {
        popup('Error', 'please provide correct input values');
        return false;
    }
    document.getElementById('add-food').style.display = 'none';
    popup('success', 'food added successfully');
}

const newItem = () => {
    document.getElementById("food-data").reset();
    document.getElementById('my-title').innerHTML = 'Add Food';
    document.getElementById('my-submit').innerHTML = '<input type="button" value="ADD FOOD" onclick="addFood()">';
    document.getElementById('add-food').style.display = 'block';
}

const edit = (id) => {
    editItem = findItem(id);
    console.log(editItem);
    document.getElementById('hidden').value = editItem.id;
    document.getElementById('foodName').value = editItem.name;
    document.getElementById('foodCategory').value = editItem.category;
    document.getElementById('desc').value = editItem.description;
    document.getElementById('foodPrice').value = editItem.price;
    document.getElementById('my-title').innerHTML = 'Edit Food';
    document.getElementById('my-submit').innerHTML = '<input type="button" value="UPDATE FOOD" onclick="updateFood()">';
    document.getElementById('add-food').style.display = 'block'
}

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

const accepted = (evt) => {
    evt.currentTarget.parentElement.innerHTML = '<input type="button" value="Deliver" onclick="deliver(event)" class="status deliver">';
}

const decline = (evt) => {
    evt.currentTarget.parentElement.innerHTML = '<span class="declined">Declined</span>';
}

const deliver = (evt) => {
    evt.currentTarget.parentElement.innerHTML = '<span class="completed">Completed</span>';
}
const filterCategory = () => {
    getFoods(document.getElementById("category-selected").value);
}

const deleteItem = (id, fdCategory) => {
    const index = foods.findIndex(item => item.id === id);
    foods.splice(index, 1);
    getFoods(fdCategory);
}

getFoods();
distintOptions();