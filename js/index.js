const userTemplate = document.querySelector('.pop_template').content;
const elList = document.querySelector('.ul');

const postTemplate = document.querySelector('.about_template').content;
const elList2 = document.querySelector('.ul2');

const commentTemplate = document.querySelector('.buy_template').content;
const elList3 = document.querySelector('.ul3');


// RENDER 

async function Render() {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    elList.innerHTML = null;
    users.forEach(user => {
        const userElement = userTemplate.cloneNode(true);
        userElement.querySelector('.pop_p1').textContent = user.id;
        userElement.querySelector('.pop_heading1').textContent = user.name;
        userElement.querySelector('.pop_heading2').textContent = user.username;
        userElement.querySelector('.pop_p2').textContent = user.email;
        userElement.querySelector('.pop_btn').dataset.userId = user.id;
        elList.appendChild(userElement);
    });
}

elList.addEventListener('click', async (evt) => {
    if (evt.target.matches('.pop_btn')) {
        const userId = evt.target.dataset.userId;
        await RENDERR(userId);
    }
});

async function RENDERR(userId) {
    const posts = await fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    elList2.innerHTML = null;
    posts.forEach(about => {
        const postElement = postTemplate.cloneNode(true);
        postElement.querySelector('.about_p1').textContent = about.userId;
        postElement.querySelector('.about_h3').textContent = about.title;
        postElement.querySelector('.about_p2').textContent = about.body;
        postElement.querySelector('.about_btn').dataset.postId = about.id;
        elList2.appendChild(postElement);
    });
}

elList2.addEventListener('click', async (evt) => {
    if (evt.target.matches('.about_btn')) {
        const postId = evt.target.dataset.postId;
        await renderComments(postId);
    }
});

async function renderComments(postId) {
    const comments = await fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    elList3.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = commentTemplate.cloneNode(true);
        commentElement.querySelector('.buy_h2').textContent = comment.name;
        commentElement.querySelector('.buy_p').textContent = comment.email;
        commentElement.querySelector('.buy_pp').textContent = comment.body;
        elList3.appendChild(commentElement);
    });
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function initjon() {
    try {
        await Render();
    } catch (error) {
        console.error('ERROR:', error);
    }
}
initjon();