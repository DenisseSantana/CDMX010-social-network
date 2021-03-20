import {toViewLogIn} from './login.js';
import {onNavigate} from '../router.js';
// import {toViewSingUp} from './singup.js';

export const toViewHome = (container) => {
  const html = `
  <div class="allContainer">
   <div class="logoICare">
    <div><img src="assets/I care circle.png" class="mainLogo"></div>
    <div><h1>I care</h1></div>
   </div>
   <div class="section">  
     <button type="button" class="btnType" id="toInit">Iniciar sesión</button>
     <button type="button" class="btnType" id="toCreate">Crear cuenta</button>
    </form>
   </div>
  </div>
  `;

  container.innerHTML = html;

  const toInitB = document.getElementById("toInit") 
  toInitB.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/login')
  });
  
  
  const toCreateB = document.getElementById("toCreate") 
  toCreateB.addEventListener('click', (e) => {
   e.preventDefault();
   onNavigate('/signup')
  });
};
  


// window.addEventListener('DOMContentLoaded', () => {
//   const toInitB = document.getElementById("toInit") 
//   toInitB.addEventListener('click', (e) => {
//    e.preventDefault();
//   //  console.log("entro a boton inicio");  
//   root.innerHTML = "";
//   root.innerHTML = toViewLogIn;
//   onNavigate('/login');
//    })
// });
// window.addEventListener('DOMContentLoaded', () => {
//   const toCreateB = document.getElementById("toCreate") 
//   toCreateB.addEventListener('click', (e) => {
//    e.preventDefault();
//   //  console.log("entro a boton inicio");  
//   root.innerHTML = "";
//   root.innerHTML = toViewSingUp;
//   onNavigate('/singup');
//    })
// }); 