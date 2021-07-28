const deletePostHandler = async (event) => {
  event.preventDefault();
  const postId = event.target.dataset.postid;
  const response = await fetch(`/dashboard/${postId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    document.location.reload();
  }
}

const editPostHandler = async (event) => {
  event.preventDefault();
  const postId = event.target.dataset.postid;
  document.location.replace(`/dashboard/${postId}`);
}

const deleteBtns = document.querySelectorAll('.deletepostbtn');
deleteBtns.forEach(btn => {
  btn.addEventListener('click', deletePostHandler);
})

const editBtns = document.querySelectorAll('.editpostbtn');
editBtns.forEach(btn => {
  btn.addEventListener('click', editPostHandler);
})