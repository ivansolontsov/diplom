import {Search} from './search.js';
import {Api} from './api.js';
import {Card} from './card.js';


const formError = document.querySelector('.form__error');
const searchForm = document.querySelector('.search__form'); // форма поиска


const searchComponent = new Search(searchForm, formError);
const apiComponent = new Api('2c22949ae7344b648fca6988958eda43');

let cardNumber = 0;
class NewsList {
  constructor(newsContainer, moreNewsButton, notFoundBlock, preloaderBlock, mainContainer, resultError, mainContainerTitle, searchButton, searchForm) {
    this.container = newsContainer;
    this.moreNewsButton = moreNewsButton;
    this.notFoundBlock = notFoundBlock;
    this.preloaderBlock = preloaderBlock;
    this.mainContainer = mainContainer;
    this.resultError = resultError;
    this.mainContainerTitle = mainContainerTitle;
    this.searchButton = searchButton;
    this.searchForm = searchForm;

    this.moreNewsButton.addEventListener('click', () => {
      this.addCards(this.cards, 3);
    });
  }
  renderNews(keyword) {
    if (searchComponent.validate() === false) {
      return false;
    }
    apiComponent.getNews(keyword, this.notFoundBlock, this.preloaderBlock, this.mainContainer, this.searchButton, this.searchForm)
      .then(newsList => {
        this.clear();

        const articlesPerColumn = 3;

        this.searchForm.input.disabled = false;
        this.mainContainerTitle.setAttribute('style', 'display: flex'); // заголовок блока
        this.resultError.setAttribute('style', 'display: none'); // ошибка при запросе
        this.preloaderBlock.setAttribute('style', 'display: none'); // progress bar closed
        this.searchButton.disabled = false;

        localStorage.setItem('request', JSON.stringify(newsList)); // отправляем полученное в хранилище
        localStorage.setItem('keyword', keyword);

        if (newsList.articles.length > articlesPerColumn) {
          this.moreNewsButton.setAttribute('style', 'display: block');
        } else
        this.moreNewsButton.setAttribute('style', 'display: none');
        if (newsList.totalResults != 0) {
          this.mainContainer.setAttribute('style', 'display: block');
          this.addCards(newsList.articles, articlesPerColumn);
        } else
          this.notFoundBlock.setAttribute('style', 'display: block');
    }).catch(err => {
        console.log(err);
        this.clear();
        this.searchForm.input.disabled = false;
        this.searchButton.disabled = false;
        this.mainContainerTitle.setAttribute('style', 'display: none');
        this.moreNewsButton.setAttribute('style', 'display: none');
        this.mainContainer.setAttribute('style', 'display: block');
        this.preloaderBlock.setAttribute('style', 'display: none');
        this.container.insertAdjacentHTML('afterbegin', '<p class="result__error" style="display: block">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>');
    });
  }
  addCards(cards, amountOfCards) {
    this.cards = cards;
    for (let i=0; i<amountOfCards; i++) {
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
      localStorage.setItem('cardNumber', cardNumber); // отправляем количество открытых карточек в хранилище
    }
  }
  checkData(requestStorage, keywordStorage, cardNumberStorage, searchForm) {
    if(keywordStorage != null && requestStorage.totalResults != 0) {
      this.mainContainer.setAttribute('style', 'display: block');
      this.addCards(requestStorage.articles, cardNumberStorage);
      searchForm.input.value = keywordStorage;
      if(cardNumberStorage >= requestStorage.articles.length) {
        this.moreNewsButton.setAttribute('style', 'display: none');
      }
    }
  }
  clear() {
    this.container.innerHTML = '';
    cardNumber = 0;
  }
}


export {NewsList};
