import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './style.css';
import refs from './js/refs';

import { fetchAnimals } from './js/pixabay-api';
import { createMarkUP } from './js/createMarkUP';
import { onFetchError } from './js/showError';

const { form, gallery, divGuard, input } = refs;

const paramsForNotify = {
  position: 'right-top',
  timeout: 1500,
  width: '480px',
  fontSize: '22px',
};

let perPage = 40;
let page = 0;
let keyOfPhoto = '';

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  if (input.value === '') {
    Notify.info('Enter your request, please!', paramsForNotify);
    return;
  }
  gallery.innerHTML = '';
  page = 1;
  const { searchQuery } = event.currentTarget.elements;
  keyOfPhoto = searchQuery.value.trim().toLowerCase().split(' ').join('+');

  if (keyOfPhoto === '') {
    Notify.info('Enter your request, please!', paramsForNotify);
    return;
  }
  fetchAnimals(keyOfPhoto, page, perPage)
    .then(data => {
      const arr = data.hits;
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          paramsForNotify
        );
      } else {
        createMarkUP(arr);
        observer.observe(divGuard);
        const lightbox = new SimpleLightbox('.img_wrap a');
        lightbox.refresh();
        Notify.info(
          `Hooray! We found ${data.totalHits} images.`,
          paramsForNotify
        );
      }
    })

    .catch(onFetchError)
    .finally(() => {
      form.reset();
    });
  event.currentTarget.reset();
}

let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      fetchAnimals(keyOfPhoto, page, perPage)
        .then(data => {
			if (data.totalHits <= perPage) {
				observer.unobserve(divGuard);
			  }
          const arr = data.hits;
          createMarkUP(arr);
          const lightbox = new SimpleLightbox('.img_wrap a');
          lightbox.refresh();
         
        })

        .catch(onFetchError);
    }
  });
}
