const searchForm = document.forms.search; // форма поиска
const newsContainer = document.querySelector('.result__cards-wrapper'); // контейнер для новостей
const progressBarBlock = document.querySelector('.result__progress'); // progress bar
const newsBlock = document.querySelector('.result__news'); // news section
const notFoundError = document.querySelector('.result__not-found'); // not found block
const moreButton = document.querySelector('.result__button');
const formError = document.querySelector('.form__error');
const resultTitle = document.querySelector('.result__news-title-wrapper');
const resultError = document.querySelector('.result__error');

import {NewsList} from './newslist.js';
const newsListComponent = new NewsList(newsContainer, moreButton, notFoundError, progressBarBlock, newsBlock, resultError, resultTitle);


searchForm.addEventListener('submit', () => {
  newsListComponent.renderNews(searchForm.input.value);
});
