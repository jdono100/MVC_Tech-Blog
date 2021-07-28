const deletePostHandler = async (event) => {
  event.preventDefault();
  const postId = (event.target.dataset.postid);
  const response = await fetch(`/dashboard/${postId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    document.location.reload();
  }
}

const deleteBtns = document.querySelectorAll('.deletepostbtn');
deleteBtns.forEach((btn) => {
  btn.addEventListener('click', deletePostHandler);
})