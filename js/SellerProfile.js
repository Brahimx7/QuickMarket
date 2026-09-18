import { supabase } from "./supabase.js";

const params = new URLSearchParams(window.location.search);
const SellerId = params.get("SellerId");
console.log(SellerId);

const SellerProfilePicture = document.getElementById("SellerProfilePicture");
const SellerUsername = document.getElementById("SellerUsername");
const SellerEmail = document.getElementById("SellerEmail");
const Created_at = document.getElementById("Created_at");
const SellerProductsUploaded = document.getElementById("SellerProductsUploaded");
const SellerBio = document.getElementById("SellerBio");


const { data: SellerData, error: SellerDataError } =
    await supabase.rpc("get_public_profile", {
        seller_id: SellerId
    });

if (SellerDataError) {
    console.log(SellerDataError);
}

const Seller = SellerData?.[0];

const {data : ProductsUploaded , error : productsUploadedError} = await supabase.from("products").select("*").eq("user_id",SellerId);
if(productsUploadedError){
    console.log(productsUploadedError);
}


if(Seller.Avatar_url){
    SellerProfilePicture.src=Seller.Avatar_url;
}
if(ProductsUploaded.length > 0){
    if(ProductsUploaded.length == 1){
            SellerProductsUploaded.innerHTML = `${ProductsUploaded.length} product` ;
    }
    else{
             SellerProductsUploaded.innerHTML = `${ProductsUploaded.length} products` ;
    }
}
if(Seller.userBio){
    SellerBio.textContent =Seller.userBio;
}

  const joinedDate = new Date(Seller.created_at);
  Created_at.textContent = joinedDate.toLocaleString();

SellerUsername.textContent=Seller.username ;
SellerEmail.textContent=Seller.email;

const productsSection = document.getElementById("products");

let html = " ";


ProductsUploaded.forEach(product => {
    
    html +=
     ` 
                       <div class="product-card">
                             <img src="${product.image}">
                             <h3>${product.title}</h3>
                             <p>$${product.price}</p>
                             <p>${product.location}</p>
                            <button class="details-btn" data-id="${product.id}">
                                View Details
                             </button>
                         </div>
        `;
     });
     
     productsSection.innerHTML = html; 
     
     const detailsButtons  = document.querySelectorAll(".details-btn");
     
     detailsButtons.forEach(button => { 
        
        button.addEventListener("click", () => { 
            const id = button.dataset.id;
            window.location.href = `product.html?id=${id}`;
         });
        
        });