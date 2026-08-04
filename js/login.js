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


        const { data, error } = await supabase.auth.signInWithPassword({
    email: loginemail,
    password: loginpassword
});

if (error) {
    alert(error.message);
    return;
}

const user = data.user;



    console.log(data.user);

   


    const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

    window.location.href = "index.html";


     });



     /*if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
        alert("Please confirm your email first. We'll resend the confirmation link.");
        await supabase.auth.resend({
            type: "signup",
            email: loginemail,
            options: {
                emailRedirectTo: "https://quick-market-4uba.vercel.app"
            }
        });
    } else {
        alert(error.message);
    }
    return;
}
*/