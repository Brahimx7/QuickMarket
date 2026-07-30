const postBtn = document.getElementById("postBtn");

if (postBtn) {
    postBtn.addEventListener("click", () => {
        console.log("Button clicked!");
        window.location.href = "postproduct.html";
    });
}




const form = document.getElementById('productForm');

form.addEventListener('submit', (e) => {
              e.preventDefault(); 

                               console.log('Form submitted');

                        const title = document.getElementById('title').value;
                        const price = document.getElementById('price').value;
                        const category = document.getElementById('category').value;
                        const condition = document.getElementById('condition').value;
                        const location = document.getElementById('location').value;
                        const seller = document.getElementById('seller').value;
                        const description = document.getElementById('description').value;
                        const phone = document.getElementById('phone').value;

                        const imageFile = document.getElementById('image').files[0];
                        if (!imageFile) {
                            alert("Please select an image.");
                            return;
                                         }


                        const reader = new FileReader();

                        reader.readAsDataURL(imageFile);

                        reader.onload = () => {
                            const imageBase64 = reader.result;
                            console.log(imageBase64);

                            const newProduct = {
                            id: Date.now(),
                            title,
                            price: Number(price),
                            category,
                            location,
                            seller,
                            condition,
                            image: imageBase64,
                            description,
                            phone
                        };

                        
          const userProducts = JSON.parse(localStorage.getItem("products")) || [];
          userProducts.push(newProduct);

          localStorage.setItem("products", JSON.stringify(userProducts));

           window.location.href = "market.html";

                                               };

                                          
});



