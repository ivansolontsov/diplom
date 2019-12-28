const searchForm = document.querySelector('.search__form');
const formError = document.querySelector('.form__error');
const requestStorage = localStorage.getItem('request');
const keywordStorage = localStorage.getItem('keyword');
const cardNumberStorage = localStorage.getItem('cardNumber');
const request = JSON.parse(requestStorage);


import {NewsList} from './newslist.js';
import {Search} from './search.js';
import {Api} from './api.js';
import {Card} from './card.js';

const searchComponent = new Search(searchForm, formError);
const apiComponent = new Api('2c22949ae7344b648fca6988958eda43');

const newsListComponent = new NewsList({
  newsContainer: document.querySelector('.result__cards-wrapper'),
  moreNewsButton: document.querySelector('.result__button'),
  notFoundBlock: document.querySelector('.result__not-found'),
  preloaderBlock: document.querySelector('.result__progress'),
  mainContainer: document.querySelector('.result__news'),
  resultError: document.querySelector('.result__error'),
  mainContainerTitle: document.querySelector('.result__news-title-wrapper'),
  searchButton: document.querySelector('.search__button'),
  searchForm: document.querySelector('.search__form'),
  apiComponent: apiComponent,
  searchComponent: searchComponent,
  Card: Card
});
newsListComponent.checkData(request, keywordStorage, cardNumberStorage, searchForm);

searchForm.addEventListener('submit', () => {
  event.preventDefault();
  newsListComponent.renderNews(searchForm.input.value);
});
