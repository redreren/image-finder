import refs from "./refs.js";

const API_key = "18623533-b063c031aae3350f52cd77542";
const baseUrl = "https://pixabay.com/api/";
// let query = "cat";
// let page = 1;
// let perPage = 12;
// const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${API_key}`;

export default {
  _query: "cat",
  page: 1,
  perPage: 12,

  fetchImages() {
    let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=${this.perPage}&key=${API_key}`;
    return fetch(url)
      .then((res) => res.json())
      .catch((error) => displayError(error));
    //   .then(({ hits }) => hits);
  },
  setPage() {
    return this.page++;
  },
  get query() {
    return this._query;
  },
  set query(newQuery) {
    return (this._query = newQuery);
  },
};

function displayError(error) {
  const errorH2 = document.createElement("h2");
  errorH2.textContent = error;
  //   refs.body.insertAdjacentElement("afterbegin", errorH2);
  refs.body.prepend(errorH2);
}
