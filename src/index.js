import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const country = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const onInputCountry = () => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (country.value.trim()) {
        fetchCountries(country.value.trim())
            .then(arrayCountries => { 
                if (arrayCountries.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                } if (arrayCountries.length <= 10 && arrayCountries.length >= 2) {
                    countryList.innerHTML = '';
                    arrayCountries.map(country => {
                        countryList.innerHTML+= `
                        <li class="country-item">
                            <img src="${country.flags.svg}" alt="flag ${country.name.official}" height=30px />
                            <p>${country.name.official}</p>
                        </li>
                        `
                    })
                } if (arrayCountries.length === 1) {
                    countryInfo.innerHTML = '';
                    countryInfo.innerHTML+= `
                        <div class="country-item">
                            <img src="${arrayCountries[0].flags.svg}" alt="flag ${arrayCountries[0].name.official}" height=30px />
                            <p>${arrayCountries[0].name.official}</p>
                        </div>
                        <p>Capital: ${arrayCountries[0].capital}</p>
                        <p>Population: ${arrayCountries[0].population}</p>
                        <p>Languages: ${Object.values(arrayCountries[0].languages)}</p>
                        `
                }
            })
            .catch(error => {
                Notiflix.Notify.warning("Oops, there is no country with that name");
            });
    }
}

country.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));