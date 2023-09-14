import { Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import ref from './js/refs';

const { gallery} = ref;

import { fetchAnimals } from './js/pixabay-api';
import {createMarkUP } from './js/createMarkUP';

fetchAnimals()
  .then(data => gallery.insertAdjacentHTML('beforeend', createMarkUP(data.hits)))
  .catch(error => console.log(error));


