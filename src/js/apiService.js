import refs from "./refs.js";

const apiKey = "18623533-b063c031aae3350f52cd77542";
const baseUrl = "https://pixabay.com/api/";

export default {
  _querry: "",
  page: 1,
  perPage: 12,

  fetchImages() {
    let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this._querry}&page=${this.page}&per_page=${this.perPage}&key=${apiKey}`;
    return fetch(url)
      .then((res) => res.json())
      .catch((error) => displayError(error));
  },
  setPage() {
    return this.page++;
  },
  get querry() {
    return this._querry;
  },
  set querry(newQuerry) {
    return (this._querry = newQuerry);
  },
};

function displayError(error) {
  const errorH2 = document.createElement("h2");
  errorH2.textContent = error;
  refs.body.prepend(errorH2);
}
