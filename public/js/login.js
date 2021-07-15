const loginHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const pw = document.querySelector('#pw-login').value.trim();
  const response = await fetch('/api/users/login', 
    {
      method: 'POST',
      body: JSON.stringify({email, pw}),
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
  const pw = document.querySelector('#pw-signup').value.trim();
  const github = document.querySelector('#github-signup').value.trim();
  const response = await fetch('/api/users', 
    {
      method: 'POST',
      body: JSON.stringify({email, username, github, pw}),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      document.location.replace('/');
      console.log(response);
    } else {
      alert(response.statusText);
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEventListener('submit', signupHandler);