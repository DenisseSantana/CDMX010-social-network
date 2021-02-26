import { home } from './home.js';
import { toSignView} from './signup.js';
import { toLogInView } from './login.js';
import { postView } from './post.js';
import { logOutView } from './logout.js';

//Objeto que contiene los pathnames de las secciones
const rootDiv = document.getElementById('root');

export const routes = {
    '/home': home,
    '/signup': toSignView,
    '/login': toLogInView,
    '/post': postView,
    '/logout': logOutView,
};
//Evento click que define el pathname donde se renderizará //
export function forRouter(linkId,PathName) {
    console.log(linkId)
    linkId.addEventListener('click', () => {
        onNavigate(PathName); return false;
    })
}
//Función que renderiza el pathname 
export const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    rootDiv.innerHTML=routes[pathname];
    const homeLink = document.getElementById('homeMenu');
    homeLink.addEventListener('click', () => console.log('lol'))
};

