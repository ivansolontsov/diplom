import {mySwiper} from './swiper.js';

const searchForm = document.forms.search; // форма поиска
const newsContainer = document.querySelector('.result__cards-wrapper'); // контейнер для новостей
const progressBarBlock = document.querySelector('.result__progress'); // progress bar
const newsBlock = document.querySelector('.result__news'); // news section
const notFoundError = document.querySelector('.result__not-found'); // not found block

class Api {
  constructor(token) {
    this.token = token;
  }
  getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getNews(keyword) {
    // time calculate
    let todayDate = new Date();
    let sevenDaysAgoDate = new Date();
    sevenDaysAgoDate.setDate(todayDate.getDate() - 7);
    const timeFrom = sevenDaysAgoDate.toISOString().substr(0, 10);
    // time calculate is over
    notFoundError.setAttribute('style', 'display: none');
    newsBlock.setAttribute('style', 'display: none');
    progressBarBlock.setAttribute('style', 'display: block'); // progress bar open
    return fetch(`https://newsapi.org/v2/everything?q=${keyword}&from=${timeFrom}&language=ru&sortBy=popularity&${this.token}`, {
      headers: {
        authorization: this.token
      }
    }).then(res => {
        progressBarBlock.setAttribute('style', 'display: none'); // progress bar closed
        return this.getResponseData(res);
      })
  }
}

const apiComponent = new Api('b98f0b05943743088416673fe1794cd7');


class Card {
  constructor (image, date, title, text, source, url) {
    this.image = image;
    this.date = date;
    this.title = title;
    this.text = text;
    this.source = source;
    this.url = url;
  }
}

class NewsList {
  constructor(newsContainer) {
    this.container = newsContainer;
  }
  renderNews(keyword) {
    event.preventDefault();
    apiComponent.getNews(keyword)
      .then(newsList => {
        console.log(newsList.totalResults);
        if (newsList.totalResults != 0) {
          newsBlock.setAttribute('style', 'display: block');
          console.log(newsList);
          console.log(newsList.articles);
          // здесь будет вызов функции создающей карточку на странице.
        } else
          notFoundError.setAttribute('style', 'display: block');
    }).catch(err => {
      console.log(err);
    });
  }
}

const newsListComponent = new NewsList(newsContainer);


searchForm.addEventListener('submit', () => {
  newsListComponent.renderNews(searchForm.input.value);
});
