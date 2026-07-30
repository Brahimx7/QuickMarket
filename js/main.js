import { Navbar }  from './components/nav.js'
import { Footer } from "./components/footer.js";



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

