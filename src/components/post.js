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

const savepost = (tittle,author,comment,likes) =>
     db.collection("post").doc().set({
        tittle,
        author,
        comment,
        likes,
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
      const arrayLikes = post.likes;
      const countLikes = arrayLikes.length;
      const user = auth.currentUser;
      const mailUser = user.email;
      const likeUser = likesArray.indexOf(mailUser);
      let srcLike = '../assets/like.png';
      if (likeUser === -1) {
        srcLike = '../assets/like.png';
      } else {
        srcLike = '../assets/likePink.png';
      }
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
        <button class ="btnPosted btnLike" data-id="${post.id}><img class="forLike" src="${srcLike}">Like ${countLikes}</button>
        </div>
       </div>
      `
      const btnsDelete = document.querySelectorAll('.btnDeleted');
      btnsDelete.forEach(btn => {
        btn.addEventListener('click', async (e) => {
           await deletePost(e.target.dataset.id);
        })
      });

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
          inSendForm['btnPost'].innerText = 'Guardar cambios'

        })
      })

      /////LIKES
        const btnsLike = document.querySelectorAll('.btnLike');
        btnsLike.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            // define los ids indivisuales
            const postData = await getIdpost(e.target.dataset.id);
            const id = postData.id;
            const user = auth.currentUser;
            const mailUser = user.email;
            const dataPost = postData.data();
            const arrayLikes = dataPost.likes;
            let likeUser = '';
            arrayLikes.forEach((mailU) => {
              if (mailU === mailUser) {
                likeUser = mailU;
              }
            });
            if (likeUser === '') {
              arrayLikes.push(mailUser);
            } else {
              const positionMail = arrayLikes.indexOf(likeUser);
              arrayLikes.splice(positionMail, 1);
            }
            await editPost(id, {
              likes: arrayLikes,
            });
          });
        });
      });
      /////
      

    })
  }) 
  
 
 
};

inSendForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const tittle = inSendForm['postTitle'];
  const authora = inSendForm['postAuthor'];
  const comment = inSendForm['postDescription'];
  // console.log(tittle,comment);
  // await savepost(tittle.value, comment.value);
  if(!editStatus){
    await savepost(tittle.value,  authora.value, comment.value);
  } else {
    await editPost(id, {
      tittle: tittle.value,
      author:  authora.value,
      comment: comment.value
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
