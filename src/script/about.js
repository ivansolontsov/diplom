import {CommitList} from './commitlist.js';
import {Commit} from './commit.js'
import {Api} from './api.js';
import {mySwiper} from './swiper.js';

const sliderContainer = document.querySelector('.swiper-wrapper');

const apiComponent = new Api();
const commitListComponent = new CommitList(sliderContainer, apiComponent, Commit, mySwiper);


