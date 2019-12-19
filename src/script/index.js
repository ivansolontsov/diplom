const searchForm = document.forms.search; // форма поиска
const newsContainer = document.querySelector('.result__cards-wrapper'); // контейнер для новостей
const progressBarBlock = document.querySelector('.result__progress'); // progress bar
const newsBlock = document.querySelector('.result__news'); // news section
const notFoundError = document.querySelector('.result__not-found'); // not found block
const moreButton = document.querySelector('.result__button');
const formError = document.querySelector('.form__error');
const resultTitle = document.querySelector('.result__news-title-wrapper');
const resultError = document.querySelector('.result__error');

import {Api} from './api.js';

class Search {
  constructor(form, errorWrapper) {
    this.form = form;
    this.error = errorWrapper;
    this.form.addEventListener('input', () => this.validate());
    this.form.addEventListener('submit', () => this.validate());
  }
  validate() {
    if(this.form.input.value === '') {
      this.error.textContent = 'Нужно ввести ключевое слово';
      this.error.setAttribute('style', 'display: block');
      return false;
    } else
      this.error.setAttribute('style', 'display: none');
    if(!this.form.elements.input.validity.valid) {
      this.error.textContent = 'Длина запроса должна быть от 2 до 31 символа.';
      this.error.setAttribute('style', 'display: block');
      return false;
    } else
      this.error.setAttribute('style', 'display: none');
        return true;
  }
}
const searchComponent = new Search(searchForm, formError);
const apiComponent = new Api('2c22949ae7344b648fca6988958eda43');

class Card {
  constructor (image, date, title, text, source, url) {
    this.image = image;
    this.date =  date;
    this.title = title;
    this.text = text;
    this.source = source;
    this.url = url;

    let formatDate = new Date(this.date);
    const options = {
      month: 'long',
      day: 'numeric'
    };
    formatDate = formatDate.toLocaleString("ru", options);
    this.formatDate = formatDate;
    this.cardElement = this.createCard();
  }
  createCard() {
    const card =  document.createElement('a')
    card.setAttribute('href', this.url);
    card.classList.add('result__card-link');
    card.setAttribute('target', '_blank');
    card.innerHTML = `
    <div class="result__card">
    <div class="result__card-image" style="background-image: url('${this.image}')"></div>
    <time datetime="${this.date}" class="result__card-date">${this.formatDate}</time>
    <h3 class="result__card-title">${this.title}</h3>
    <p class="result__card-text">${this.text}</p>
    <small class="result__card-author">${this.source}</small>
    </div>`;
    return card;
  }
}



let cardNumber = 0;
class NewsList {
  constructor(newsContainer, moreNewsButton, notFoundBlock, preloaderBlock, mainContainer, resultError, mainContainerTitle) {
    this.container = newsContainer;
    this.moreNewsButton = moreNewsButton;
    this.notFoundBlock = notFoundBlock;
    this.preloaderBlock = preloaderBlock;
    this.mainContainer = mainContainer;
    this.resultError = resultError;
    this.mainContainerTitle = mainContainerTitle;

    this.moreNewsButton.addEventListener('click', () => {
      this.addCards(this.cards);
    });
  }
  renderNews(keyword) {
    event.preventDefault();
    if (searchComponent.validate() === false) {
      return false;
    }
    apiComponent.getNews(keyword, this.notFoundBlock, this.preloaderBlock, this.mainContainer)
      .then(newsList => {
        this.clear();

        this.mainContainerTitle.setAttribute('style', 'display: flex'); // заголовок блока
        this.resultError.setAttribute('style', 'display: none'); // ошибка при запросе
        this.preloaderBlock.setAttribute('style', 'display: none'); // progress bar closed

        sessionStorage.setItem('request', JSON.stringify(newsList)); // отправляем полученное в хранилище
        sessionStorage.setItem('keyword', keyword);

        if (newsList.articles.length > 3) {
          this.moreNewsButton.setAttribute('style', 'display: block');
        } else
        this.moreNewsButton.setAttribute('style', 'display: none');
        if (newsList.totalResults != 0) {
          this.mainContainer.setAttribute('style', 'display: block');
          this.addCards(newsList.articles);
        } else
          this.notFoundBlock.setAttribute('style', 'display: block');
    }).catch(err => {
        console.log(err);
        this.mainContainerTitle.setAttribute('style', 'display: none');
        this.moreNewsButton.setAttribute('style', 'display: none');
        this.mainContainer.setAttribute('style', 'display: block');
        this.resultError.setAttribute('style', 'display: block');
        this.preloaderBlock.setAttribute('style', 'display: none');
        this.resultError.textContent = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
    });
  }
  addCards(cards) {
    this.cards = cards;
    for (let i=0; i<3; i++) {
      if (cardNumber >= cards.length) {
        this.moreNewsButton.setAttribute('style', 'display: none');
        break;
      }
      const cardComponent = new Card(cards[cardNumber].urlToImage,
        cards[cardNumber].publishedAt,
        cards[cardNumber].title,
        cards[cardNumber].description,
        cards[cardNumber].source.name,
        cards[cardNumber].url);
      this.container.appendChild(cardComponent.cardElement);
      cardNumber += 1;
      sessionStorage.setItem('cardNumber', cardNumber); // отправляем количество открытых карточек в хранилище
    }
  }
  clear() {
    this.container.innerHTML = "";
    cardNumber = 0;
  }
}
const newsListComponent = new NewsList(newsContainer, moreButton, notFoundError, progressBarBlock, newsBlock, resultError, resultTitle);


searchForm.addEventListener('submit', () => {
  newsListComponent.renderNews(searchForm.input.value);
});
