class Commit {
  constructor(name, email, date, text, avatar) {
    this.name = name;
    this.email = email;
    this.date = date;
    this.text = text;
    this.avatar = avatar;

    let formatDate = new Date(this.date);
    const options = {
      month: 'long',
      day: 'numeric'
    };
    formatDate = formatDate.toLocaleString("ru", options);
    this.formatDate = formatDate;
    this.commitElement = this.createCommit();
  }
  createCommit() {
    const commit =  document.createElement('div')
    commit.classList.add('swiper-slide');
    commit.insertAdjacentHTML('afterbegin', `
      <div class="git__commit">
      <time datetime="${this.date}" class="git__commit-date">${this.formatDate}</time>
        <div class="git__commit-info">
          <img src="${this.avatar}" alt="${this.name}" class="git__author-avatar">
          <div class="git__author-name-wrapper">
          <h3 class="git__author-name">${this.name}</h3>
          <a href="mailto:${this.email}" class="git__author-email">${this.email}</a>
        </div>
      </div>
      <p class="git__commit-text">${this.text}</p>
      </div>
    `);
    return commit;
  }
}


export {Commit};
