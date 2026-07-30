import { products } from "./data/products.js";


const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const userProducts = JSON.parse(localStorage.getItem("products")) || [];

const allProducts = [...products, ...userProducts];

const product = allProducts.find(item => item.id === id);

console.log(product);

console.log(id);


const productImage = document.getElementById("productImage");
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productCondition = document.getElementById("productCondition");
const productCategory = document.getElementById("productCategory");
const productLocation = document.getElementById("productLocation");
const sellerName = document.getElementById("sellerName");
const sellerPhone = document.getElementById("sellerPhone");


productImage.src = product.image;
productTitle.textContent = product.title;
productPrice.textContent = `$${product.price}`;
productDescription.textContent = product.description;
productCondition.textContent = product.condition;
productLocation.textContent = product.location;
sellerName.textContent = product.seller;
sellerPhone.textContent = product.phone;
productCategory.textContent = product.category;