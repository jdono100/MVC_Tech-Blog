const addCommentHandler = async (event) => {
  event.preventDefault();
  const post_id = event.target.dataset.postid;
  const comment_text = document.querySelector('.commentpost').value.trim();
  const response = await fetch('../api/comments', {
    method: 'POST',
    body: JSON.stringify({ post_id, comment_text }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    document.location.reload();
  } else {
    // document.location.replace('/login');
    console.log('bad');
  }
}

document.querySelector('#submitcommentbtn').addEventListener('click', addCommentHandler);