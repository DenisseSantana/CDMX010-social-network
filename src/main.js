// Este es el punto de entrada de tu aplicacion
import {onNavigate} from "./router.js";
// import {forRouter, onNavigate, routes } from "./router.js";
// const rootDiv = document.getElementById('root'); //


//Renderiza por default
let currentPathname = window.location.pathname;
onNavigate(currentPathname);
