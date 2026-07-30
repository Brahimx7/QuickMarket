import { Navbar }  from './components/nav.js'
import { Footer } from "./components/footer.js";



const nav = document.getElementById("nav");
const foot = document.getElementById("foot");


if (nav) nav.innerHTML = Navbar();
if (foot) foot.innerHTML = Footer();


const password = document.getElementById("pass");
const confpassword = document.getElementById("confpass");
const toggle = document.getElementById("showpass");
const toggle2 = document.getElementById("showconfpass");

toggle.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";

    }else{

        password.type = "password";
    }

});

toggle2.addEventListener("click", () => {

    if(confpassword.type === "password"){

        confpassword.type = "text";

    }else{

        confpassword.type = "password";
    }

});