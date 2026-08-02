import { Navbar }  from './components/nav.js'
import { Footer } from "./components/footer.js";

import { products } from './data/products.js'

const nav = document.getElementById("nav");
const foot = document.getElementById("foot");


if (nav) nav.innerHTML = Navbar();

const links = document.querySelectorAll(".connect a");

const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});


if (foot) foot.innerHTML = Footer();




const password = document.getElementById("pass");
const confpassword = document.getElementById("confpass");
const toggle = document.getElementById("showpass");
const toggle2 = document.getElementById("showconfpass");

if (password && toggle) {

    toggle.addEventListener("click", () => {

        password.type =
            password.type === "password" ? "text" : "password";

    });

}

if (confpassword && toggle2) {

    toggle2.addEventListener("click", () => {

        confpassword.type =
            confpassword.type === "password" ? "text" : "password";

    });

}



const explore = document.getElementById("startexploring");
if(explore) {
    explore.addEventListener("click" , ()=>{
       console.log("Explore Button clicked!");
        window.location.href="Market.html"
    }

)
}
const postBtn = document.getElementById("postBtn");
if (postBtn) {
    postBtn.addEventListener("click", () => {
        console.log("Button clicked!");
        if(!currentuser){
        window.alert("you have to sign up");
        return;
    }
        window.location.href = "postproduct.html";
    });
}
/*
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const signupLink = document.getElementById("signupLink");
const loginLink = document.getElementById("loginLink");

if (currentUser) {

    loginLink.textContent = "Logout";
    signupLink.textContent = `👤${currentUser.username}`;

     loginLink.addEventListener("click" , (e)=>{
       e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href="index.html";
    });

}
const users = JSON.parse(localStorage.getItem("usersdata")) || [];
const userproducts = JSON.parse(localStorage.getItem("products")) || [];
const usersNumber = document.getElementById("usersCount");
const productsNumber = document.getElementById("productsCount");

const Allproducts = [...userproducts,...products];


if (usersNumber) {
    usersNumber.textContent = users.length;
}

if (productsNumber) {
    productsNumber.textContent = Allproducts.length;
}*/
