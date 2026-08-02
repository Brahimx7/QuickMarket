const signed = document.getElementById("signinform");
import { supabase } from "./supabase.js";

signed.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const useremail = document.getElementById("useremail").value;
    const userpassword = document.getElementById("pass").value;

    
  /*  const userInfo = {
        username,
        useremail,
        userpassword
    };*/

    
    //const users = JSON.parse(localStorage.getItem("usersdata")) || [];
   // const usersData = [...users, userInfo];
    //localStorage.setItem("usersdata", JSON.stringify(usersData));

const { data, error } = await supabase.auth.signUp({
    email: useremail,
    password: userpassword,
});

if (error) {
    alert(error.message);
    return;
}

// Make sure a user was actually returned
if (!data.user) {
    alert("Signup failed.");
    return;
}
console.log(data.user);

const { error: userError } = await supabase
    .from("users")
    .insert({
        id: data.user.id,
        email: useremail,
        username: username
    });


if (userError) {
     console.log(userError);
    alert(userError.message);
    return;
}

window.location.href = "Login.html";
});