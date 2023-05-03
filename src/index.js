import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const container = document.querySelector('.country-info');
const listEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));
let inputText = '';

function onInputText(e) {
  inputText = e.target.value.trim();
  console.log(inputText);
  fetchCountries(inputText).then(renderCountries).catch(onFetchError);
}

function renderCountries(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 1) {
    return markUpManyCountries(countries);
  } else if (countries.length === 1) {
    return markUpCountry(countries);
  }
}

function markUpManyCountries(countries) {
  const markup = countries
    .map(({ flags, name }) => {
      return `<li class = "country-item">
      <img src="${flags.svg}" width="60" height="40" alt="flag of ${name}" />
      <h2>${name.official}</h2>
    </li>`;
    })
    .join('');
  listEl.innerHTML = markup;
}

function markUpCountry(country) {
  const markup = country
    .map(({ flags, name, capital, population, languages }) => {
      return ` <img src="${flags.svg}" width="60" height="40" alt="${name}">
      <h2 class="country-info__title"> ${name.official}</h2>
         <p>Capital: <span> ${capital}</span></p>
         <p>Population: <span> ${population}</span></p>
         <p>Languages: <span> ${Object.values(languages).join(
           ', '
         )}</span></p>`;
    })
    .join('');
  listEl.innerHTML = markup;
}

function onFetchError(error) {
  console.log(error);
}
