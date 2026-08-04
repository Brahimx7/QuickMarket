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