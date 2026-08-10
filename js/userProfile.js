
import { supabase } from "./supabase.js"


const productdiv = document.getElementById("userproducts");
const params = new URLSearchParams(window.location.search);
const { data : { user } } = await supabase.auth.getUser();

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

favoritesBtn.addEventListener("click", () => {
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
    
});


      const conversationList = document.getElementById("conversationList");
      const messagesContainer = document.getElementById("messagesContainer");
      const messageInput = document.getElementById("messageInput");
      const sendBtn = document.getElementById("sendBtn");
      let currentConversation = null;

     
      




 messagesBtn.addEventListener("click", async () => {
                      console.log("clicked");
                      messagesSection.classList.add("section");
                      conversationList.classList.remove("hidden");
                      chatArea.classList.remove("chatphone");
                      chatArea.classList.remove("hidden");
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
                        
                   div.addEventListener("click", async () => {
                     chatArea.classList.add("chatphone");
                     document.querySelectorAll(".conversation").forEach(conversation => {
                        conversation.classList.remove("active");
                           });
                      div.classList.add("active");
                         sendBtn.classList.add("shown");
                         messageInput.classList.add("shown");
                                    currentConversation = conversation;

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

                                       const p = document.createElement("p");

                                       p.textContent = message.message;

                                       if (message.sender_id === user.id) {
                                           p.classList.add("my-message");
                                       } else {
                                           p.classList.add("other-message");
                                       }

                                       messagesContainer.appendChild(p);
                                                                  });

                   

                          
                      });



                      conversationList.appendChild(div);

                  
                      
             });

             


    

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
                                                         });

                                                         