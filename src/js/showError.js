import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ref from './refs';
const { btnLoadMore } = ref;

export function onFetchError(error) {
  btnLoadMore.hidden = false;
  Notify.failure(
    'Oops! Something went wrong! Select please another cat breed!',
    {
      position: 'right-top',
      timeout: 1500,
      width: '400px',
      fontSize: '24px',
    }
  );
}
