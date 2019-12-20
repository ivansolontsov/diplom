const searchForm = document.querySelector('.search__form');
const newsContainer = document.querySelector('.result__cards-wrapper'); // контейнер для новостей
const progressBarBlock = document.querySelector('.result__progress'); // progress bar
const newsBlock = document.querySelector('.result__news'); // news section
const notFoundError = document.querySelector('.result__not-found'); // not found block
const moreButton = document.querySelector('.result__button');
const resultTitle = document.querySelector('.result__news-title-wrapper');
const resultError = document.querySelector('.result__error');
const searchButton = document.querySelector('.search__button');
const requestStorage = localStorage.getItem('request');
const keywordStorage = localStorage.getItem('keyword');
const cardNumberStorage = localStorage.getItem('cardNumber');
const request = JSON.parse(requestStorage);


import {NewsList} from './newslist.js';

const newsListComponent = new NewsList(newsContainer, moreButton, notFoundError, progressBarBlock, newsBlock, resultError, resultTitle, searchButton, searchForm);



newsListComponent.checkData(request, keywordStorage, cardNumberStorage, searchForm);

searchForm.addEventListener('submit', () => {
  event.preventDefault();
  newsListComponent.renderNews(searchForm.input.value);
});
