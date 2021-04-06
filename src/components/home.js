import {toViewLogIn} from './login.js';
import {onNavigate} from '../router.js';
// import {toViewSingUp} from './singup.js';

export const toViewHome = (container) => {
  const html = `
  <div class="allContainer">
   <div class="logoICare">
   <div>
      <img src="assets/I care circle.png" class="mainLogo">
       <h1>I care</h1>
       <h2>Tips de Bienestar</h2>
    </div>
   </div>
   <div class="section">  
     <button type="button" class="btnType" id="toInit">Iniciar sesión</button>
     <button type="button" class="btnType" id="toCreate">Crear cuenta</button>
   </div>
  </div>
  `;  

  container.innerHTML = html;

  const toInitBegin = document.getElementById("toInit") 
  toInitBegin.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/login')
  });
  
  const toCreateBegin = document.getElementById("toCreate") 
  toCreateBegin.addEventListener('click', (e) => {
   e.preventDefault();
   onNavigate('/signup')
  });
};
  
