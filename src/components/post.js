// import {toShowPost} from '../lib/firebase.js';
// import {toMakePost} from '../lib/firebase.js';
import {toViewLogOut} from '../lib/firebase.js';
export const toViewPost = (container) =>{
  const correo = localStorage.getItem('idUser');
  console.log(correo);
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
      <textarea class ="toStyle" id ="postAuthor" placeholder="Autora" autofocus cols="100" ></textarea>
     </div>
     <div>
      <textarea class ="toStyle" id ="postDescription" placeholder="Escribe tu comentario aquí" rows="4" cols="100"></textarea>
     </div>
     <button id ="btnPost">Publicar</button>
    </form>
   </div>
  </div> 
  <div class="articleDiv">
  <div>
   <div class="postedContainer" id="myPost"></div>
  </div>
  </div>
</div>
`;
container.innerHTML = html;


const db = firebase.firestore();
const inSendForm = document.querySelector('#postForm');
const postedComments = document.querySelector('#myPost');

let editStatus = false;
let id = '';

const savepost = (tittle, author, comment, likes) =>
     db.collection("post").doc().set({
        tittle,
        author,
        comment,
        likes
})

const getPost = () => db.collection('post').get();
const getIdPost = (id) => db.collection('post').doc(id).get();
const onGetPost = (callback) => db.collection('post').onSnapshot(callback);
const deletePost = id => db.collection('post').doc(id).delete();
const editPost = (id,updatedPost) => db.collection('post').doc(id).update(updatedPost);


window.addEventListener('DOMContentLoaded', async (e) => {
  // const querySnapshot = await getPost();  
  onGetPost((querySnapshot) => {
    postedComments.innerHTML='';
    querySnapshot.forEach(doc =>{
      // console.log(doc.data());
      const post = doc.data();
      post.id = doc.id;
      // console.log(post.id);
      postedComments.innerHTML+= `
       <div class='posted'>
        <div class='postedTitle'>
         ${doc.data().tittle}
        </div>
        <div class='postedAuthor'>
        ${doc.data().author}
       </div>
        <div class='postedComment'>
         ${doc.data().comment}
        </div>
        <div class='postedBtns'>
        <button class ="btnPosted btnEdit" data-id="${post.id}">Editar</button>
        <button class ="btnPosted btnDeleted" data-id="${post.id}">Borrar</button>
        <button class ="btnPosted btnLike" data-id="${post.id}">Like</button>
        </div>
       </div>
      `
      const btnsDelete = document.querySelectorAll('.btnDeleted');
      btnsDelete.forEach(btn => {
        btn.addEventListener('click', async (e) => {
           await deletePost(e.target.dataset.id);
        })
      });

      const btnsLike= document.querySelectorAll('.btnLike');
      btnsLike.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const getDataPost = await getIdPost(e.target.dataset.id);
          const postToEdit = getDataPost.data();
          inSendForm['postTitle'].value = postToEdit.tittle;
          inSendForm['postAuthor'].value = postToEdit.author;
          inSendForm['postDescription'].value = postToEdit.comment;
          const arrLikes = postToEdit.likes;
 
          editStatus = true;
          id = getDataPost.id;

          // pasa el uid del usuario al arreglo de la publicación
          let existid = "";
          arrLikes.forEach((storedid) => {
             if (correo = storedid) {
                 existid = storedid
             }
          });

          if (existid === "") {
            console.log("no existe")
            arrLikes[0] = correo;
            console.log(arrLikes[0]);
          } else {
            let existplace = arrLikes.indexOf(existid);
            arrLikes.splice(existplace, 1);
          }
          //inSendForm['postLikes'] = arrLikes;
          postToEdit.likes = arrLikes.slice();
        })
      })


      const btnsEdit= document.querySelectorAll('.btnEdit');
      btnsEdit.forEach(btn => {
        btn.addEventListener('click', async (e) => {
           const getDataPost = await getIdPost(e.target.dataset.id);
          //  console.log(doc.data())
          // console.log(getDataPost.data())
          const postToEdit = getDataPost.data();
          editStatus = true;
          id = getDataPost.id;

          inSendForm['postTitle'].value = postToEdit.tittle;
          inSendForm['postAuthor'].value = postToEdit.author;
          inSendForm['postDescription'].value = postToEdit.comment;
          inSendForm['postLikes'].value = postToEdit.likes;
          inSendForm['btnPost'].innerText = 'Guardar cambios'

        })
      })
      

    })
  }) 
 
})

inSendForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const tittle = inSendForm['postTitle'];
  const authora = inSendForm['postAuthor'];
  const comment = inSendForm['postDescription'];
  const arrayLike = []
  //const likesStart = inSendForm['postAuthor'];
  // console.log(tittle,comment);
  // await savepost(tittle.value, comment.value);
  if(!editStatus){
    await savepost(tittle.value, authora.value, comment.value, arrayLike);
  } else {
    await editPost(id, {

      tittle: tittle.value,
      author: authora.value,
      comment: comment.value,
      likes: arrayLike.value

    });
    editStatus = false;
    id = '';
    inSendForm['btnPost'].innerText = 'Publicar';
  }
  // await getPost();
  inSendForm.reset(); 
  tittle.focus();
  //toMakePost(tittle,comment);
});

// inSendForm.addEventListener('submit', e => {
//   e.preventDefault();
//   const tittle = inSendForm['postTitle'].value;
//   const comment = inSendForm['postDescription'].value;
//   // console.log(tittle,comment);
//   toMakePost(tittle,comment);
// });

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