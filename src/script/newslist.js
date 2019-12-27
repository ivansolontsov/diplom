let cardNumber = 0;
class NewsList {
    constructor(config) {
    this.container = config.newsContainer;
    this.moreNewsButton = config.moreNewsButton;
    this.notFoundBlock = config.notFoundBlock;
    this.preloaderBlock = config.preloaderBlock;
    this.mainContainer = config.mainContainer;
    this.resultError = config.resultError;
    this.mainContainerTitle = config.mainContainerTitle;
    this.searchButton = config.searchButton;
    this.searchForm = config.searchForm;

    this.apiComponent = config.apiComponent;
    this.searchComponent = config.searchComponent;
    this.Card = config.Card;

    const articlesPerColumn = 3;
    this.articlesPerColumn = articlesPerColumn;
    this.moreNewsButton.addEventListener('click', () => {
      this.addCards(this.cards, articlesPerColumn);
    });
  }
  renderNews(keyword) {
    if (this.searchComponent.validate() === false) {
      return false;
    }
    this.apiComponent.getNews(keyword, this.notFoundBlock, this.preloaderBlock, this.mainContainer, this.searchButton, this.searchForm)
      .then(newsList => {
        this.clear();

        this.searchForm.input.disabled = false;
        this.mainContainerTitle.setAttribute('style', 'display: flex'); // заголовок блока
        this.resultError.setAttribute('style', 'display: none'); // ошибка при запросе
        this.preloaderBlock.setAttribute('style', 'display: none'); // progress bar closed
        this.searchButton.disabled = false;

        localStorage.setItem('request', JSON.stringify(newsList)); // отправляем полученное в хранилище
        localStorage.setItem('keyword', keyword);

        if (newsList.articles.length > this.articlesPerColumn) {
          this.moreNewsButton.setAttribute('style', 'display: block');
        } else
        this.moreNewsButton.setAttribute('style', 'display: none');
        if (newsList.totalResults != 0) {
          this.mainContainer.setAttribute('style', 'display: block');
          this.addCards(newsList.articles, this.articlesPerColumn);
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
      const cardComponent = new this.Card(cards[cardNumber].urlToImage,
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
