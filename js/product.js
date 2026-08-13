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

    const { data : products , error : productsError} = await supabase.from("products").select("*");
    if(productsError){
        window.alert(productsError);
    }
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

const contactBtn = document.getElementById("contactBtn");


contactBtn.addEventListener("click", async () => {
const {
    data: { user }
} = await supabase.auth.getUser();

if (user.id === product.user_id) {
    alert("You can't contact yourself.");
    return;
}

const { data: conversation, error: conversationError } = await supabase
    .from("conversations")
    .select("*")
    .eq("buyer_id", user.id)
    .eq("seller_id", product.user_id)
    .eq("product_id", product.id)
    .maybeSingle();

if (conversationError) {
    console.error(conversationError);
    return;
}
if (conversation) {
    window.location.href = `userProfile.html?tab=messages&conversation=${conversation.id}`;
    return;
}

const { data: newConversation, error: newConversationError } = await supabase
    .from("conversations")
    .insert({
        buyer_id: user.id,
        seller_id: product.user_id,
        product_id: product.id
    }).select().single();

 if (newConversationError) {
    console.error(newConversationError);
    return;
   }  
    
    console.log("button clicked");
    window.location.href = `userProfile.html?tab=messages&conversation=${newConversation.id}`;
});



