import {setUpPost} from './lib/firebase.js';

export const postView =`
<div class="allPost"><ul class="lisGroup" id="myPost"></ul></div>
`;

export const postList = document.querySelector('#myPost');
setUpPost(postList)
