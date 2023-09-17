import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '39440146-e742bf3c7a957201e6286a658';

export async function fetchAnimals(q, page, perPage) {
  const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await axios.get(url);
  return response.data;
}

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['x-api-key'] =
//   '39440146-e742bf3c7a957201e6286a658';

// export async function fetchAnimals(q, page, perPage) {
//   try {
//     const response = await axios.get({
//       params: {
//         q: q,
//         page: page,
//         perPage: perPage,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
