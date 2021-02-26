// Este es el punto de entrada de tu aplicacion
import {forRouter, onNavigate } from './router.js';

//Renderiza por default
// let currentPathname = window.location.pathname;
// onNavigate(currentPathname);

//Enlaces para acceder a las secciones
const homeLink = document.getElementById('homeMenu');
const singUpLink = document.getElementById('singUpMenu');
const loginLink = document.getElementById('loginMenu');
const postLink = document.getElementById('postMenu');
const logOutLink = document.getElementById('logoutMenu');

console.log(homeLink);

//Funciones que renderizan cada sección
forRouter(homeLink, '/home');
forRouter(singUpLink, '/singup');
forRouter(loginLink, '/login');
forRouter(postLink, '/post');
forRouter(logOutLink, '/logout');

