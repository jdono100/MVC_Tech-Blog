const navBurgerBtn = document.querySelector('#navburgerbtn');
const navBurgerMenu = document.querySelector('#nav-burger-menu');

navBurgerBtn.addEventListener('click', () => {
  navBurgerBtn.classList.toggle('is-active');
  navBurgerMenu.classList.toggle('is-active');
})