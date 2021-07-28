const postHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#new-post-title').value.trim();
  const post_text = document.querySelector('#newpostcontent').value.trim();
  const response = await fetch('/api/posts', 
    {
      method: 'POST',
      body: JSON.stringify({ title, post_text }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace('/login');
    }
};

document.querySelector('#submitnewpostbtn')
  .addEventListener('click', postHandler);