const BASE_URL = '/';

let page = 1;
const animeList = {};

const changeData2 = (value) => {
  let p = JSON.stringify(value);
  localStorage.setItem('obj1', p); // Pair  key : value
  location.href = '/search.html';
};

const changeData = (value) => {
  console.log('HI');
  let p = JSON.stringify(value);
  localStorage.setItem('obj', p);
  location.href = '/details.html';
};

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('.searchInput').addEventListener('keypress', (obj) => {
    if (obj.key === 'Enter') {
      const po = document.querySelector('.searchInput');
      fetch(`${BASE_URL}getAnimes?keyword=${po.value}`)
        .then((data) => data.json())
        .then((data) => {
          data = data.anime;
          changeData2(data);
          console.log(data);
        });
    }
  });
});

function htmltemplate(value) {
  let name = value.title;
  let img = value.img_url;
  let str2 = `<div class="card">
                    <figure class="card__thumb">
                      <img src="${img}" alt="Picture by Nathan Dumlao" height="180" width="150" class="card__image"/>
                      <figcaption class="card__caption">
                        <h2 class="card__title">${name}</h2>
                        <p class="card__snippet">   </p>
                        <a href="http://127.0.0.1:3000/details.html" class="card__button">View more</a>
                      </figcaption>
                    </figure>
                  </div>`;
  return str2;
}

window.onload = function () {
  var name = localStorage.getItem('obj1');
  name = JSON.parse(name);
  console.log(name);
  getAnimes(name);
};

function getAnimes(data) {
  console.log(data);
  data.forEach((value) => {
    const t = JSON.stringify(value);
    let inputElement = document.createElement('div');
    inputElement.addEventListener('click', () => {
      changeData(value);
    });
    const container = document.querySelector('.container2');
    const papacontainer = document.querySelector('.container');
    let str = htmltemplate(value);
    papacontainer.insertBefore(inputElement, container);
    inputElement.insertAdjacentHTML('afterbegin', str);
  });
}
