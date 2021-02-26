import {logIn, providerG, providerF } from './lib/firebase.js';

export const toLogInView = `   
<div class="allContainer">
   <div class="section">
     <form id="logIn-form" action="">
       <div class="formGroup">
         <input type="text" id="logIn-email" class="form-control" placeholder="Usuario/Email" required>
       </div>
       <div class="formGroup">
       <input type="password" id="logIn-password" class="form-control" placeholder="Contraseña" required>
       </div>
       <button type="submit" class="btnType">Iniciar Sesión</button>
       <button type="button" class="btnType" id="googleAccess">Inicia sesión con google</button>
       <button type="button" class="btnType" id="facebookAccess">Inicia sesión con Facebook</button>
     </form>
  </div>
</div>`;

const singUpForm = document.querySelector('#logIn-form');

singUpForm.addEventListener('submit',(e) => {
    e.preventDefault();
    let email = document.getElementById('logIn-email').value;
    let password = document.getElementById('logIn-password').value;
    logIn(email,password)
});

const googleButton = document.querySelector('#googleAccess');

googleButton.addEventListener('click', e => {
  e.preventDefault();
  providerG()
});


const facebookButton = document.querySelector('#facebookAccess');
facebookButton.addEventListener('click', e => {
   e.preventDefault();
   providerF()
});