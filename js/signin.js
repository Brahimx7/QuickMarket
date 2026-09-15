import { supabase } from "./supabase.js";
import { Toast } from "./components/toast.js";

const signed = document.getElementById("signinform");
const successful_email_panel = document.getElementById("successful_email_panel");
const resend_email = document.getElementById("resend_email");
 const close = document.getElementById("close");
 


signed?.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const username = document.getElementById("username").value.trim();
      const useremail = document.getElementById("useremail").value.trim();
      const userpassword = document.getElementById("pass").value;
      const confirmpassword = document.getElementById("confpass").value;

   
    
      if (userpassword !== confirmpassword) { 

        showToast("Passwords do not match!"); 
        return;

        }

       const { data: existingEmail, error: existingEmailError } = await supabase
        .from("users")
         .select("id")
          .eq("email", useremail)
            .maybeSingle();

  if (existingEmailError) {
    console.error("Error checking email:", emailCheckError);
    showToast("Could not check the email. Please try again.");
    return;
  }

  if (existingEmail) {
    showToast("Email already exists");
    return;
  }

    try {
        localStorage.removeItem("verificationComplete");

           
           const  { data, error } = await supabase.auth.signUp(
             { 
                 email: useremail, 
                 password: userpassword, 
                 options: { 
                      data: { username: username }, 
                      emailRedirectTo: `${window.location.origin}/verified.html` 
            
                     }     
              }

                                                           );

                if (error) { 
              
                   showToast(error.message ,"try again later"); 
                   return; 
                    }  

                if (!data.user) { 
            
                   showToast("Signup failed. Please try again."); 
                   return;

                  }

                  localStorage.setItem("pendingVerificationEmail", useremail); 
                  localStorage.setItem("pendingUsername", username);
                  localStorage.setItem("pendingUserId", data.user.id);


                  successful_email_panel.classList.remove("hidden");
                  successful_email_panel.classList.add("successful_email_message");
    
        }
         
         catch (error) {
            
            console.error("Signup error:", error); 
            showToast("An unexpected error occurred."); 
        }

 });


resend_email?.addEventListener("click", async () => { 
    
    const email = localStorage.getItem("pendingVerificationEmail");
    
    if (!email) { 
        
        showToast("No verification email found.");
         return; 

        } 
        try { 
            
            const { error } = await supabase.auth.resend
            ({ type: "signup", email: email });
            
            if (error) { console.error("Resend error:", error); 
                
                showToast(error.message); 
                return;
             } 
             
             showToast("Verification email sent again!");
            
            } 
            
            catch (error) {
                
                console.error("Resend error:", error);
                 showToast("Could not resend the verification email.");
                 } 
                
                
                });

                close?.addEventListener("click", () => { 
                    
                    successful_email_panel.classList.add("hidden");
                     successful_email_panel.classList.remove("successful_email_message");
                    
                    });



      window.addEventListener("storage", (event) => {

             if (event.key === "verificationComplete" && event.newValue === "true") {

               localStorage.removeItem("verificationComplete");

               localStorage.removeItem("pendingVerificationEmail");
               localStorage.removeItem("pendingUsername");
               localStorage.removeItem("pendingUserId");

                 window.location.href = "index.html";
                  
                    }

         });

  
   function showToast(message) { 
    
         const toast = Toast(message); 
         document.body.appendChild(toast);
    
          const button = toast.querySelector("button"); 
    
            button?.addEventListener("click", () =>  {
                  toast.remove();
                 }); 
             
               setTimeout(() => { toast.remove(); }, 5000); 
            
    }

