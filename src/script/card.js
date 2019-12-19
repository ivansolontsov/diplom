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

export {Card};
