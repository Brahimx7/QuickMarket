const signed = document.getElementById("signinform");
import { supabase } from "./supabase.js";

signed.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const useremail = document.getElementById("useremail").value;
    const userpassword = document.getElementById("pass").value;
     const confirmpassword = document.getElementById("confpass").value;

     if( userpassword !== confirmpassword){
         e.preventDefault();
        alert("Passwords do not match!");
        return;
     }

    
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
    options: { //contains extra information.
        data: {
            username: username
        }
    }
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


const user = data.user;

const { error: userError } = await supabase
    .from("users")
    .insert({
        id: user.id,
        email: user.email,
        username: username // or user.user_metadata.username
    });

if (userError) {
    alert(userError.message);
    return;
}


window.location.href=("index.html");


});



