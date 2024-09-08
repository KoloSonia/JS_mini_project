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
const userId = params.id;
let btn=document.createElement('button');
btn.textContent='Post of current user';
btn.className='button-placeholder';

function DellChild(elem){
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

async function getData() {
    let user = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            displayUserDetails(user);
        });
}

function displayUserDetails(user) {
    const userDetailsDiv = document.getElementsByClassName('user-details');

    userDetailsDiv[0].innerHTML = `
        <h2>${user.id} ${user.name} (${user.username})</h2>
        <div>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        </div>
        
        <div class="address">
            <h3>Address</h3>
            <p>Street: ${user.address.street}</p>
            <p>Suite: ${user.address.suite}</p>
            <p>City: ${user.address.city}</p>
            <p>Zipcode: ${user.address.zipcode}</p>
            <p>Geo: Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}</p>
        </div>
        
        <div class="company">
            <h3>Company</h3>
            <p>Name: ${user.company.name}</p>
            <p>Catchphrase: ${user.company.catchPhrase}</p>
            <p>BS: ${user.company.bs}</p>
        </div>
    `;
    userDetailsDiv[0].appendChild(btn);

}

async function getTitlePosts() {
    const postsContainer = document.querySelector('.user-posts');
    if(!postsContainer.firstChild) {
        let posts = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');

                    postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <a href="post-details.html?id=${post.id}" class="read-more">Read more</a>
                `;

                    console.log(post.title);

                    postsContainer.appendChild(postElement);
                });
                document.getElementById('nameP').style.display='block';
                window.scrollTo(0, document.body.scrollHeight);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }
}

console.log(btn);
btn.onclick = function () {
    getTitlePosts();

}


if (userId) {
    getData();
} else {
    document.getElementsByClassName('user-details')[0].textContent = 'No user ID.';
}

