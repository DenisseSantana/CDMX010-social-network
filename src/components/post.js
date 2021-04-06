import { toViewLogOut } from '../lib/firebase.js';
export const toViewPost = (container) => {
  const uidUSer = localStorage.getItem('idUser');
  const html = `
  <div class="postBody"> 
    <div class="postHeader">
      <div><img src="assets/I care circle.png" class="titlelogo"></div>
      <div><h1>I care</h1></div>
      <div class="boxToLogOut"><a href="#" id="logout">Cerrar sesión</a></div>
    </div>
    <br>
    <div class="postContainer">
      <div class="boxToPost">
        <form id = "postForm">
          <div>
            <textarea id ="postTitle" placeholder="Título" autofocus cols="100" ></textarea>
          </div>
          <div>
            <textarea id ="postAuthor" placeholder="Autora" autofocus cols="100" ></textarea>
          </div>
          <div>
            <textarea id ="postDescription" placeholder="Escribe tu comentario aquí" rows="4" cols="100"></textarea>
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
  const editPost = (id, updatedPost) => db.collection('post').doc(id).update(updatedPost);
  window.addEventListener('DOMContentLoaded', async (e) => {
    //const querySnapshot = await getPost();  
    onGetPost((querySnapshot) => {
      postedComments.innerHTML = '';
      querySnapshot.forEach(doc => {

        const post = doc.data();
        post.id = doc.id;
        const arrayLikes = post.likes;
        const countLikes = arrayLikes.length;

        postedComments.innerHTML += `
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
            <span class="counter" id="counter" data-id="${post.id}">${countLikes}</span>
          </div>
        </div>
        `
        const btnsDelete = document.querySelectorAll('.btnDeleted');
        btnsDelete.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            await deletePost(e.target.dataset.id);
          })
        });

        const btnsLike = document.querySelectorAll('.btnLike');
        btnsLike.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const getDataPost = await getIdPost(e.target.dataset.id);
            const postToEdit = getDataPost.data();


            id = getDataPost.id;

            const arrlike = postToEdit.likes;
            if (arrlike.includes(uidUSer)) {
              db.collection('post').doc(id).update({likes: firebase.firestore.FieldValue.arrayRemove(uidUSer),
              });
            }
            else {
              db.collection('post').doc(id).update({likes: firebase.firestore.FieldValue.arrayUnion(uidUSer),
              });
            }
          })
        })

        const btnsEdit = document.querySelectorAll('.btnEdit');
        btnsEdit.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const getDataPost = await getIdPost(e.target.dataset.id);


            const postToEdit = getDataPost.data();
            editStatus = true;
            id = getDataPost.id;
            inSendForm['postTitle'].value = postToEdit.tittle;
            inSendForm['postAuthor'].value = postToEdit.author;
            inSendForm['postDescription'].value = postToEdit.comment;

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
    let arrayLike = []
   
   
    if (!editStatus) {
      await savepost(tittle.value, authora.value, comment.value, arrayLike);
    } else {
      await editPost(id, {
        tittle: tittle.value,
        author: authora.value,
        comment: comment.value,
        //likes: arrayLike.value
      });
      editStatus = false;
      id = '';
      inSendForm['btnPost'].innerText = 'Publicar';
    }

    inSendForm.reset();
    tittle.focus();

  });

  const willLogOut = document.querySelector('#logout');
  willLogOut.addEventListener('click', e => {
    e.preventDefault();
    toViewLogOut();
  });
}