const editPostHandler = async (event) => {
  event.preventDefault();
  const postId = event.target.dataset.postid;
  const title = document.querySelector('#editposttitle').value.trim();
  const post_text = document.querySelector('#editpostcontent').value.trim();
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, post_text }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    document.location.replace(`/post/${postId}`)
  }
}

const editPostBtn = document.getElementById("submiteditpostbtn");
editPostBtn.addEventListener('click', editPostHandler);