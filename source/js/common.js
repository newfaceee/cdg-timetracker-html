'use strict';
const mainNavList = document.querySelector('.nav');
const activeLink = 'nav__link--active';

mainNavList.addEventListener('click', (evt) => {
  const currentTarget = evt.currentTarget;
  const target = evt.target;
  if (target.classList.contains('nav__link')) {
    currentTarget.querySelector(`.${activeLink}`).classList.remove(activeLink);

    target.classList.add(activeLink);
  }
});
