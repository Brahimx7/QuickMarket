"use strict";

import { Navbar }  from './components/nav.js';
import { Footer } from "./components/footer.js";
import { supabase } from "./supabase.js";
import { Toast } from "./components/toast.js" ; 
//import { products } from './data/products.js'

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




const explore = document.getElementById("startexploring");
if(explore) {
    explore.addEventListener("click" , ()=>{
        window.location.href="Market.html"
    }

)
}

const postBtn = document.getElementById("postBtn");

const {
  data: { user },
} = await supabase.auth.getUser();

 
if (postBtn) {
    postBtn.addEventListener("click", () => {
        console.log("Button clicked!");
        if (!user) {
        const toast = Toast(
         "You need an account to use this feature. Please sign up first."
           );
         document.body.appendChild(toast);
        const button = toast.querySelector("button");
         button.addEventListener("click", () => { 
              toast.remove();
              return;
         });
         setTimeout( () => {
            toast.remove();
         },10000);
        return ;
       }
        window.location.href = "postproduct.html";
    });
}
/*
const currentUser = JSON.parse(localStorage.getItem("currentUser"));


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

const signupLink = document.getElementById("signupLink");
const loginLink = document.getElementById("loginLink");


console.log(user);

if (user) {

    const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
  
       
    if (error) {
        console.error(error);
    } else {
        signupLink.textContent = `👤 ${profile.username}`;
        signupLink.href = "userProfile.html";
        loginLink.textContent = "Logout";
    }

   
    loginLink.addEventListener("click", async (e) => {
    e.preventDefault();

   
     await supabase.auth.signOut();
    window.location.href = "index.html";
        });

}


const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*");

if (usersError) {
    console.error(usersError);
}


const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*");

if (productsError) {
    console.error(productsError);
}



const usersNumber = document.getElementById("usersCount");
const productsNumber = document.getElementById("productsCount");

if (usersNumber) {
    usersNumber.textContent = users.length;
}

if (productsNumber) {
    productsNumber.textContent = products.length;
}




const homeSearch = document.getElementById("homeSearch");

if (homeSearch) {

    homeSearch.addEventListener("keydown", (e) => {
        
        if (e.key === "Enter") {
                
             if(homeSearch.value.trim() === ""){
                   console.log("nahh");
                   const toast = Toast("We couldn't find any products matching your search.");
                   document.body.appendChild(toast);
                   const button = toast.querySelector("button");
                   button.addEventListener("click", ()=>{
                    toast.remove();
                    return;
                   });
                   setTimeout(()=>{
                    toast.remove();
                   },5000);
                    return;
               }

            const value = homeSearch.value.trim();

            window.location.href =
                `Market.html?search=${encodeURIComponent(value)}`;

        }

    });

}

const categories = document.querySelectorAll(".usercat");

categories.forEach(categorie => {
    categorie.addEventListener("click", () => {
        console.log("Clicked:", categorie.textContent);

        const catvalue = categorie.textContent.trim();

        window.location.href = `Market.html?category=${encodeURIComponent(catvalue)}`;
    });
});


