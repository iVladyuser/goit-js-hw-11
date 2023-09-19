import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './style.css';
import refs from './js/refs';

import NewsApiService from './js/pixabay-api';
import { createMarkUp } from './js/createMarkUP';
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
// let keyOfPhoto = '';
const lightbox = new SimpleLightbox('.img_wrap a');
const newsApiService = new NewsApiService();

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  if (input.value === '') {
    Notify.info('Enter your request, please!', paramsForNotify);
    return;
  }
  gallery.innerHTML = '';

  const value = event.currentTarget.elements.searchQuery.value;
  newsApiService.q = value;
  //   newsApiService.newPage = event.currentTarget.elements.page.value;
  newsApiService.resetPage();

  //   if (keyOfPhoto === '') {
  //     Notify.info('Enter your request, please!', paramsForNotify);
  //     return;
  //   }
  newsApiService
    .fetchPhoto()
    .then(data => {
      const arr = data.hits;
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          paramsForNotify
        );

        return;
      }
      createMarkUp(arr);
      observer.observe(divGuard);
      lightbox.refresh();
      Notify.info(
        `Hooray! We found ${data.totalHits} images.`,
        paramsForNotify
      );
    })

    .catch(onFetchError);
  // .finally(() => {
  //   form.reset();
  // });
  event.currentTarget.reset();
}

let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad([entry], observer) {
  if (entry.isIntersecting) {
    newsApiService
      .fetchPhoto()
      .then(data => {
        const arr = data.hits;
        createMarkUp(arr);
        lightbox.refresh();
        if (data.totalHits <= perPage) {
          observer.unobserve(divGuard);
        }
      })
      .catch(onFetchError);
  }
}
