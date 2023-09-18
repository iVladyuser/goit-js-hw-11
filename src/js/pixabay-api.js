import axios from 'axios';
import { onFetchError } from './showError';

axios.defaults.baseURL = 'https://pixabay.com/api/';

// export async function fetchPhoto(q, page, perPage) {
//   try {
//     const response = await axios.get(``, {
//       params: {
//         key: '39440146-e742bf3c7a957201e6286a658',
//         q: q,
//         page: page,
//         perPage: perPage,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//       },
//     });
//     return response.data;
//   } catch {
//     onFetchError;
//   }
// }

export default class NewsApiService {
  constructor() {
    this.q = searchQuery;
    this.page = 1;
    this.perPage = perPage;
  }

  async fetchPhoto(keyOfPhoto, page, perPage) {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/'?q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`,
        {
          params: {
            key: '39440146-e742bf3c7a957201e6286a658',
            // q: q,
            // page: page,
            // perPage: perPage,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
          },
        }
      );
      return fetchPhoto().then(data => {
        if (data.totalHits <= perPage) {
          observer.unobserve(divGuard);
        }
        const arr = data.hits;
        createMarkUp(arr);
        lightbox.refresh();
        return;
      });
    } catch {
      onFetchError;
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get page() {
    return this.page;
  }

  set page(currentPage) {
    this.page = currentPage;
  }
}
