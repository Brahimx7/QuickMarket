import { supabase } from "./supabase.js";
import { Toast } from "./components/toast.js";

const signed = document.getElementById("signinform");


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

    try {
        localStorage.removeItem("verificationComplete");

             // Create the Supabase Auth account const 
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
              
                   showToast(error.message); 
                   return; 
                    }  

                if (!data.user) { 
            
                   showToast("Signup failed. Please try again."); 
                   return;
                  }

                  localStorage.setItem("pendingVerificationEmail", useremail); 
                  localStorage.setItem("pendingUsername", username);
                  localStorage.setItem("pendingUserId", data.user.id);

                  showToast("Account created! Please check your email to verify your account.");

                  
    
        }
         
         catch (error) {
            
            console.error("Signup error:", error); 
            showToast("An unexpected error occurred."); 
        }

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

