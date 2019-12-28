class Analytics {
  constructor(keyword, request, youAskedContainer, totalResultContainer, titleMatchContainer, monthContainer, analyticsLines, analyticsLineDates) {
    this.keyword = keyword;
    this.request = request;
    this.analyticsLines = analyticsLines;
    this.analyticsLineDates = analyticsLineDates;

    youAskedContainer.textContent = `Вы спросили: «${this.keyword}»`;
    totalResultContainer.textContent = this.request.totalResults;
    titleMatchContainer.textContent = this.matchInTitle(this.keyword);

    // выставляем месяц в таблицу
    let actualMonth = new Date();
    const monthOptions = {
      month: 'long'
    };
    actualMonth = actualMonth.toLocaleString("ru", monthOptions);
    monthContainer.textContent = `ДАТА ${actualMonth}`;

    this.analyticsByDays(this.keyword);
  }
  matchInTitle(keyword) {
    let amountOfTitleMatches = 0;
    const regex = new RegExp(keyword, 'gim');
    this.request.articles.forEach(element => {
      if(element.title.match(regex)) {
        amountOfTitleMatches += 1;
      }
    });
    return amountOfTitleMatches;
  }
  analyticsByDays(keyword) {
    const analyticsTable = new Object(); // объект для собирания в него аналмтики по каждой дате1
    const regex = new RegExp(keyword, 'gim'); // шаблон по ключевому слову

    const objectDates = new Date();
    const daysInWeek = 7;
    for (let index = 0; index < daysInWeek; index++) { // добавляем в объект даты за последние 7 дней, по формату совпадающие с датами из полученных данных
      analyticsTable[`${objectDates.getFullYear()}-${objectDates.getMonth() + 1}-${objectDates.getDate()}`] = 0;
      objectDates.setDate(objectDates.getDate() - 1);
    }

    this.request.articles.forEach(element => { // проверяем каждый заголовок и каждый текст на наличие совпадений
      let articleDate = new Date(element.publishedAt);
      articleDate = `${articleDate.getFullYear()}-${articleDate.getMonth() + 1}-${articleDate.getDate()}`; // форматируем дату, чтобы потом проще делать сравнения.

      if(element.description === null || element.title === null) {
        return false;
      }

      if(element.title.match(regex)) { // если есть совпадение, записываем его в переменную, заносим в таблицу длину массива с совпадениями
        const titleMatches = element.title.match(regex);
        if(titleMatches != null) {
          analyticsTable[articleDate] += titleMatches.length;
        }
      }
      if(element.description.match(regex)) {
        const descriptionMatches = element.description.match(regex);
        if(descriptionMatches != null) {
          analyticsTable[articleDate] += descriptionMatches.length;
        }
      }
    });

    const days = new Date(); // дата для левого столбца в формате чт, 19
    const daysOptions = {
      day: 'numeric',
      weekday: 'short'
    };

    this.analyticsLines.forEach((element, index) => {
      this.analyticsLineDates[index].textContent = days.toLocaleString("ru", daysOptions); // проставляем даты прошедшей недели, до сегодняшнего дня(включительно)

      element.closest('.analytics__inner-line').setAttribute(`style`, `width: ${analyticsTable[`${days.getFullYear()}-${days.getMonth() + 1}-${days.getDate()}`]}%`);
      if(analyticsTable[`${days.getFullYear()}-${days.getMonth() + 1}-${days.getDate()}`] === 0) { // вместо ноликов будет пусто :)
        analyticsTable[`${days.getFullYear()}-${days.getMonth() + 1}-${days.getDate()}`] = '';
      }
      element.closest('.analytics__inner-line-text').textContent = analyticsTable[`${days.getFullYear()}-${days.getMonth() + 1}-${days.getDate()}`];
      days.setDate(days.getDate() - 1); // ВЫСЧИТЫВАЕМ ПОСЛЕДНИЕ 7 ДНЕЙ
    });
  }
}

export {Analytics};
