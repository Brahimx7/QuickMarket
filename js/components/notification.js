import { supabase } from "../supabase.js";
import { Toast } from "./toast.js";

const { data: { user } } = await supabase.auth.getUser();
  supabase
    .channel("messages")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "messages"
        },
       async  payload => {
            console.log(payload.new);
            if(payload.new.sender_id === user.id){
                return;
            }
           
               console.log("someone sent a message");
               const { data: conversation, error } = await supabase
             .from("conversations")
             .select("*")
             .eq("id", payload.new.conversation_id)
             .single();

            if (error) {
            console.log(error);
            return;
                    }

             const { data : sender , error : senderError } = await supabase.from("users").select("*").eq("id",payload.new.sender_id).single();
                       if (senderError) {
                          console.log(senderError);
                          return;
                            }
               
               const { data : product , error : productError} = await supabase.from("products").select("*").eq("id",conversation.product_id).single();             
               if (productError) {
                  console.log(productError);
                  return;
                 }
                 const messagePreview = payload.new.message.length > 50
                  ? payload.new.message.slice(0, 50) + "..."
                     : payload.new.message;

            
            const toast = Toast(  `<span class="userProductname">🔔 ${sender.username} · ${product.title}</span><br>
                <span class="toast-message">${messagePreview}</span>`);
               toast.classList.add("toast");
              document.body.appendChild(toast);
              const button = toast.querySelector("button");
              button.addEventListener("click" , (event)=>{
                event.stopPropagation();
                toast.remove();
              }); 
              setTimeout(()=>{
                toast.remove();
              },5000);     
               toast.classList.add("message-notification");
              toast.addEventListener("click",()=>{
                    window.location.href = `userProfile.html?tab=messages&conversation=${conversation.id}`;
              });
            
         }).subscribe();

         