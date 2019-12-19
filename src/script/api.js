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
  getCommits() {
    return fetch(`https://api.github.com/repos/ivansolontsov/diplom/commits`)
    .then(result => {
      return this.getResponseData(result);
    });
  }
  getNews(keyword, notFoundBlock, preloaderBlock, mainContainer) {
    // time calculate
    let todayDate = new Date();
    let sevenDaysAgoDate = new Date();
    sevenDaysAgoDate.setDate(todayDate.getDate() - 6);
    const timeFrom = `${sevenDaysAgoDate.getFullYear()}-${sevenDaysAgoDate.getMonth() + 1}-${sevenDaysAgoDate.getDate()}`;
    const timeTo = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
    // time calculate is over

    notFoundBlock.setAttribute('style', 'display: none');
    mainContainer.setAttribute('style', 'display: none');
    preloaderBlock.setAttribute('style', 'display: block'); // progress bar open

    return fetch(`https://newsapi.org/v2/everything?q=${keyword}&from=${timeFrom}&to=${timeTo}&pageSize=100&language=ru&sortBy=popularity&${this.token}`, {
      headers: {
        authorization: this.token
      }
    }).then(res => {
        return this.getResponseData(res);
      })
  }
}

export {Api};
