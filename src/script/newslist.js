import {Search} from './search.js';
import {Api} from './api.js';
import {Card} from './card.js';


const formError = document.querySelector('.form__error');
const searchForm = document.forms.search; // форма поиска

const searchComponent = new Search(searchForm, formError);
const apiComponent = new Api('2c22949ae7344b648fca6988958eda43');

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


export {NewsList};
