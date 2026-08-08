//import { products } from "./data/products.js";
import { supabase } from "./supabase.js";

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

            let html = "";

                 productsArray.forEach(product => {
                     html += `
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

                 productsGrid.innerHTML = html;


                     const detailsButtons = document.querySelectorAll(".details-btn");

                 detailsButtons.forEach(button => {

                     button.addEventListener("click", () => {

                         const id = button.dataset.id;

                         window.location.href = `product.html?id=${id}`;

                     });

                 });



}


/*
const userProducts = JSON.parse(localStorage.getItem("products")) || [];
const allProducts = [...products, ...userProducts];
renderProducts(allProducts);
*/

const { data: products, error } = await supabase
    .from("products")
    .select("*");

    
    if (error) {
    console.error(error);
} else {
    console.log(products);
    renderProducts(products);

   const searchInput = document.getElementById("searchInput");
   const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", () => {
        const value = searchInput.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(value)
        );

        renderProducts(filteredProducts);
    });
}


const params = new URLSearchParams(window.location.search);
const searchValue = params.get("search");

if (searchValue) {

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    renderProducts(filteredProducts);

    document.getElementById("searchInput").value = searchValue;

} else {

    renderProducts(products);

}





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

            renderProducts(products);

        }else{

            const filteredProducts = products.filter(product => {
                return product.category === category;
            });

            renderProducts(filteredProducts);

        }

    });

});




const selectedCategory = params.get("category");

if (selectedCategory) {

    buttons.forEach(button => {
        if (button.textContent.trim() === selectedCategory) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    const filteredProducts = products.filter(product =>
        product.category === selectedCategory
    );

    renderProducts(filteredProducts);

   
}

/*
const userchoice = document.getElementById("sortProducts");
const originalProducts = [...products];
userchoice.addEventListener("change" , ()=> {

if(userchoice.value === "low-high"){
      products.sort((productA, productB) => {
               return productA.price - productB.price;
              });
              renderProducts(products);
} 
else if( userchoice.value === "high-low" ){
   products.sort((productA, productB) => {
    return productB.price - productA.price;
         });
         renderProducts(products);
}
else if ( userchoice.value === "az" ){
   products.sort((productA, productB) => { 
   return  productA.title.localeCompare(productB.title);
   });
   renderProducts(products);
}
else if( userchoice.value === "za" ){
    products.sort((productA, productB) => { 
   return  productB.title.localeCompare(productA.title);
   });
   renderProducts(products);
}
else{
renderProducts(originalProducts);
}


});*/


const categoryBtn = document.getElementById("categoryBtn");
const priceBtn = document.getElementById("priceBtn");
const titleBtn = document.getElementById("titleBtn");


const categoryPanel = document.getElementById("categoryPanel");
const pricePanel = document.getElementById("pricePanel");
const titlePanel = document.getElementById("titlePanel");

function hidePanels(){
      categoryPanel.classList.remove("shown");
    pricePanel.classList.remove("shown");
    titlePanel.classList.remove("shown");

   categoryPanel.classList.add("hidden");
   pricePanel.classList.add("hidden");
   titlePanel.classList.add("hidden");

    categoryBtn.textContent = "📂 Categories ▼" ; 
     priceBtn.textContent = "💰 Prices ▼" ; 
      titleBtn.textContent = "🔤 Title ▼" ; 
}
hidePanels();
categoryBtn.addEventListener("click", () => {
      console.log("clicked");
    const wasHidden = categoryPanel.classList.contains("hidden");
    hidePanels();
     if(wasHidden){
        categoryPanel.classList.remove("hidden");
        categoryPanel.classList.add("shown");
        categoryBtn.textContent = "📂 Categories ▲" ; 
     }
    
});