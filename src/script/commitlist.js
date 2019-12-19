import {Commit} from './commit.js'
import {Api} from './api.js';
import {mySwiper} from './swiper.js';

const apiComponent = new Api();

class CommitList {
  constructor(container) {
    this.container = container;
    this.renderCommits();
  }
  renderCommits() {
    apiComponent.getCommits().then(commits => {
      commits.slice(0,10).forEach(element => {
        const commitComponent = new Commit(element.commit.author.name,
          element.commit.author.email,
          element.commit.author.date,
          element.commit.message,
          element.author.avatar_url);
        this.container.appendChild(commitComponent.commitElement);
      });
      mySwiper.init();
    }).catch(err => {
      console.log(err);
    });
  }
}

export {CommitList};
