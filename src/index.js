import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './style.css'
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './js/refs';
import { fetchAnimals } from './js/pixabay-api';
import { createMarkUP } from './js/createMarkUP';
import { onFetchError } from './js/showError';

const { form, gallery, btnLoadMore } = refs;

const paramsForNotify = {
  position: 'center-center',
  timeout: 1500,
  width: '400px',
  fontSize: '22px',
};

const perPage = 20;
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

      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          paramsForNotify
        );
      } else {
        Notify.info(
          `Hooray! We found ${data.totalHits} images.`,
          paramsForNotify
        );
        createMarkUP(arr);
      }
	  if (data.totalHits > perPage) {
		btnLoadMore.hidden = false;
		window.addEventListener('scroll', showLoadMorePage);
	};
    })

    .catch(onFetchError)
    .finally(() => form.reset());

  if (keyOfPhoto === '') {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.',
      paramsForNotify
    );
    return;
  }
}

btnLoadMore.addEventListener('click', onload);

function onload() {
  page += 1;
  fetchAnimals(keyOfPhoto, page, perPage)
    .then(data => {
      const arr = data.hits;
      createMarkUP(arr);
    })
    .catch(onFetchError);
}
