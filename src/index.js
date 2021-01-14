import './styles.css';
import articlesTpl from './template/card.hbs';
import NewApiService from './js/apiService';
import errorNotification from './js/errorPnotify';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  inputText: document.querySelector('input[class="form-control"]'),
  outputText: document.querySelector('ul[class="gallery"]'),
  clickButton: document.querySelector('button[class="tuch-me-if-you-want"]'),
  totalHit: null,
};
const newApiService = new NewApiService();
refs.clickButton.addEventListener('click', e => {
  e.preventDefault();
  newApiService.query = refs.inputText.value;
  newApiService.resetPage();
  newApiService.fetchArticles().then(({ hits, totalHits }) => {
    clearArticlesContainer();
    refs.totalHit = totalHits;
    appendArticlesMarkup(hits);
  });
});
refs.outputText.addEventListener('click', e => {
  if (e.target.localName === 'img') {
    const bigImg = e.target.dataset.big_img;
    let myImg = `<img src=${bigImg}>`;
    const instance = basicLightbox.create(myImg);
    instance.show();
  }
});

function clearArticlesContainer() {
  refs.outputText.innerHTML = '';
}
function appendArticlesMarkup(articles) {
  refs.outputText.insertAdjacentHTML('beforeend', articlesTpl(articles));
  newImg();
}

function newImg() {
  let images = document.querySelectorAll('img');
  let img1 = images[images.length - 1];

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };

  function handleImg(myLiImg, observer) {
    if (myLiImg[myLiImg.length - 1].intersectionRatio === 1) {
      if (refs.totalHit != document.querySelectorAll('li').length) {
        newApiService.incrementPage();
        newApiService.fetchArticles().then(({ hits }) => {
          appendArticlesMarkup(hits);
          observer.disconnect();
          return;
        });
      }
    }
  }
  let observer = new IntersectionObserver(handleImg, options);
  if (img1) {
    observer.observe(img1);
  } else {
    errorNotification(
      '"нихрена" understand.',
      'Please enter a more "конкретно)" query!',
    );
  }
}
