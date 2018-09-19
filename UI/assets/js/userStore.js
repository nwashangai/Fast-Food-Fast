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

const getFoods = (foodCategory = 'vagetables') => {
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
                +`<input type="button" class="order" onclick="document.getElementById('add-food').style.display='block'" value="Order"></span></p>`
                +`</span></li>`
      });
      document.getElementById('food').innerHTML = items;
      document.getElementById("category-selected").value = foodCategory;
  }
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

const filterCategory = () => {
    getFoods(document.getElementById("category-selected").value);
}

getFoods();
distintOptions();


