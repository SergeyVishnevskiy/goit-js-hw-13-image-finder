import './styles.css';
import LoadButton from './js/loadButton';
import createGellary from './js/create-gellary';
import apiService from './js/apiService';
import refs from './js/refs';

const loadingButton = new LoadButton('button[data-action="load-more"]');
refs.searchForm.addEventListener('submit', searchSubmit);
loadingButton.refs.button.addEventListener('click', updateGellary);

function searchSubmit(event) {
  event.preventDefault();

  const inputPlace = event.currentTarget;
  apiService.query = inputPlace.elements.query.value;

  apiService.resetPage();
  inputPlace.reset();
  updateGellary();
  clearGellary();
}

function updateGellary() {
  loadingButton.disable();

  apiService.fetchImages().then(image => {
    createGellary(image);
    loadingButton.show();
    loadingButton.enable();

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function clearGellary() {
  refs.gallery.innerHTML = '';
}
