import { toViewHome } from './components/home.js';
import { toViewLogIn } from './components/login.js';
import { toViewSignUp } from './components/singup.js';
import { toViewPost } from './components/post.js';
// import { toViewLogOut } from './components/logout.js';

//Objeto que contiene los pathnames de las secciones
const rootDiv = document.getElementById('root');

export const routes = {
    '/': toViewHome,
    '/login': toViewLogIn,
    '/signup': toViewSignUp,
    '/post': toViewPost,
};


//Función que renderiza el pathname 
export const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    const component = routes[pathname] 
    component(rootDiv);
};

window.onpopstate = () => {
    const component = routes[window.location.pathname];
    component(rootDiv);
};