import { products } from "./data/products.js";


const productsGrid = document.getElementById("productsGrid");

function renderProducts(productsArray){

    productsGrid.innerHTML = "";

    productsArray.forEach(product => {

        productsGrid.innerHTML += `

            <div class="product-card">

                <img src="${product.image}">

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

                <p>${product.location}</p>

                <button>View Details</button>

            </div>

        `;

    });

}

const userProducts = JSON.parse(localStorage.getItem("products")) || [];
const allProducts = [...products, ...userProducts];
renderProducts(allProducts);