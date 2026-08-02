import { supabase } from "./supabase.js";

console.log(supabase);
console.log(supabase.storage);

const postBtn = document.getElementById("postBtn");
//const currentuser = localStorage.getItem("currentUser");





const form = document.getElementById('productForm');

                      form.addEventListener('submit', async (e) => {
        /*                  const {
                        data: { user },
                      } = await supabase.auth.getUser();
                      if (!user) {
                        alert("Please log in first.");
                        return;
                      }*/
                       e.preventDefault(); 
                               /*   if(!currentuser){
                           window.alert("you have to sign up");
                        return;
                              }*/
                             const {
                               data: { user },
                             } = await supabase.auth.getUser();
                        console.log(user);
                             if (!user) {
                               alert("Please log in first.");
                               return;
                                        }
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
console.log("1");
                        const fileName = `${Date.now()}-${imageFile.name}`;
console.log("2");
                     const { error: uploadError } = await supabase.storage
                         .from("product-images")
                          .upload(fileName, imageFile);
console.log("3");
                         if (uploadError) {
                             console.error(uploadError);
                          alert(uploadError.message);
                              return;
                                         }
console.log("4");                                    
                         const { data: imageData } = supabase.storage
                          .from("product-images")
                          .getPublicUrl(fileName);

                        const imageUrl = imageData.publicUrl;
                     
                                const { error: productError } = await supabase
                                 .from("products")
                                 .insert({
                                   title,
                                   price: Number(price),
                                   category,
                                   condition,
                                   location,
                                   seller,
                                   description,
                                   phone,
                                   image: imageUrl,
                                   user_id: user.id
                                   });

                               if (productError) {
                                   console.error(productError);
                                   alert(productError.message);
                                   return;
                               }

                             
                         console.log("Product published successfully!");

                     //   const reader = new FileReader();

                      //  reader.readAsDataURL(imageFile);

                      //  reader.onload = () => {
                         //   const imageBase64 = reader.result;
                         //   console.log(imageBase64);

                        /*    const newProduct = {
                            id: Date.now(),
                            title,
                            price: Number(price),
                            category,
                            location,
                            seller,
                            condition,
                            image: imageUrl,
                            description,
                            phone
                        };

                        
          const userProducts = JSON.parse(localStorage.getItem("products")) || [];
          userProducts.push(newProduct);

          localStorage.setItem("products", JSON.stringify(userProducts));*/

                           window.location.href = "Market.html";
});



