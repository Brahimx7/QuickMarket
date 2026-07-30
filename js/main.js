import { Navbar }  from './components/nav.js'
import { Footer } from "./components/footer.js";



const nav = document.getElementById("nav");
const foot = document.getElementById("foot");


nav.innerHTML = Navbar();
foot.innerHTML = Footer();

