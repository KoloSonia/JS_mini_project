function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    return params;
}

const params = getQueryParams();
const postId = params.id;

const postDetailsContainer = document.querySelector('.post-details');

async function getPostById() {
    let post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.textContent = post.title;
            displayPostDetails(post);
            getComments();
        });
}

function displayPostDetails(post) {
    postDetailsContainer.innerHTML = `
            <h2>${post.id} <span>${post.title}</span></h2>
            <p>Author ID: ${post.userId}</p>
            <p id="bodyPost">${post.body}</p>
            <h3>Comments:</h3>
            <div class="comments-container"></div>
        `;
}

function getComments() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.querySelector('.comments-container');
            commentsContainer.innerHTML = '';

            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');

                commentElement.innerHTML = `
                        <p id="nameCom">${comment.name}</p>
                        <p>${comment.body}</p>
                        <p id="emailCom">${comment.email}</p>
                    `;

                commentsContainer.appendChild(commentElement);
            });
        });
}


if (postId) {
    getPostById();
} else {
    document.getElementsByClassName('post-details')[0].textContent = 'No post ID.';
}