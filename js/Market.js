import { products } from "./data/products.js";


const productsGrid = document.getElementById("productsGrid");

function renderProducts(productsArray){

    productsGrid.innerHTML = "";

     const title = document.getElementById("prod");

            if(productsArray.length === 0){

                  title.textContent = "No Products available";
                        return;

                       }else{

                            title.textContent = "Products";
                          }

    productsArray.forEach(product => {

        productsGrid.innerHTML += `

            <div class="product-card">

                <img src="${product.image}">

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

                <p>${product.location}</p>

                <button class="details-btn" data-id="${product.id}">View Details</button>

            </div>

        `;

    });

}

const userProducts = JSON.parse(localStorage.getItem("products")) || [];
const allProducts = [...products, ...userProducts];
renderProducts(allProducts);




const detailsButtons = document.querySelectorAll(".details-btn");

detailsButtons.forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;

        window.location.href = `product.html?id=${id}`;

    });

});





const buttons = document.querySelectorAll(".category-btn");



buttons.forEach(button => {
button.addEventListener("click" , () =>{
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
});
});




buttons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.textContent;

        if(category === "All"){

            renderProducts(allProducts);

        }else{

            const filteredProducts = allProducts.filter(product => {
                return product.category === category;
            });

            renderProducts(filteredProducts);

        }

    });

});