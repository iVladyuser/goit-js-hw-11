import axios from 'axios';
import { onFetchError } from './showError';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class NewsApiService {
  constructor() {
    this.q = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhoto() {
    try {
      const response = await axios.get('', {
        params: {
          key: '39440146-e742bf3c7a957201e6286a658',
          q: this.q,
          page: this.page,
          per_page: this.perPage,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
        },
      });
      this.page += 1;
      return response.data;
    } catch {
      onFetchError;
    }
  }

  get newPage() {
    return this.page;
  }

  set newPage(currentPage) {
    this.page = currentPage;
  }

  resetPage() {
    this.page = 1;
  }
}

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
