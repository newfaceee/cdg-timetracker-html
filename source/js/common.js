'use strict';
const navList = document.querySelector('.nav__list');

navList.addEventListener('click', (evt) => {
  const currentTarget = evt.currentTarget;
  const target = evt.target;
  if (target.classList.contains('nav__link')) {
    currentTarget
      .querySelector('.nav__link--active')
      .classList.remove('nav__link--active');

    target.classList.add('nav__link--active');
  }
});
