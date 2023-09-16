import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './style.css';
import refs from './js/refs';

import { fetchAnimals } from './js/pixabay-api';
import { createMarkUP } from './js/createMarkUP';
import { onFetchError } from './js/showError';

const { form, gallery, divGuard } = refs;

const paramsForNotify = {
  position: 'right-top',
  timeout: 1500,
  width: '480px',
  fontSize: '22px',
};

let currentPage = 1;
let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      fetchAnimals(currentPage)
        .then(data => {
          const arr = data.hits;
          createMarkUP(arr);
          const lightbox = new SimpleLightbox('.img_wrap a');
          if (data.totalHits <= perPage) {
            observer.unobserve(divGuard);
          }
        })

        .catch(onFetchError);
    }
  });
}

let perPage = 24;
let page = 1;
let keyOfPhoto = '';

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  gallery.innerHTML = '';
  page = 1;
  const { searchQuery } = event.currentTarget.elements;
  keyOfPhoto = searchQuery.value.trim().toLowerCase().split(' ').join('+');

  fetchAnimals(keyOfPhoto, page, perPage)
    .then(data => {
      const arr = data.hits;
      observer.observe(divGuard);
      if (keyOfPhoto === '') {
        Notify.info(
          'Sorry, there are no images. Please try again.',
          paramsForNotify
        );
      } else {
        createMarkUP(arr);
        const lightbox = new SimpleLightbox('.img_wrap a');
        Notify.info(
          `Hooray! We found ${data.totalHits} images.`,
          paramsForNotify
        );
      }
    })

    .catch(onFetchError)
    .finally(() => form.reset());
}

// btnLoadMore.addEventListener('click', onload);

// function onload() {
//   page += 1;
//   fetchAnimals(keyOfPhoto, page, perPage)
//     .then(data => {
//       const arr = data.hits;
//       createMarkUP(arr);
//     })
//     .catch(onFetchError);
// }
