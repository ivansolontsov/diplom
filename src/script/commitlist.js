class CommitList {
  constructor(container, apiComponent, Commit, mySwiper) {
    this.container = container;
    this.apiComponent = apiComponent;
    this.mySwiper = mySwiper;
    this.Commit = Commit;

    this.renderCommits();
  }
  renderCommits() {
    const commitsLimit = 10;
    this.apiComponent.getCommits().then(commits => {
      commits.slice(0,commitsLimit).forEach(element => {
        const commitComponent = new this.Commit(element.commit.author.name,
          element.commit.author.email,
          element.commit.author.date,
          element.commit.message,
          element.author.avatar_url);
        this.container.appendChild(commitComponent.commitElement);
      });
      this.mySwiper.init();
    }).catch(err => {
      console.log(err);
    });
  }
}

export {CommitList};
