const login = document.getElementById("loginform");

login.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginemail = document.getElementById("loginemail").value;
    const loginpassword = document.getElementById("loginpassword").value;

    const users = JSON.parse(localStorage.getItem("usersdata")) || [];

    const user = users.find(u =>
        u.useremail === loginemail &&
        u.userpassword === loginpassword
    );

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
});