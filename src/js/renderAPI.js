import refs from "./refs.js";
import apiService from "./apiService.js";
import template from "../template/template.hbs";
import debounce from "lodash.debounce";
import * as basicLightbox from 'basiclightbox';
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css";

// const instance = basicLightbox.create(`
//     <div class="modal">
//         <p>
//             Your first lightbox with just a few lines of code.
//             Yes, it's really that simple.
//         </p>
//     </div>
// `);
// instance.show();

refs.galleryList.addEventListener('click', (event) => { 
  if (event.target.nodeName === 'IMG') {
    let modalSrc = event.target.dataset.src;
    const instance = basicLightbox.create(`
    <div class="modal">
    <button class="js-mod-btn">meow</button>
    <img src="${modalSrc}" alt="picture" class="js-mod-img">
    </div>
    `);
    instance.show();
  }
  const imageModal = document.querySelector('.js-mod-img');
  const btnModal = document.querySelector('.js-mod-btn')
  console.log(imageModal);
  console.dir(event.target);
});

refs.form.addEventListener(
  "input",
  debounce((event) => {
    event.preventDefault();
    refs.galleryList.innerHTML = "";
    apiService.querry = event.target.value;
    renderApi();
    refs.input.value = "";
  }, 1000)
);

const loadMoreBtn = document.createElement('button');
loadMoreBtn.addEventListener('click', loadMore);

function renderApi() {
  apiService.fetchImages().then(({hits}) => renderImages(hits))
}

loadMoreBtn.textContent = 'Load more...';
loadMoreBtn.classList.add('loadMore-button');

function renderImages (data){
  const items = template(data);
  refs.galleryList.insertAdjacentHTML('beforeend', items);

  if (refs.galleryList.children)
  {
  refs.body.insertAdjacentElement('beforeend', loadMoreBtn);
  loadMoreBtn.classList.remove('hidden');
  } else
  {
  loadMoreBtn.classList.add('hidden');
  }
}

function loadMore() {
  apiService.setPage();
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
  setTimeout(() => {
    
  }, 500);
}
