let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
const scrollUpBtn = document.querySelector(".toputbtn")
let products = [];
let cart = [];
const item = [
    {
        "id": 1,
        "name": "პურის ფქვილი",
        "price": 50,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 2,
        "name": "პურის ფქვილი",
        "price": 250,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 3,
        "name": "პურის ფქვილი",
        "price": 290,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 4,
        "name": "პურის ფქვილი",
        "price": 50,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 5,
        "name": "პურის ფქვილი",
        "price": 300,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 6,
        "name": "პურის ფქვილი",
        "price": 50,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 7,
        "name": "პურის ფქვილი",
        "price": 50,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 8,
        "name": "პურის ფქვილი",
        "price": 50,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 9,
        "name": " პურის ფქვილი",
        "price": 50,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 10,
        "name": " პურის ფქვილი",
        "price": 50,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    },
    {
        "id": 11,
        "name": "პურის ფქვილი ",
        "price": 50,
        "image": "image/ck-bakers-golde001.jpg",
        "status": "უმაღლესი ხარისხი"
    }
]

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const addDataToHTML = () => {
    // remove datas default from HTML

    // add new datas
    if (products.length > 0) // if has data
    {
        products.forEach(product => {
            console.log(product);
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img class=imgs src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price} ლარი</div>
                <div class="status">${product.status}</div>
                <button class="addCart">კალათაში დამატება</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;

            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {

    products = item;
    addDataToHTML();



}
initApp();
let startingPosition = 0
window.addEventListener('scroll', (event) => {
    const currentPosition = window.scrollY;
    const isScrollUp = startingPosition < currentPosition;
    startingPosition = currentPosition;
    if (currentPosition > 20) {
        scrollUpBtn.style.opacity = '1';
        scrollUpBtn.disabled = false;
    } else {
        scrollUpBtn.style.opacity = '0';
        scrollUpBtn.disabled = true;
    }
});
scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});