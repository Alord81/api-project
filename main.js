let showUser = document.getElementById('show-user'),
    showUserButton = document.querySelector('#show-user button'),
    theUser = document.querySelector('.the-user');

createPost(1)

showLastUsers()


function coloring() {
    let getUsers = document.querySelectorAll('[data-user-id]')
    getUsers.forEach((element) => {
        let dataUserId = element.getAttribute('data-user-id')

        if (dataUserId % 2 === 0) {
            getUsers[dataUserId - 1].style.cssText = "background-color: #2b2b2b"
        } else {
            getUsers[dataUserId - 1].style.cssText = "background-color: #2d2d39"
        }

    })
}

function showLastUsers() {
    if (showUserButton.classList.item(0) !== 'show-user') {
        theUser.innerHTML = ''

    } else {
        fetch('https://jsonplaceholder.typicode.com/users').then(
            (resolve) => resolve.json()
        ).then(
            (users) => {
                theUser.innerHTM = ''
                for (let i = 0; i < users.length; i++) {
                    let user = `
                        <div class="user" data-user-id="${i + 1}">
                            <h3>${users[i]["name"]}</h3>
                            <p>${users[i]["email"]}</p>
                        </div>
                    `
                    theUser.innerHTML += user;
                }
                let user = document.querySelectorAll('.user')
                user.forEach((e) => {
                    e.addEventListener('click', function showUserPosts() {
                        user.forEach((e) => {
                            e.classList.remove('this-user')
                        })
                        this.classList.add('this-user')
                        createPost(+this.getAttribute('data-user-id'))
                    })
                })
                coloring()
            }
        )

    }
}

showUser.addEventListener('click', () => {
    showUserButton.classList.toggle('show-user')
    showLastUsers()
})

function createPost(userPosts) {

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userPosts}`).then(
        (posts) => posts.json()
    ).then(
        (posts) => {
            let allPosts = [...posts]
            let getPostsCont = document.querySelector('.posts-container section .the-posts')
            getPostsCont.innerHTML = ''
            allPosts.forEach((post) => {
                if (+post["userId"] === userPosts) {
                    let createpost = `
                        <div class="post">
                            <h3>${post["title"]}</h3>
                            <hr>
                            <div class="text-p">
                            <p>
                            ${post["body"]}
                            </p>
                            </div>
                        </div>
                    `;
                    getPostsCont.innerHTML += createpost
                }
            })
        }
    )
}