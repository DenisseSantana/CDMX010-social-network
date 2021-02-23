  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCMoOe0AXVQgK3goG6Nd_gb68S7Rjak7w8",
    authDomain: "i-care-4b791.firebaseapp.com",
    projectId: "i-care-4b791",
    storageBucket: "i-care-4b791.appspot.com",
    messagingSenderId: "1028505964973",
    appId: "1:1028505964973:web:643e593fefcb51781f9124"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //Enviamos datos para validarlos 
  const auth = firebase.auth();   
  const fs = firebase.firestore();


