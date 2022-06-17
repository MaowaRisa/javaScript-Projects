const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


async function getUser(username){
    const resp = await fetch(APIURL + username);
    const resData = await resp.json();
    console.log(resData);

    createUserCard(resData);
    getRepos(username)
}
async function getRepos(username){
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);
}
function createUserCard(user){
    main.innerHTML = "";
    const card = document.createElement("div");
    card.classList.add("card");
    const {name, avatar_url, bio, followers, following, public_repos} = user;

    card.innerHTML = `
        <div>
            <img class="avatar"
             src="${avatar_url}" alt="${name}"/>
        </div>
        <div class="user-info">
            <h2>${name}</h2>
            <p>${bio}</p>

            <ul class="info">
                <li>${followers}<strong>Followers</strong></li>
                <li>${following}<strong>Following</strong></li>
                <li>${public_repos}<strong>Repos</strong></li>
            </ul>
            <h3>Repos:</h3>
            <div id="repos"></div>
        </div>
    `;
    main.appendChild(card);
}
function addReposToCard(repos){
    const reposEl = document.getElementById("repos");
    repos.forEach(repo =>{
        const {html_url, name} = repo;
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href= html_url;
        repoEl.target = '_blank';
        repoEl.innerText = name;
        reposEl.appendChild(repoEl)
    });
}
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const user = search.value;
    if(user){
        getUser(user);
        search.value = '';
    }
});

