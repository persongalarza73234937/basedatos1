 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyDdQ4SVQXBPquB_VBa9i1DiTxpizcev3X0",
    authDomain: "registroweb-5a1d4.firebaseapp.com",
    projectId: "registroweb-5a1d4",
    storageBucket: "registroweb-5a1d4.appspot.com",
    messagingSenderId: "640062566396",
    appId: "1:640062566396:web:3f2a8e46da831f97744c79",
    measurementId: "G-C0HXEG1JGL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = firebase.auth();
  
  // llamando elementos de html
  let btnRegistrar = document.getElementById('btnRegistrar');
  let btnIngresar = document.getElementById('btnIngresar');
  let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
  let formulario = document.getElementById('formulario');
  let btnCerrarSesion = document.getElementById('btnCerrarSesion');
  let btngoogle= document.getElementById('btngoogle');
  let btnfacebook= document.getElementById('btnfacebook');
  
  //Función Registrar
  btnRegistrar.addEventListener('click', () => {
      let email = document.getElementById('txtEmail').value;
      let password = document.getElementById('txtPassword').value;
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Signed in
              console.log("Inicio de sesión correcto");
              cargarJson();
              contenidoDeLaWeb.classList.replace('ocultar','mostrar');
              formulario.classList.replace('mostrar','ocultar');
              var user = userCredential.user;
              // ...
          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
              // ..
          });
  })
  
  //funcion iniciar sesion
  btnIngresar.addEventListener('click',()=>{ 
      let email = document.getElementById('txtEmail').value;
      let password = document.getElementById('txtPassword').value;
      console.log("tu email es" + email + " y tu password es" + password);
  
      firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Inicio sesion correctamente");
      cargarJson();
      contenidoDeLaWeb.classList.replace('ocultar','mostrar');
      formulario.classList.replace('mostrar','ocultar');
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  })
  //funcion cerrar sesion
  btnCerrarSesion.addEventListener('click',()=>{
  firebase.auth().signOut().then(() => {
      console.log("cierre de sesion correcto");
      contenidoDeLaWeb.classList.replace('mostrar','ocultar');
      formulario.classList.replace('ocultar','mostrar');
  
  }).catch((error) => {
      console.log("error con el cierre de sesion");
  
  });  
  })
  
  //funcion estado del usuario
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        cargarJson();
        contenidoDeLaWeb.classList.replace('ocultar','mostrar');
        formulario.classList.replace('mostrar','ocultar');     
      } else {
        contenidoDeLaWeb.classList.replace('mostrar','ocultar');
        formulario.classList.replace('ocultar','mostrar');
      }
    });
  //funcion login con google
  btngoogle.addEventListener('click',()=>{
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      console.log("inicio sesion con google");
      
      var token = credential.accessToken;
      var user = result.user;
      
    }).catch((error) => {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log("error de login con google");
    });
  })
  
  function cargarJson(){
  fetch('data.json')
  .then(function(res){
    return res.json();
  })
  .then((data) => {
  console.log(data);
  let html='';
  data.forEach((cartelera) => {
   html +=` 
   <div class="producto">
         <p> ${cartelera.marca} </p>
         <img src=${cartelera.img} height="150px">
         <h1> S/.${cartelera.precio} </h1>
         <h3>${cartelera.lenguaje}</h3>
         </div>
       `;
  });
  document.getElementById('resultado').innerHTML=html;
  })
  }