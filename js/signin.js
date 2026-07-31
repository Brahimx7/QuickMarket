const signed = document.getElementById("signinform");

signed.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const useremail = document.getElementById("useremail").value;
    const userpassword = document.getElementById("pass").value;

    
    const userInfo = {
        username,
        useremail,
        userpassword
    };

    
    const users = JSON.parse(localStorage.getItem("usersdata")) || [];

   
    const usersData = [...users, userInfo];

   
    localStorage.setItem("usersdata", JSON.stringify(usersData));

   
    window.location.href = "Login.html";
});