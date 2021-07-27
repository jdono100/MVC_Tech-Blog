const signUpRadio = document.querySelector('#signupradio');
const logInRadio = document.querySelector('#loginradio');
const signUpSection = document.querySelector('.signupsection');
const logInSection = document.querySelector('.loginsection');

const init = () => {
  signUpRadio.addEventListener('click', () => {
    logInSection.style.display = 'none';
    signUpSection.style.display = 'block';
  });
  logInRadio.addEventListener('click', () => {
    signUpSection.style.display = 'none';
    logInSection.style.display = 'block';
  });
};

const loginHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#pw-login').value.trim();
  const response = await fetch('/api/users/login', 
    {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: { 'Content-Type': 'application/json' }
    });
  if (response.ok) {
    document.location.replace('/dashboard');
    console.log(response);
  } else {
    alert(response.statusText);
  }
};

const signupHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const github = document.querySelector('#github-signup').value.trim();
  const password = document.querySelector('#pw-signup').value.trim();
  const confirmPw = document.querySelector('#confirmpw-signup').value.trim();
  if (password !== confirmPw) {
    alert('Passwords do not match');
    return;
  } else {
    const response = await fetch('/api/users', 
      {
        method: 'POST',
        body: JSON.stringify({ email, username, github, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        document.location.replace('/');
        console.log(response);
      } else {
        alert(response.statusText);
      }
  }
};

document.querySelector('#submitlogin').addEventListener('click', loginHandler);
document.querySelector('#submitsignup').addEventListener('click', signupHandler);
init();