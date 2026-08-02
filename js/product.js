//import { products } from "./data/products.js";
import  { supabase } from "./supabase.js"

/*
const id = Number(params.get("id"));

const userProducts = JSON.parse(localStorage.getItem("products")) || [];

const allProducts = [...products, ...userProducts];
*/
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const { data: product , error : productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

if (productError) {
    console.error(productError);
} else {
    productImage.src = product.image;
    productTitle.textContent = product.title;
    productPrice.textContent = `$${product.price}`;
    productDescription.textContent = product.description;
    productCondition.textContent = product.condition;
    productLocation.textContent = product.location;
    sellerName.textContent = product.seller;
    sellerPhone.textContent = product.phone;
    productCategory.textContent = product.category;
}

console.log("ID from URL:", id);
console.log("Product:", product);