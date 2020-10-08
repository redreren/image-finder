import refs from "./refs.js";
import apiService from "./apiService.js";
import template from "../template/template.hbs";
import debounce from "lodash.debounce";
console.log(refs);
// console.log(apiService.fetchImages());
refs.form.addEventListener(
  "input",

  debounce((e) => {
    e.preventDefault();
    // console.log(e.target.value);
    apiService.query = e.target.value;
    renderApi();
    refs.input.value = "";
  }, 500),
);

function renderApi() {
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
}

function renderImages(data) {
  const items = template(data);
  refs.galleryList.insertAdjacentHTML("afterbegin", items);
}

// const loadMoreButton = document.createElement("button");
// loadMoreButton.textContent = "Load more";
// loadMoreButton.classList.add("loadMore-button");
// refs.body.insertAdjacentElement("beforeend", loadMoreButton);

const loadMoreButton = document.createElement("button");
loadMoreButton.textContent = "Load more";
loadMoreButton.classList.add("loadMore-button");

if (!refs.galleryList) {
  refs.body.insertAdjacentElement("beforeend", loadMoreButton);
  loadMoreButton.classList.remove("hidden");
} else {
  loadMoreButton.classList.add("hidden");
}
