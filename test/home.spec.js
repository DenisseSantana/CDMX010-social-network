import {toViewHome} from '../src/components/home.js'

describe('toViewHome', () => {
    it('debería ser una función', () => {
      expect(typeof toViewHome).toBe('function');
    });
  });

// describe('Test home', ()=>{
//     beforeEach(()=>{
//         document.body.innerHTML=`<div id='root'></div>`;
//     });
//   test('It should render', async ()=>{st
//       const container = document.getElementById('root');
//       const post = [
//           {author:'Fulanito'},
//       ];
//       const getPost = jest.fn().mockImplemantation(() => Promise.resolve(post));
//       const firebase = {getPost};
//     await toViewHome (container,firebase);
//     expect(container.innerHTML).toMatchSnapshot();
//   });  
// });
// describe('Test home', ()=>{
//     beforeEach(()=>{
//         document.body.innerHTML=`<div id='root'></div>`;
//     });
//   test('Button event', async ()=>{
//       const container = document.getElementById('root');
//       const post = [
//           {author:'Fulanito'},
//       ];
//       const getPost = jest.fn().mockImplemantation(() => Promise.resolve(post));
//       const firebase = {getPost};
//     await toViewHome (container,firebase);
//     expect(container.innerHTML).toMatchSnapshot();
//   });  
// });