const products = [
    {
      id: 1,
      name: 'Hoa Cưới',
      image: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/362271170_684901940348296_2650960558760715953_n.jpg?stp=c0.34.206.206a_dst-jpg_p206x206&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=W-PMi-RvkBsAX--6_sV&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAxl7S9bD4VyLfkFTsaR0g2vq5P4mjqxoi_K11UwyEYgQ&oe=64C4F172',
      price: '799,000'
    },
    {
      id: 2,
      name: 'Hoa để bàn',
      image: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/361564743_682866100551880_5899295534776028816_n.jpg?stp=dst-jpg_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=da31f3&_nc_ohc=4eC6oPmDQYEAX8dKUFU&_nc_ht=scontent.fhan4-1.fna&oh=00_AfDQb8WJ_SLNRAZ9tw2msNkPr7Dyfty38WYx_SLfmr0CsA&oe=64C556EC',
      price: '299,000'
    },
    {
      id: 3,
      name: 'Hoa Trang Trí',
      image: '../assets/123456.jpg',
      price: '699,000'
    },
    {
      id: 4,
      name: 'Lọ Hoa',
      image: '../assets/678.jpg',
      price: '599,000'
      
    },
    {
        id: 5,
        name: 'Hoa trưng bày',
        image: 'https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/353768199_663212932517197_2372817826132552460_n.jpg?stp=dst-jpg_p206x206&_nc_cat=106&ccb=1-7&_nc_sid=da31f3&_nc_ohc=m9m-qEPjTC4AX8wf7rm&_nc_ht=scontent.fhan3-4.fna&oh=00_AfDgzwFPwxK_LR4g8CcbtydZTKPWTcHKg4V_chrc3rVkSA&oe=64C44234',
        price: '1,000,000'
        
      },
      {
        id: 6,
        name: 'Bó hoa ',
        image: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/355300869_666950158810141_955840862600306707_n.jpg?stp=c0.34.206.206a_dst-jpg_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=da31f3&_nc_ohc=cCtcauBLFyIAX_YkdZh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfCj3gjj3lXDfl3Igyyhc7WXe2qU2bP26xlI6L24GgDVZA&oe=64C504FF',
        price: '299,000'
        
      }
  ];
  let productInCart = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  
  function saveToLocalStorage () {
    localStorage.setItem('products', JSON.stringify(productInCart));
  }
  
  //Index page
  function renderProducts () {
    let data = ``;
    products.map(value => {
      data += `
        <div class='col-3'>
          <div class='card'>
            <img src='${value.image}' class='card-img-top' alt=''>
            <div class='card-body'>
              <h5 class='card-title'>${value.name}</h5>
              <p class='card-text'>${value.price}</p>
              <button onclick='addToCart(${value.id})' class='btn btn-primary'>Add to cart</button>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById('products').innerHTML = data;
  }
  
  function addToCart (id) {
    let checkProduct = productInCart.some(value => value.id === id);
  
    if (!checkProduct) {
      let product = products.find(value => value.id === id);
      productInCart.unshift({
        ...product,
        quantity: 1
      });
      saveToLocalStorage();
      calculatorTotal();
    } else {
      let product = productInCart.find(value => value.id === id);
      let getIndex = productInCart.findIndex(value => value.id === id);
      productInCart[getIndex] = {
        ...product,
        quantity: ++product.quantity
      };
      saveToLocalStorage();
    }
  }
  
  function calculatorTotal () {
    document.getElementById('total').innerHTML = productInCart.length;
  }
  
  function indexLoadPage () {
    renderProducts();
    calculatorTotal();
  }
  
  //Cart page
  function renderProductsToTable () {
    let data = ``;
    productInCart.map((value, index) => {
      data += `
        <tr>
          <td>${value.name}</td>
          <td><img width='100' src='${value.image}' alt=''></td>
          <td>${value.price}</td>
          <td>
            <button onclick='plusQuantity(${index})' class='btn btn-secondary'>+</button>
            <span class='mx-2'>${value.quantity}</span>
            <button onclick='minusQuantity(${index}, ${value.quantity})' class='btn btn-secondary'>-</button>
          </td>
          <td>${(value.quantity * value.price.replace(/,/g, '')).toLocaleString()}</td>
          <td><button onclick='deleteProductInCart(${index})' class='btn btn-danger'>Delete</button></td>
        </tr>
      `;
    });
    document.getElementById('products-cart').innerHTML = data;
  }
  
  function plusQuantity (index) {
    productInCart[index] = {
      ...productInCart[index],
      quantity: ++productInCart[index].quantity
    };
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney()
  }
  
  function minusQuantity (index, quantity) {
    if (quantity > 1) {
      productInCart[index] = {
        ...productInCart[index],
        quantity: --productInCart[index].quantity
      };
      saveToLocalStorage();
      renderProductsToTable();
      totalMoney()
    } else {
      alert('Quantity min is 1');
    }
  }
  
  function deleteProductInCart (index) {
    productInCart.splice(index, 1);
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney()
  }
  
  function totalMoney () {
    if (productInCart !== []) {
      let total = 0;
      for (let i = 0; i < productInCart.length; i++) {
        total += productInCart[i].quantity * productInCart[i].price.replace(/,/g, '');
      }
      document.getElementById("total-money").innerHTML = total.toLocaleString()
    }
  }
  
  function cartLoadPage () {
    renderProductsToTable();
    totalMoney();
  }