import { supabase } from "./supabase.js"


const productdiv = document.getElementById("userproducts");

const { data : { user } } = await supabase.auth.getUser();

if (!user) {
    window.location.href = "Login.html";
}
const { data : products , error : productsError} 
=
await supabase.from("products").select("*").eq("user_id",user.id);

if (productsError) {
    console.error(productsError);
}
console.log(products);

if (products.length === 0) {
    productdiv.innerHTML = "<p>You haven't posted any products yet.</p>";
} else {

    let html = "";

    products.forEach(product => {

        html += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.title}" class="product-image">

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

                <p>${product.location}</p>

                <button class="details-btn" data-id="${product.id}">
                    View Details
                </button>

            </div>
        `;

    });

    productdiv.innerHTML = html;

  
    const detailsButtons = document.querySelectorAll(".details-btn");

    detailsButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            window.location.href = `product.html?id=${id}`;

        });

    });

}