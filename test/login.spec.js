// importamos la funcion que vamos a testear
import { toViewHome } from '../src/components/home';

describe('toViewHome', () => {
  it('debería ser una función', () => {
    expect(typeof toViewHome).toBe('function');
  });
});

/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */

// importamos funciones que nos ayudaran a simular las interacciones del usario con la UI
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

// importamos el componente/vista que deseamos probar
import option from './home.js';

describe('LoginComponent', () => {
  // Creamos un root element en nuestro DOM para que nos sirva de contenedor para nuesta vista/componente principal Login
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  // Este test puede ser saltado enfocate en los 2 de aabjo
  it('should render', () => {
    const target = document.getElementById('root');
    Login({ firebaseClient: {} }).render(target);

    expect(target.innerHTML).toMatchSnapshot();
  });

  it('should login the user when the user submits the login form', () => {
    const target = document.getElementById('root');
    
    // Mockeamos la funcion de login de Firebase la cual sera invocada cuando el usuario haga click sobre el boton "Sign In"
    // Por que?  La idea central es verificar que esta funcion es invocada lo cual haremos linea mas abajo
    const signIn = jest.fn().mockImplementation(() => Promise.resolve('ok'));
    
    const email = 'test@example.com';
    const password = '123456789';
    
    // Invoco mi component y lo renderizo pasandole el contenedor como argumento
    Login({ signIn }).render(target);

    // Referencia: https://testing-library.com/docs/ecosystem-user-event/#api
    userEvent.type(screen.getByLabelText('Email'), email);
    userEvent.type(screen.getByLabelText('Password'), password);
    userEvent.click(screen.getByDisplayValue('Sign In'));
    
    // Verificamos que nuestro mock de la funcion login de firebase es llamada con el email y password que el usuario escribio mas arriba
    // Referencia: https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-
    expect(signIn).toHaveBeenCalledWith(email, password);
  });

  it('should show an error message when a user provides invalid credentials', async () => {
    const target = document.getElementById('root');
    const message = 'Invalid credentials!';
    const signIn = jest.fn().mockImplementation(
      (email, password) => Promise.reject({ message }),
    );
    const email = 'test@example.com';
    const password = 'invalidpassword';
    Login({ signIn }).render(target);

    // Referencia: https://testing-library.com/docs/ecosystem-user-event/#api
    userEvent.type(screen.getByLabelText('Email'), email);
    userEvent.type(screen.getByLabelText('Password'), password);
    userEvent.click(screen.getByDisplayValue('Sign In'));
    
    // Referencia: https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-
    expect(signIn).toHaveBeenCalledWith(email, password);

    // Referencia: https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
    await waitFor(() => {
      expect(screen.getByTestId('errorMessage').innerHTML).toBe(message);
    });
  });
});

