import Notiflix from 'notiflix';
function fetchCountries(name) {
  // робить HTTP-запит на ресурс name
  // і повертає проміс
  //  з масивом країн - результатом запиту.

  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
}

export { fetchCountries };
