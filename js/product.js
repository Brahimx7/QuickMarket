//import { products } from "./data/products.js";
import  { supabase } from "./supabase.js"
import { Toast } from "./components/toast.js" ; 

/*
const id = Number(params.get("id"));

const userProducts = JSON.parse(localStorage.getItem("products")) || [];

const allProducts = [...products, ...userProducts];
*/
const params = new URLSearchParams(window.location.search);
const id = params.get("id");



const productImage = document.getElementById("productImage");
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productCondition = document.getElementById("productCondition");
const productLocation = document.getElementById("productLocation");
const sellerName = document.getElementById("sellerName");
const sellerPhone = document.getElementById("sellerPhone");
const productCategory = document.getElementById("productCategory");

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

const {
    data: { user }
} = await supabase.auth.getUser();
contactBtn.addEventListener("click", async () => {

      if(!user){
     const toast = Toast( "You need an account to use this feature. Please sign up first.");
                
                 document.body.appendChild(toast);
                const button = toast.querySelector("button");
                 button.addEventListener("click", () => { 
                      toast.remove();
                      return;
                 });
                 setTimeout( () => {
                    toast.remove();
                 },10000);
                 return;
   }   

if (user.id === product.user_id) {
        const toast = Toast( "You can't contact yourself.");
                
                 document.body.appendChild(toast);
                const button = toast.querySelector("button");
                 button.addEventListener("click", () => { 
                      toast.remove();
                      return;
                 });
                 setTimeout( () => {
                    toast.remove();
                 },10000);

            
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

const saveBtn = document.getElementById("saveBtn");

if(user){

async function isproductSaved(){
 const { data, error } = await supabase
  .from("savedproducts")
  .select("*")
  .eq("user_id", user.id)
  .eq("product_id", id)
  .maybeSingle();
   
   if (error) {
    console.log(error);
    return;
}
if(data){
    return true;
}
else{
    return false;
}
}
  
const answer = await isproductSaved();
if(answer){
   
    saveBtn.textContent = "❤️ Unsave Product";
}
else{
    saveBtn.textContent = "🤍 Save product";
}
saveBtn.addEventListener("click", async ()=>{

const saved = await isproductSaved(); 

  if(saved){

    const { error : deletesavedproductError} = await supabase.from("savedproducts")
    .delete().eq("user_id",user.id).eq("product_id",id); 
    if(deletesavedproductError){
        console.log(deletesavedproductError);
        return;
    }
       saveBtn.textContent = "🤍 Save product";
  }
  else{

   const { error : savedError} = await supabase.from("savedproducts").insert (
        {
            user_id : user.id,
            product_id : id
        }
    );

    if (savedError) {
    console.log(savedError);
    return;
       }
      saveBtn.textContent = "❤️ Unsave Product";

  }

    
});


}
if(!user){
      saveBtn.addEventListener("click", ()=>{
     const toast = Toast( "You need an account to use this feature. Please sign up first.");
                
                 document.body.appendChild(toast);
                const button = toast.querySelector("button");
                 button.addEventListener("click", () => { 
                      toast.remove();
                      return;
                 });
                 setTimeout( () => {
                    toast.remove();
                 },10000);
                 return;
                });
}



