// import {toShowPost} from '../lib/firebase.js';
// import {toMakePost} from '../lib/firebase.js';
import {toViewLogOut} from '../lib/firebase.js';
export const toViewPost = (container) =>{
  const html =`
<div class="postBody"> 
  <div class="postHeader">
    <div><img src="assets/I care circle.png" class="titlelogo"></div>
    <div><h1>I care</h1></div>
    <div class="boxToLogOut"><a href="#" id="logout">Cerrar sesión</a></div>
  </div>
  <div class="postContainer">
   <div class="boxToPost">
    <form id = "postForm">
     <div>
      <textarea class ="toStyle" id ="postTitle" placeholder="Título" autofocus cols="100" ></textarea>
     </div>
     <div>
      <textarea class ="toStyle" id ="postDescription" placeholder="Escribe tu comentario aquí" rows="4" cols="100"></textarea>
     </div>
     <button id ="btnPost">Enviar</button>
    </form>
    <div>
    <ul class="lisGroup" id="myPost"></ul>
    </div>
   </div>
  </div> 
  <div class="articleDiv">
   <h3>Aquí van los articulos</h3>
  </div>
</div>
`;
container.innerHTML = html;

const inSendForm = document.querySelector('#postForm');

inSendForm.addEventListener('submit', e => {
  e.preventDefault();
  const tittle = inSendForm['postTitle'].value;
  const comment = inSendForm['postDescription'].value;
  // console.log(tittle,comment);
  toMakePost(tittle,comment);
});

const willLogOut = document.querySelector('#logout');
willLogOut.addEventListener('click', e => {
  e.preventDefault();
  toViewLogOut();
});

// const postList = document.querySelector('#myPost');
// postList.addEventListener('', (e) => {
//   e.preventDefault();
//   toShowPost(); 
// });
}