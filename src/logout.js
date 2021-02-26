import {logOut} from './lib/firebase.js';

export const logOutView = `<h3>Cerró sesión</h3>`;


const toLogOut = document.querySelector('#logout');

toLogOut.addEventListener('click', e =>{
   e.preventDefault();
   logOut()
});