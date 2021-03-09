// import {toShowPost} from '../lib/firebase.js';

export const toViewPost = (container) =>{
  const html =`
<div class="postContainer"> 
  <div class="postMenu">
    <div><img src="assets/I care circle.png" class="titlelogo"></div>
    <div><h1>I care</h1></div>
    <div><a href="#" id="logout">Cerrar sesión</a></div>
  </div>
  <div class="container">
   <ul class="lisGroup" id="myPost"></ul>
  </div>
  <div>
  <h3>Aquí van los articulos</h3>
  </div>
</div>
`;
container.innerHTML = html;

// const postList = document.querySelector('#myPost');
// postList.addEventListener('', (e) => {
//   e.preventDefault();
//   toShowPost(); 
// });

}