import { supabase } from "./supabase.js";

const login = document.getElementById("loginform");

login.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginemail = document.getElementById("loginemail").value;
    const loginpassword = document.getElementById("loginpassword").value;

 /*   const users = JSON.parse(localStorage.getItem("usersdata")) || [];

    const user = users.find(u =>
        u.useremail === loginemail &&
        u.userpassword === loginpassword
    );

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }*/

        const signupLink = document.getElementById("signupLink");
        const loginLink = document.getElementById("loginLink");


         const { data , error } = await supabase.auth.signInWithPassword({
        email: loginemail,
        password: loginpassword
     });
        
         if (error) {
        alert(error.message);
        return;
    }
     
   
    

    console.log(data.user);

   


     });

