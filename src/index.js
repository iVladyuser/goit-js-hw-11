import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import  refs  from './js/refs';
import { fetchAnimals } from './js/pixabay-api';
import { createMarkUP } from './js/createMarkUP';

const { form, gallery, btnLoadMore } = refs;

const paramsForNotify = {
    position: 'center-center',
    timeout: 4000,
    width: '500px',
    fontSize: '22px'
};

const perPage = 40;
let page = 1;
let keyOfPhoto = '';

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  gallery.innerHTML = '';
  page = 1;
  const { searchQuery } = event.currentTarget.elements;
  keyOfPhoto = searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');
	console.log(keyOfPhoto);

	if (keyOfPhoto === '') {
		Notify.info ('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
		return

	}
}

fetchAnimals(keyOfPhoto, page, perPage)
  .then(data => {
    const arr = data.hits;
	console.log(data.hits);
	if (data.totalHits === 0) {
		Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
	} else {
		Notify.info(`Hooray! We found ${data.totalHits} images.`, paramsForNotify);
	
    createMarkUP(arr);
	}
  })

  .catch(error => console.log(error));
