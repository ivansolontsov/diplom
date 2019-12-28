const requestStorage = localStorage.getItem('request');
const request = JSON.parse(requestStorage);
const keywordStorage = localStorage.getItem('keyword');
const youAsked = document.querySelector('.request__title');
const totalResult = document.querySelector('#totalResult');
const titleMatch = document.querySelector('#titleMatch');
const actualMonthContainer = document.querySelector('#actualMonth');
const analyticsLines = document.querySelectorAll('.analytics__inner-line-text');
const analyticsLineDates = document.querySelectorAll('.analytics__line-date');

import {Analytics} from './analytics.js';

const paperComponent = new Analytics(keywordStorage, request, youAsked, totalResult, titleMatch, actualMonthContainer, analyticsLines, analyticsLineDates);





