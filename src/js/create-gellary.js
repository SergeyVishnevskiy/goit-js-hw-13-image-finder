import imagesTpl from '../templates/img.hbs';
// import loadButton from './loadButton';
import apiService from './apiService';
import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

function createGellary(image) {
  const markup = imagesTpl(image);
  if (apiService.query === '') {
    clearGellary();
    notice({
      title: 'Oh, no(((',
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 1000,
    });
  }
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  } else {
    const instance = basicLightbox.create(`
        <img class="modal-img" src="${event.target.dataset.img}"/>`);
    instance.show();
  }
}

refs.gallery.addEventListener('click', openModal);

export default createGellary;
