import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './style.css';
import refs from './js/refs';

import NewsApiService from './js/pixabay-api';
import { createMarkUp } from './js/createMarkUP';
import { onFetchError } from './js/showError';
// import { createFetchPhoto } from './js/createFetchPhoto';

const { form, gallery, input } = refs;

const paramsForNotify = {
  position: 'right-top',
  timeout: 1500,
  width: '480px',
  fontSize: '22px',
};

let page = 1;

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
  page = 1;
  const value = event.currentTarget.elements.searchQuery.value;
  newsApiService.q = value;

  newsApiService.resetPage((page = 1));

  newsApiService
    .fetchPhoto()
    .then(({ hits, totalHits, total }) => {
      if (!totalHits) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          paramsForNotify
        );
        return;
      }
      createMarkUp(hits);
      lightbox.refresh();
      Notify.info(`Hooray! We found ${total} images.`, paramsForNotify);

      const lastCard = document.querySelector('.gallery').lastChild;
      if (lastCard) observer.observe(lastCard);

      if (page * 40 >= total) {
        observer.unobserve(lastCard);
      }
    })

    .catch(onFetchError);

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
    observer.unobserve(entry.target);
    page += 1;
    newsApiService.newPage = page;
    newsApiService
      .fetchPhoto()
      .then(({ hits, total }) => {
        createMarkUp(hits);
        lightbox.refresh();
        if (page * 40 >= total) {
          observer.unobserve(lastCard);
        }
        const lastCard = document.querySelector('.gallery').lastChild;
        if (lastCard) observer.observe(lastCard);
      })
      .catch();
  }
}
