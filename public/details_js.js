const BASE_URL = '/';
const local = '/';

//Creates a local Storage of data
const changeData = (value) => {
  console.log('HI');
  let p = JSON.stringify(value);
  localStorage.setItem('obj', p);
  location.href = '/details.html';
};

const changeData2 = (value) => {
  let p = JSON.stringify(value);
  localStorage.setItem('obj1', p);
  location.href = '/search.html';
};

//To listen to the search button
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

let page = 1;
let arr;

//Function to create a html template for the string
function htmltemplate(value) {
  let name = value.title;
  let img = value.img_url;
  let str2 = `<div class="card">
                    <figure class="card__thumb">
                      <img src="${img}" alt="Picture by Nathan Dumlao" height="180" width="150" class="card__image"/>
                      <figcaption class="card__caption">
                        <h2 class="card__title">${name}</h2>
                        <p class="card__snippet">   </p>
                      </figcaption>
                    </figure>
                  </div>`;
  return str2;
}

//Function to send the recommended animes based on the selected anime
function selectAnime(obj) {
  if (!obj.score || !obj.ranked) return;
  fetch(`${local}getRecommendation?score=${obj.score}&ranked=${obj.ranked}
      &genre=${obj.genre}&_id=${obj._id}&uid=${obj.uid}`)
    .then((data) => data.json())
    .then((data) => {
      data = data.recommendadtion;
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
    });
}

window.onload = async function () {
  var name = localStorage.getItem('obj');
  arr = JSON.parse(name);
  console.log(arr);

  function solve(val) {
    var services = val;
    services = services.split(',');
    services[0] = services[0].substring(1);
    services[services.length - 1] = services[services.length - 1].substring(
      0,
      services[services.length - 1].length - 1
    );
    services.forEach((x, i) => {
      services[i] = services[i].includes('"')
        ? services[i].replaceAll('"', '').trim()
        : services[i].replaceAll("'", '').trim();
      services[i];
    });
    services = services.join(' ');
    console.log(services);
    return services;
  }

  //DOM Manipulation
  const title = document.querySelector('.title');
  const des = document.querySelector('.des');
  const ge = document.querySelector('.ge');
  const year = document.querySelector('.year');
  const votecnt = document.querySelector('.votecnt');
  const rting = document.querySelector('.rting');
  const run = document.querySelector('.run');

  let x = document.createElement('IMG');
  x.setAttribute('src', `${arr.img_url}`);
  x.setAttribute('width', '304');
  x.setAttribute('height', '228');
  x.setAttribute('alt', `${arr.title} Image`);
  document.querySelector('.left-column').appendChild(x);

  let yr = arr.aired;
  title.textContent = `${arr.title.toUpperCase()}`;
  des.textContent = `${arr.synopsis}`;
  ge.textContent = `${solve(arr.genre)}`;
  year.textContent = `${yr}`;
  rting.textContent = `Score 💯: ${arr.score}`;
  votecnt.textContent = `Ranking 📈: ${arr.ranked}`;
  selectAnime(arr);

  run.addEventListener('click', function () {
    window.open(`${arr.link}`, '_blank');
  });
};
