//FIREBASE
  // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCMoOe0AXVQgK3goG6Nd_gb68S7Rjak7w8",
    authDomain: "i-care-4b791.firebaseapp.com",
    projectId: "i-care-4b791",
    storageBucket: "i-care-4b791.appspot.com",
    messagingSenderId: "1028505964973",
    appId: "1:1028505964973:web:643e593fefcb51781f9124",
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  //Enviamos datos para validarlos 
   const auth = firebase.auth();   
   const fs = firebase.firestore();

  //Crear Usuario

   //  const singUpEmail = document.querySelector('#signUp-email').value;
   //  const singUpPassword = document.querySelector('#signUp-password').value;
   //  console.log(singUpEmail, singUpPassword);
export const signUp = (email,password) => {
   auth
   .createUserWithEmailAndPassword(email,password)
   .then(userCredential => {
      //Limpiar el formulario
      singUpForm.reset();
      //Cerrar el formulario
      singUpForm.style.display="none";
      console.log('Creo cuenta'); 
   })
 };

//Iniciar Sesión
export const logIn = (email,password) => {
    auth
         .signInWithEmailAndPassword(email,password)
         .then(userCredential => {

            //Limpiar el formulario
            singUpForm.reset();
            //Cerrar el formulario
            singUpForm.style.display="none";
            console.log('Inicio sesión'); 
         })
};
//Log Out
export const logOut = () => {
   auth.signOut().then(() => {
      console.log('Cerraste Sesión')
   })
};

//Acceso con Google

   export const providerG = () =>{
   new firebase.auth.GoogleAuthProvider();
   auth.signInWithPopup(providerG)
        .then(result => {
         // console.log(result);
           console.log("se ha iniciado sesión con google")
        })
         .catch(err => {
            console.log(err)
         })
   };

//Acceso con Facebook 

   //  console.log('Jala botón Facebook')
   export const providerF = () => {
   new firebase.auth.FacebookAuthProvider();
   auth.signInWithPopup(providerF)
        .then(result => {
           console.log(result);
           console.log("se ha iniciado sesión con facebook ")
        })
         .catch(err => {
            console.log(err)
         })
   };
   
//Post
// const postList = document.querySelector('#myPost');
export const setUpPost = (postList) => {

data => {
   if(data.length) {
      let html = '';
      data.forEach(doc =>{
         const post = doc.data()
         console.log(post)
         const li = `
           <li class="item" >
             <h5>${post.title}</h5>
             <p>${post.description}</p>
           </li>
           `;
           html += li;
      });
      postList.innerHTML = html;
   } else {
      postList.innerHTML=' <p>Inicia sesión para ver las publicaciones</p>'
   }
}};
//Eventos
//Revisa el estatus de Auth

auth.onAuthStateChanged(user => {
   if(user) {
      // console.log('Hay sesión iniciada')
      fs.collection('post')
         .get()
         .then((snapshot) => {
            // console.log(snapshot.docs)
            setUpPost(snapshot.docs)
         })
   } else {
      // console.log('No hay sesión iniciada')
      setUpPost([])
   }
})

export default firebase;