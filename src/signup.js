import {signUp} from './lib/firebase.js';

export const toSignView =`
<div class="allContainer">
 <div class="section">
  <form id="singUp-form" action="">
   <div class="formGroup">
    <input type="text" id="signUp-email" class="form-control" placeholder="Usuario/Email" required>
   </div>
   <div class="formGroup">
    <input type="password" id="signUp-password" class="form-control" placeholder="Contraseña" required>
   </div>
   <button type="submit" class="btnType">Crear cuenta</button>
  </form>
 </div>
</div>`;

const singUpForm = document.querySelector('#singUp-form');

singUpForm.addEventListener('submit',(e) => {
    e.preventDefault();
    let email = document.getElementById('signUp-email').value;
    let password = document.getElementById('signUp-password').value;
    signUp(email,password)
});

  //  const singUpEmail = document.querySelector('#signUp-email').value;
   //  const singUpPassword = document.querySelector('#signUp-password').value;
   //  console.log(singUpEmail, singUpPassword);