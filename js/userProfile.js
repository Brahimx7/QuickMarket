
import { supabase } from "./supabase.js"


const productdiv = document.getElementById("userproducts");
const params = new URLSearchParams(window.location.search);
const { data : { user } } = await supabase.auth.getUser();
const signupLink = document.getElementById("signupLink");
signupLink.classList.add("active");
if (!user) {
    window.location.href = "Login.html";
}

     const profileUsername = document.getElementById("profileUsername");
      const profilemail = document.getElementById("profilemail");
      const profileproducts = document.getElementById("profileproducts");
      const profilejoined = document.getElementById("profilejoined");
      
      profileUsername.textContent = user.user_metadata.username;
      profilemail.textContent = user.email;
     
     const joinedDate = new Date(user.created_at);

     profilejoined.textContent = joinedDate.toLocaleString();


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
 profileproducts.textContent = products.length;
    products.forEach(product => {
        
        html += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.title}">

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

                <p>${product.location}</p>

                <div class="buttons">
                <button class="details-btn" data-id="${product.id}">
                    View Details
                </button>
                <button class="edit-btn" data-id="${product.id}">✏️ Edit </button>
                </div>
                  <button
                  class="delete-btn"
                          data-id="${product.id}"
                             data-title="${product.title}" id="delete-btn">
                             🗑 Delete
                      </button>
                      
               
            </div>
        `;

    });
     productdiv.innerHTML = html;

    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(editButton => {
        editButton.addEventListener("click", ()=>{
            console.log("edit button clicked");
            const editproductID = editButton.dataset.id;
            window.location.href=(`postproduct.html?editproduct=${editproductID}`);
        });
    });

  
   const deleteButtons = document.querySelectorAll(".delete-btn");
    const deleteModal = document.getElementById("deleteModal");
   
    const cancelDelete = document.getElementById("cancelDelete");
    const confirmDelete = document.getElementById("confirmDelete");

    let productToDelete = null;
  

const deleteTitle = document.getElementById("deleteTitle");

deleteButtons.forEach(button => {
    button.addEventListener("click", async () => {

        const currentProductID = button.dataset.id;

        const { data: product, error: productError } = await supabase
            .from("products")
            .select("title")
            .eq("id", currentProductID)
            .single();

        if (productError) {
            console.error(productError);
            return;
        }

        deleteTitle.textContent = `Delete "${product.title}"?`;

        productToDelete = currentProductID;

        console.log("Deleting product:", productToDelete);

        deleteModal.classList.remove("hidden");
    });
});

        cancelDelete.addEventListener("click", ()=>{
              deleteModal.classList.add("hidden");
              return ;
           });



           confirmDelete.addEventListener("click", async () => {


    
    const { data: conversations, error: conversationsError } = await supabase
        .from("conversations")
        .select("id")
        .eq("product_id", productToDelete);

    if (conversationsError) {
        console.error(conversationsError);
        alert(conversationsError.message);
        return;
    }

    // Delete all messages in each conversation
    for (const conversation of conversations) {

        const { error: messagesDeleteError } = await supabase
            .from("messages")
            .delete()
            .eq("conversation_id", conversation.id);


        if (messagesDeleteError) {
            alert(messagesDeleteError.message);
            return;
        }
    }

    // Delete conversations
    const { error: conversationsDeleteError } = await supabase
        .from("conversations")
        .delete()
        .eq("product_id", productToDelete);

    if (conversationsDeleteError) {
        console.error(conversationsDeleteError);
        return;
    }

    // Delete product
    const { error: productDeleteError } = await supabase
        .from("products")
        .delete()
        .eq("id", productToDelete);

    if (productDeleteError) {
        console.error(productDeleteError);
        alert(productDeleteError.message);
        return;
    }

    // Close modal and refresh
    deleteModal.classList.add("hidden");
    productToDelete = null;
    window.location.reload();
});
    

    const detailsButtons = document.querySelectorAll(".details-btn");

    detailsButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            window.location.href = `product.html?id=${id}`;

        });

    });

}

const conversationId = params.get("conversation");

const aboutBtn = document.getElementById("aboutBtn");
const favoritesBtn = document.getElementById("favoritesBtn");
const messagesBtn = document.getElementById("messagesBtn");
const aboutSection = document.getElementById("aboutSection");
const favoritesSection = document.getElementById("favoritesSection");
const messagesSection = document.getElementById("messagesSection");


function hideSections(){
    aboutSection.classList.remove("shown");
    favoritesSection.classList.remove("shown");
    messagesSection.classList.remove("shown");
    aboutSection.classList.add("hidden");
    favoritesSection.classList.add("hidden");
    messagesSection.classList.add("hidden");
}

hideSections();
 aboutSection.classList.add("shown");
  aboutBtn.classList.add("active");

aboutBtn.addEventListener("click", () => {
   conversationList.classList.add("hidden");
   chatArea.classList.remove("chatphone");
   chatArea.classList.add("hidden");
     aboutBtn.classList.add("active");
    favoritesBtn.classList.remove("active");
    messagesBtn.classList.remove("active");
      console.log("clicked");
    const wasHiddenabout = aboutSection.classList.contains("hidden");
    
    hideSections();
     if(wasHiddenabout){
        aboutSection.classList.remove("hidden");
        aboutSection.classList.add("shown");
       
     }
    
});

const savedProductsContainer = document.getElementById("savedproducts");
console.log(savedproducts);
favoritesBtn.addEventListener("click", async () => {
    conversationList.classList.add("hidden");
   chatArea.classList.remove("chatphone");
   chatArea.classList.add("hidden");
    favoritesBtn.classList.add("active");
    aboutBtn.classList.remove("active");
    messagesBtn.classList.remove("active");
      console.log("clicked");
    const wasHiddenfavorite = favoritesSection.classList.contains("hidden");
    
    hideSections();
     if(wasHiddenfavorite){
        favoritesSection.classList.remove("hidden");
        favoritesSection.classList.add("shown");
       
     }

     const { data : savedproducts , error : savedError} = await supabase.from("savedproducts").select("*").eq("user_id",user.id);
     if(savedError){
        console.log(savedError);
        return;
     }
     const productIds = savedproducts.map(item => item.product_id);
     if (productIds.length === 0) {
    favoritesSection.innerHTML = "<p class='no-favorites'>You haven't saved any products yet.</p>";
    return;
}

      const { data : productssaved , error : productssavedError} = await supabase.from("products").select("*").in("id",productIds);
     if(productssavedError){
        console.log(productssavedError);
        return ;
     }
     console.log(productssaved );
      let html = "";
      productssaved.forEach(productsaved => {
        
        html += `
            <div class="product-card">

                <img src="${productsaved.image}" alt="${productsaved.title}">

                <h3>${productsaved.title}</h3>

                <p>$${productsaved.price}</p>

                <p>${productsaved.location}</p>
              
            <div class="buttons">
                <button class="details-btn" data-id="${productsaved.id}">
                    View Details
                </button>

                  <button
                  class="delete-btn"
                          data-id="${productsaved.id}"
                             data-title="${productsaved.title}">
                             ❤️ Unsave Product
                      </button>
              </div>
            </div>
        `;

    });

    
savedProductsContainer.innerHTML = html;

const unsaveproducts = document.querySelectorAll(".delete-btn");

unsaveproducts.forEach(product => {
    product.addEventListener("click", async () =>{
        const unsaveproductID = product.dataset.id;
       const { error : unsaveproductError } = await supabase.from("savedproducts").delete().eq("user_id",user.id).eq("product_id",unsaveproductID);
       if(unsaveproductError){
        console.log(unsaveproductError);
        return
       }
        window.location.reload();
    });
   
});

console.log("Favorites clicked");

   const detailsButtons = document.querySelectorAll(".details-btn");

    detailsButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            window.location.href = `product.html?id=${id}`;

        });

    });

});




      const conversationList = document.getElementById("conversationList");
      const messagesContainer = document.getElementById("messagesContainer");
      const messageInput = document.getElementById("messageInput");
      const sendBtn = document.getElementById("sendBtn");
      let currentConversation = null;

     




  supabase
    .channel("messages")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "messages"
        },
        payload => {

            const conversationId = payload.new.conversation_id;

            if (
                currentConversation &&
                conversationId === currentConversation.id
            ) {
                addMessage(payload.new);
                return;
            }

            const div = document.querySelector(
                `[data-conversation-id="${conversationId}"]`
            );

            if (div) {
                updateUnreadBadge(conversationId, div);
            }

            updateTotalUnread();
        }
    )
    .subscribe();



      

function addMessage(message) {

    const p = document.createElement("p");

    p.textContent = message.message;

    if (message.sender_id === user.id) {
        p.classList.add("my-message");
    } else {
        p.classList.add("other-message");
    }

    messagesContainer.appendChild(p);
    
}






async function updateUnreadBadge(conversationId, div) {
    const { data: unreadMessages, error } = await supabase
        .from("messages")
        .select("id")
        .eq("conversation_id", conversationId)
        .eq("is_read", false)
        .neq("sender_id", user.id);

    if (error) {
        console.error(error);
        return;
    }

    // Remove existing badge
    const oldBadge = div.querySelector(".unread-badge");

    if (oldBadge) {
        oldBadge.remove();
    }

    // Add new badge if there are unread messages
    if (unreadMessages.length > 0) {
        const badge = document.createElement("span");

        badge.textContent = `+${unreadMessages.length}`;
        badge.classList.add("unread-badge");

        div.appendChild(badge);
    }
}


async function updateTotalUnread() {

   
    const { data: conversations, error: conversationsError } = await supabase
        .from("conversations")
        .select("id")
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`);

    if (conversationsError) {
        console.error(conversationsError);
        return;
    }

    if (conversations.length === 0) {
        return;
    }

    const conversationIds = conversations.map(conversation => conversation.id);

   
    const { data: unreadMessages, error: unreadError } = await supabase
        .from("messages")
        .select("id")
        .in("conversation_id", conversationIds)
        .eq("is_read", false)
        .neq("sender_id", user.id);

    if (unreadError) {
        console.error(unreadError);
        return;
    }

   
    const oldBadge = messagesBtn.querySelector(".total-unread-badge");

    if (oldBadge) {
        oldBadge.remove();
    }

  
    if (unreadMessages.length > 0) {

        const badge = document.createElement("span");

        badge.textContent = `+${unreadMessages.length}`;
        badge.classList.add("total-unread-badge");

        messagesBtn.appendChild(badge);
    }
}

await updateTotalUnread();



      async function openMessages() {
      
    
                      console.log("clicked");
                         if (messagesSection.classList.contains("shown")) {
                             chatArea.classList.remove("chatphone");
                              chatArea.classList.add("hidden");
                                return;
                             }
                            
                           
                      messagesSection.classList.add("section");
                      conversationList.classList.remove("hidden");
                      chatArea.classList.remove("chatphone");
                        chatArea.classList.add("hidden");
                      messagesBtn.classList.add("active");
                      favoritesBtn.classList.remove("active");
                      aboutBtn.classList.remove("active");

                    const wasHiddenmessages = messagesSection.classList.contains("hidden");

                    hideSections();

                    if (wasHiddenmessages) {
                        messagesSection.classList.remove("hidden");
                        messagesSection.classList.add("shown");
                                            }

                                            

                    // Clear only the conversation list
                            conversationList.innerHTML = "";

                            const { data: conversations, error: conversationsError } = await supabase
                                        .from("conversations")
                                                 .select("*")
                                                        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`);

                    if (conversationsError) {
                                console.error(conversationsError);
                                return;
                                            }

              conversations.forEach(async (conversation) => {

               

                        const div = document.createElement("div");
                          div.classList.add("conversation");
                          div.dataset.conversationId = conversation.id;

                          const { data: unreadMessages, error: unreadError } = await supabase
                              .from("messages")
                              .select("id")
                              .eq("conversation_id", conversation.id)
                              .eq("is_read", false)
                     .neq("sender_id", user.id);

                        if (unreadError) {
                      console.error(unreadError);
                         return;
                                    }

                        let otherUserId;

                           if (conversation.buyer_id === user.id) {
                            otherUserId = conversation.seller_id;
                        } else {
                              otherUserId = conversation.buyer_id;
                                }

                        const { data: otherUser, error: otherUserError } = await supabase
                                    .from("users")
                                    .select("username")
                                            .eq("id", otherUserId)
                                                    .single();

                        if (otherUserError) {
                            console.log(otherUserError);
                                    return;
                                        }

                      div.textContent = otherUser.username;


                      if (unreadMessages.length > 0) {
   
                       const badge = document.createElement("span");
                       badge.textContent = `+${unreadMessages.length}`;
                           badge.classList.add("unread-badge");
                           div.appendChild(badge);
                                              }
                        
                   div.addEventListener("click", async () => {
                    chatArea.classList.remove("chatphone");
                    currentConversation = conversation;                     chatArea.classList.add("chatphone");
                     chatArea.classList.remove("hidden");
                     const { error: readError } = await supabase
                        .from("messages")
                        .update({ is_read: true })
                        .eq("conversation_id", currentConversation.id)
                        .eq("is_read", false)
                        .neq("sender_id", user.id);

                    if (readError) {
                        console.error(readError);
                    }
                    await updateTotalUnread();
                     document.querySelectorAll(".conversation").forEach(conversation => {
                        conversation.classList.remove("active");
                           });
                      div.classList.add("active");
                      const badge = div.querySelector(".unread-badge");

                   if (badge) {
                      badge.remove();
                          }
                         sendBtn.classList.add("shown");
                         messageInput.classList.add("shown");
                                    

                                    console.log("Conversation clicked");

                                    messagesContainer.innerHTML = "";
                                    const { data: messages, error: messagesError } = await supabase.from("messages").select("*").eq("conversation_id",currentConversation.id).order("created_at", { ascending: true });
                                   if (messagesError) {
                                       console.error(messagesError);
                                           return;
                                                      }
                                      console.log(messages);
                                     console.log(messagesError);



                                  messages.forEach(message => {

                                        addMessage(message);
                                                                  });
                              messagesContainer.scrollTop = messagesContainer.scrollHeight;
                                                                  

                   

                          
                      });



                      conversationList.appendChild(div);
                 
                  
                      if (conversation.id == conversationId) {
                        div.click();
                        }
                        
             });



console.log(sendBtn);
console.log(messageInput);
console.log(messagesContainer);
console.log(conversationList);


 sendBtn.addEventListener("click", async () =>      {

    if (!currentConversation) {
    alert("Select a conversation first.");
    return;
    }
    if(messageInput.value.trim() === ""){
        console.log("nahh");
        return;
    }
           
    const { error : sendError} = await supabase.from("messages").insert(
     {
     conversation_id : currentConversation.id  ,
      message : messageInput.value ,
    sender_id : user.id
       }
        );

   if (sendError) {
    console.error(sendError);
    return;
}
messageInput.value = "";
                                                         });

                                                         

  console.log("Send button clicked");
}


messagesBtn.addEventListener("click", openMessages);

                                          if (conversationId) {
                                           await openMessages();
                                        }
                                                         