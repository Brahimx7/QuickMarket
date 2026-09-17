import { supabase } from "./supabase.js";

const login = document.getElementById("loginform");

login.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginemail = document.getElementById("loginemail").value;
    const loginpassword = document.getElementById("loginpassword").value;

        const signupLink = document.getElementById("signupLink");
        const loginLink = document.getElementById("loginLink");


        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginemail,
          password: loginpassword
          });

         if (error) {
             alert("the email or password you entered is incorrect");
            return;
          }

         window.location.href = "index.html";


 });


