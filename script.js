'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const searchInput = document.querySelector('.input--search');
const searchBtn = document.querySelector('.btn--search');
const exit = document.querySelector('.country__ex');

///////////////////////////////////////

let renderHtml = function (data, className) {
  let html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
   <h3 class="country__name">${data.name}</h3>
   <h4 class="country__region">${data.region}</h4>
   <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
     2
   )} people</p>
   <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
   <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
   <p class ="country__ex">✖</p>
  
  </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getInfoCounry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);

  request.send();

  request.addEventListener('load', function () {
    let [data] = JSON.parse(request.responseText);
    console.log(data);
    renderHtml(data);
    let borders = data.borders;
    console.log(borders);
    for (const border of borders) {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v2/alpha/${border}`);
      request2.send();
      request2.addEventListener('load', function () {
        let data2 = JSON.parse(request2.responseText);
        console.log(data2);
        renderHtml(data2, 'neighbour');
      });
    }
  });
};

// btn click qilinganda
searchBtn.addEventListener('click', function (e) {
  e.preventDefault();

  getInfoCounry(searchInput.value);
  searchInput.value = '';
});
