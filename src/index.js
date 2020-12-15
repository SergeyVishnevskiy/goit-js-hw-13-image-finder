import './styles.css';
import LoadButton from './JS/loadButton';
import createMarkup from './JS/create-markup';
import apiService from './JS/apiService';
import refs from './JS/refs';

const loadingButton = new LoadButton('button[data-action="load-more"]');
refs.searchForm.addEventListener('submit', searchSubmit);
loadingButton.refs.button.addEventListener('click', nextLoadImg);

function searchSubmit(event) {
  event.preventDefault();

  const inputPlace = event.currentTarget;
  apiService.query = inputPlace.elements.query.value;

  clearGallery();
  apiService.resetPage();
  inputPlace.reset();
  nextLoadImg();
}
function nextLoadImg() {
  loadingButton.disable();

  apiService.fetchImages().then(image => {
    createMarkup(image);
    loadingButton.show();
    loadingButton.enable();

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}
