const firebaseConfig = {
    apiKey: "AIzaSyB_nTs0o-9-63YDgjR31GLuFUU27RO-KjU",
    authDomain: "leverx-554f0.firebaseapp.com",
    projectId: "leverx-554f0",
    storageBucket: "leverx-554f0.appspot.com",
    messagingSenderId: "680924284770",
    appId: "1:680924284770:web:4e9c88a03e9fc58a6d0e3b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const ref = firebase.storage().ref('Images');
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

class BaseClass { // creating DOM elements class
    element;
    constructor(tag, styles) {
        this.element = document.createElement(tag);
        if (styles) this.element.classList.add(...styles);
    }
    addAttributes(elem, attr) {
        if (attr.id) elem.id = attr.id;
        if (attr.href) elem.href = attr.href;
        if (attr.src) elem.src = attr.src;
        if (attr.innerText) elem.innerText = attr.innerText;
        if (attr.type) elem.type = attr.type;
        if (attr.alt) elem.alt = attr.alt;
    }

    removeItems(arrayOfElements) {
        arrayOfElements.forEach(elem => {
            if (elem) elem.remove();
        })
    }
}

// массивы с текстами статей и именами тэгов
let baseOfTags = ['Angular', 'SAP ABAP', 'Java', 'SAP TM Consultant', 'Design', 'Frontend', 'Programmer', 'Python', 'DevOps']
let baseOfTags2 = ['UX/UI Design', 'Product Development', 'Web Disign', 'SAP TM Consultant'];
let baseOfArticles = [{
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    },
    {
        head: 'How to RxJS in Angular',
        text: 'As the values of your component inputs change over time, you may want to do something with that data inside your component.',
        image: 'images/article_prev1.png'
    },
    {
        head: 'Top 15 Features of Angular ',
        text: 'It has added the information for the dependency and also regarding the ng-content selections for the data.',
        image: 'images/article_prev2.png'
    },
    {
        head: 'Angular team streamlines feature requests',
        text: 'Feature requests will be reviewed for alignment with existing projects on the Angular roadmap.',
        image: 'images/article_prev3.png'
    },
    {
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    },
    {
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    },
    {
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    },
    {
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    },
    {
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    },
    {
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    },
    {
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    },
    {
        head: 'High quality',
        text: 'Straightforward APIs with consistent cross platform behaviour..',
        image: 'images/article_prev0.png'
    }
];

(function checkPage() { // проверка локации
    const location = window.location.href;
    if (location.includes('index.html')) {
        console.log('index loc')
        checkAuthState('index.html'); // проверка логина
    } else if (location.includes('creating_page.html')) {
        console.log('create loc')
        checkAuthState('creating_page.html');
    } else if (location.includes('article_page.html')) {
        console.log('article loc')
        checkAuthState('article_page.html');
    } else if (location.includes('autorization.html')) {
        console.log('autoriz loc')
        checkAuthState('autorization.html');
        console.log('this is check  ');
    }
}());

//------------------Главнаяя страница--------------------------

function tagsCreating(arrayOfTags) { // создние тэгов статей
    for (let i = 0; i < arrayOfTags.length; i++) {
        const newElement = new BaseClass('div', ['article_tags']);
        if (arrayOfTags.length > 9) {
            newElement.element.classList.add('article_tags_add');
        }
        newElement.addAttributes(newElement.element, {
            innerText: `${arrayOfTags[i]}`
        })
        const parentDiv = document.querySelector('.article_tags_list');
        parentDiv.append(newElement.element);
    }
}

function articlesCreating() { // создание превью статей
    document.querySelector('#search').addEventListener('click', search())
    db.collection("articles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
                        createArticle({
                            img: doc.data().img,
                            title: doc.data().title,
                            subTitles: doc.data().subtitles,
                            contents: doc.data().contents,
                            preview: doc.data().preview,
                            tags: doc.data().tags,
                        }, doc.id)
                    }
        );
    });
}

function tagsListeners(baseOfTags) { // навешевание листенеров на тэги
    const tagsPromise = new Promise(function (resolve) {
        resolve(
            tagsCreating(baseOfTags)
        )
    });

    tagsPromise.then(function () {
        const articleTag = document.querySelectorAll('.article_tags');
        ([...articleTag]).forEach(el => {
            el.addEventListener('click', () => {
                el.classList.toggle('article_tags_checked')
            });
        });
    })
}

//------------------страница создания статьи--------------------------

function uploadingImage() { // загрузка картинок и drag n drop
    const removeImgBtn = document.querySelector('.delete_btn');
    const fileArea = document.querySelector('.files_area');
    const AddFileBtn = document.querySelector('#files_drop');

    fileArea.ondragover = () => {
        fileArea.classList.add('hover_drag');
        return false;
    }

    fileArea.ondragleave = () => {
        fileArea.classList.remove('hover_drag');
        return false;
    }

    function imagePasting(srcEl) {

        const imgTag = new BaseClass('img');
        const file = document.querySelector('#files_drop').files[0] || srcEl[0];
        if (srcEl) {
            document.querySelector('#files_drop').files = srcEl;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            imgTag.addAttributes(imgTag.element, {
                id: 'dropped_img',
                alt: 'user image',
                src: `${event.target.result}`
            });
            fileArea.after(imgTag.element)
            fileArea.classList.add('hidden');
            removeImgBtn.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }

    fileArea.ondrop = function (e) {
        e.preventDefault();
        imagePasting(e.dataTransfer.files);
    };

    AddFileBtn.addEventListener('change', (e) => {
        e.preventDefault();
        imagePasting();
    })

    removeImgBtn.addEventListener('click', (e) => {
        fileArea.classList.remove('hidden');
        fileArea.classList.remove('hover_drag');
        document.querySelector('#dropped_img').remove();
        e.target.classList.add('hidden');
        document.querySelector('#files_drop').value = '';
    })
}

function deleteBlock() { // удаление блока создания статьи
    const buttons = document.querySelectorAll('.delete_article_btn');
    const inputsBlock = document.querySelectorAll('.creating_block');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            buttons[i].remove();
            inputsBlock[i + 1].remove();
        })
    }
}
function duplicateBlocks() { // копирование блока создания статьи
    const addBtn = document.querySelector('.new_block_btn');

    addBtn.addEventListener('click', () => {
        const inputsBlock = document.querySelectorAll(".creating_block");
        let copy = [...inputsBlock][
            [...inputsBlock].length - 1
        ].cloneNode(true);
        let delete_btn = new BaseClass('button', ['delete_article_btn']);
        delete_btn.addAttributes(delete_btn.element, {innerText: 'Delete block', type: 'button'})
        inputsBlock[[...inputsBlock].length - 1].after(copy)
        inputsBlock[[...inputsBlock].length - 1].after(delete_btn.element)
        deleteBlock();
    })
}

//----------------механизм авторизации и изменение хедера-------------------

function googleLogin() { // вход в гугл
    firebase.auth().signInWithPopup(GoogleAuthProvider).then(res => {
        console.log('successfully loggined', res.user)
    }).catch(e => {
        console.log(e)
    })
}

function userHeaderCreating(userStatus, user = null) { // хедер в зависимости от логина
    const userMenu = document.querySelector('.menu__item');
    switch (userStatus) {
        case true: { // user loggined
            document?.querySelector('#auth')?.remove();
            const logOutBtn = new BaseClass('button');
            logOutBtn.addAttributes(logOutBtn.element, {
                id: 'un_auth'
            });
            logOutBtn.element.innerText = 'Log out';
            logOutBtn.element.addEventListener('click', () => {
                googleLogOut();
            })
            const userBlock = new BaseClass('a', ['user_block']);
            const userName = new BaseClass('h6', ['avatar_user_name']);
            const img = new BaseClass('img', ['menu__item_avatar']);

            if (!window.location.href.includes('creating_page.html')) {
                const createPostBtn = new BaseClass('a', ['menu__item_post']);
                createPostBtn.addAttributes(createPostBtn.element, {
                    innerText: 'Create a post',
                    href: 'creating_page.html'
                });
                createPostBtn.addAttributes(userBlock.element, {
                    href: '##'
                });
                userMenu.append(createPostBtn.element);
            }

            userName.addAttributes(userName.element, {
                innerText: `${user.displayName}`
            });
            img.addAttributes(img.element, {
                src: `${user?.photoURL}`
            });
            userMenu.append(userBlock.element);
            userBlock.element.append(img.element);
            img.element.before(userName.element);
            userMenu.append(logOutBtn.element);
            break;
        }
        case false: { // user not loggined
            console.log('false');
            if (!window.location.href.includes('autorization.html')) {
                const logBtn = document.createElement('a');
                logBtn.id = 'auth';
                logBtn.href = 'autorization.html';
                userMenu.append(logBtn);
                logBtn.innerText = 'Sign in';
            }
            const Deleteelems = new BaseClass();
            Deleteelems.removeItems([document?.querySelector('.menu__item_post'),
                document?.querySelector('.user_block'),
                document?.querySelector('#un_auth')
            ])

        }
    }
}

function checkAuthState(page = null) { // чек логина
    firebase.auth().onAuthStateChanged(user => {
        if (user) { // если залогинен
            console.log(user)
            userHeaderCreating(true, user);
            switch (page) {
                case 'autorization.html': {
                    createAutorizePage(user);
                    break;
                }
                case 'index.html': {
                    tagsListeners(baseOfTags);
                    articlesCreating()
                    break;
                }
                case 'creating_page.html': {
                    document.querySelector('#drag_form').addEventListener('submit', (e) => {
                        uploadArticle()
                        e.preventDefault()
                    })
                    duplicateBlocks()
                    tagsListeners(baseOfTags.concat(baseOfTags2));
                    uploadingImage();
                    break;
                }
                case 'article_page.html': {
                    createArticlePage();
                }
            }
        } else {
            userHeaderCreating(false, null);
            switch (page) {
                case 'autorization.html': {
                    createAutorizePage(user);
                    break;
                }
                case 'index.html': {
                    tagsListeners(baseOfTags);
                    articlesCreating(baseOfArticles.concat(baseOfArticles));
                    break;
                }
                case 'creating_page.html': {
                    creationPageError()
                    break;
                }
                case 'article_page.html': {
                    createArticlePage();
                }
            }
        }
    })
}

function creationPageError() { 
    document.querySelector('.creating_wrapper').remove();
    document.querySelector('footer').remove();
    const mainWrapper = new BaseClass('div', ['main_wrapper']);
    const autorizeWrapper = new BaseClass('div', ['autorize_wrapper']);
    const h1 = new BaseClass('h1', ['autorize_head']);
    h1.element.innerText = 'You cannot create an article, you must log in';
    document.querySelector('main').append(mainWrapper.element);
    mainWrapper.element.append(autorizeWrapper.element);
    autorizeWrapper.element.append(h1.element);
}

function googleLogOut() {
    firebase.auth().signOut().then(() => {
        console.log('exit success');
    })
}

//------------------страница авторизации-----------------------------

function createAutorizePage(userLog) {
    const autorizeBlock = document.querySelector('.autorize_block');
    const checkWrapper = new BaseClass('div', ['check_wrapper']);

    if (userLog) {
        const Deleteelems = new BaseClass();
        Deleteelems.removeItems([document.querySelector('.autorize_head'),
            document.querySelector('.check_wrapper'),
            document.querySelector('.google_btn')
        ])
        const h1 = new BaseClass('h1', ['autorize_head']);
        h1.element.innerText = 'You seccessfully loggined! Now you can create posts';
        autorizeBlock.append(h1.element);
        console.log(true)
    } else {
        document.querySelector('.autorize_head')?.remove();
        const h1 = new BaseClass('h1', ['autorize_head']);
        const button = new BaseClass('button', ['google_btn']);
        const input = new BaseClass('input');
        input.addAttributes(input.element, {
            type: 'checkbox',
            id: 'privacy_policy'
        });
        input.element.required = true
        const label = new BaseClass('label', ['privacy_policy']);
        label.element.setAttribute('for', 'privacy_policy');
        h1.element.innerText = 'Welcome to course';
        button.element.innerText = 'Sign In with Google';
        autorizeBlock.append(h1.element);
        autorizeBlock.append(button.element);
        autorizeBlock.append(checkWrapper.element);
        console.log(checkWrapper.element)
        document.querySelector('.check_wrapper').append(input.element);
        label.element.innerText = 'You agree to our Terms of Use and Privacy Policy';
        document.querySelector('.check_wrapper').append(label.element);
        checkPrivacy(button.element);
    }
}

function checkPrivacy(googleBtn) { // проверка согласия с политикой конф.
    document.querySelector('#privacy_policy')
        .addEventListener('change', (e) => {
            if (e.target.checked) {
                googleBtn.addEventListener('click', googleLogin);
                googleBtn.classList.add('btn_active');
            } else {
                googleBtn.removeEventListener('click', googleLogin);
                googleBtn.classList.remove('btn_active');
            }
        });
}


function addToDB(imgURL, base) {
    console.log(imgURL + 'начальный юрл')
    db.collection("articles").add({
            img: imgURL,
            title: base.title,
            subTitles: base.subTitles,
            contents: base.contents,
            preview: base.preview,
            tags: base.tags,
            author: base.author
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}







function search() {

    let timeOut;
    const search = document.querySelector('#search');

    search.addEventListener('input', () => {
        if (!timeOut) {
            timeOut = setTimeout(checkDb, 800);
        } else {
            clearTimeout(timeOut)
            timeOut = setTimeout(checkDb, 800);
        }
    })


    document.querySelector('.article_tags_list').addEventListener('click', (e) => {
        checkDb();
    })

    function checkDb() {
        
        db.collection("articles").get().then((querySnapshot) => {
            const articles = document.querySelectorAll('.article_prev_block');
            const autorizeHead = document.querySelector('.autorize_head');
            if(autorizeHead) autorizeHead.remove();
            if (articles) [...articles].map((el)=> el.remove()); // clear prev results
            timeOut = null; // clear timeout if fast typing in search
            let tags = document.querySelectorAll('.article_tags_checked');
            let arr;
            let counter = 0;
            if (tags) {
                arr = [...tags].map((el) => el.innerText); //array of chosen tags
            }
            querySnapshot.forEach((doc) => {
                counter++;
                    if (arr.length !== 0) {
                        console.log()
                        if ((doc.data().title.toLowerCase().includes(search.value.toLowerCase()))
                         && doc.data().tags.some(elem => arr.some((el) => elem == el))) { // search with tags
                            createArticle({
                                img: doc.data().img,
                                title: doc.data().title,
                                subTitles: doc.data().subtitles,
                                contents: doc.data().contents,
                                preview: doc.data().preview,
                                tags: doc.data().tags,
                            }, doc.id)
                        }
                        else if((!(!(doc.data().title.toLowerCase().includes(search.value.toLowerCase())) && search.value==='' )
                         && counter==querySnapshot.docs.length
                         && !(doc.data().tags.some(elem => arr.some((el) => elem == el)))) && !document.querySelector('.article_prev_block')){ // if tag doesn't exist
                            console.log('не нашел совпадений1111  ' + doc.data().title)
                            console.log(!document.querySelector('.article_prev_block'))
                            const articleTags = document.querySelector('.articles');
                            if(! document.querySelector('.autorize_head')) { 
    
                            const h1 = new BaseClass('h1', ['autorize_head']);
                            h1.element.innerText = 'There are no results'
                            articleTags.append(h1.element)
                        }
                        }
                    } else if (search.value !== '' && (doc.data().title.toLowerCase().includes(search.value.toLowerCase()))) { // search without tags
                        createArticle({
                            img: doc.data().img,
                            title: doc.data().title,
                            subTitles: doc.data().subtitles,
                            contents: doc.data().contents,
                            preview: doc.data().preview,
                            tags: doc.data().tags,
                        }, doc.id)
                        
                    }
                   
                    else if(!(doc.data().title.toLowerCase().includes(search.value.toLowerCase())) && counter==querySnapshot.docs.length && !document.querySelector('.article_prev_block')){
                        console.log('не нашел совпадений  ' + doc.data().title)
                        const articleTags = document.querySelector('.articles');
                        if(! document.querySelector('.autorize_head')) { 

                        const h1 = new BaseClass('h1', ['autorize_head']);
                        h1.element.innerText = 'There are no results'
                        articleTags.append(h1.element)
                    }
                    }
                    else if(search.value==='' && arr.length===0){
                        if(counter<9){
                            createArticle({
                                img: doc.data().img,
                                title: doc.data().title,
                                subTitles: doc.data().subtitles,
                                contents: doc.data().contents,
                                preview: doc.data().preview,
                                tags: doc.data().tags,
                            }, doc.id)
                        }
                    }
                }
            );
        });
    }
}

function addArticleData(){
    const formData = document.querySelector('#drag_form');
    const baseOutput = {
        title: '',
        subTitles: [],
        contents: [],
        }
for (let i = 0; i < formData.elements.length; i++) {
   if(formData.elements[i].type=='text' || formData.elements[i].type == 'textarea'){
    switch (formData.elements[i].id){
        case 'creating_input1':{
            baseOutput.title = formData.elements[i].value;
            break;
        }
        case 'creating_input2':{
            baseOutput.subTitles.push(formData.elements[i].value)
           if(i==3){
               console.log(formData.elements[i].value)
               let str = formData.elements[i].value;
            baseOutput.preview = str.slice(0, 100)
           }
            break;
        }
        case 'creating_input3':{
            baseOutput.contents.push(formData.elements[i].value)
            break;
        }
    }
   }
}
baseOutput.tags = [...document.querySelectorAll('.article_tags_checked')].map((el)=>el.innerText);
baseOutput.author = document.querySelector('.avatar_user_name').innerText;
return baseOutput;
}

function uploadArticle() {
    const file = document.querySelector('#files_drop').files[0];
    const thisRef = ref.child(file.name);
    thisRef.put(file).then(res => {
        thisRef.getDownloadURL()
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    let blob = xhr.response;
                };
                xhr.open('GET', url);
                let base = addArticleData();
                addToDB(url, base)
                xhr.send();
            })
        console.log('upload success ' + thisRef)
    }).catch(e => {
        console.log(e)
    })
}

function createArticle(articlesInfo, articleId) {
    console.log(articleId)
    const articlesWrapper = document.querySelector('.articles');
    const articleTags = document.querySelector('.articles_tags');

    const div = new BaseClass('a', ['article_prev_block']),
        head = new BaseClass('h6', []),
        text = new BaseClass('p', ['article_text_style']),
        textWrap = new BaseClass('div', ['atricle_text_wrap']),
        img = new BaseClass('div', ['article_prev_img']);
    div.addAttributes(div.element, {
        href: `article_page.html##${articleId}`
    });
    img.element.style.backgroundImage = `url(${articlesInfo.img})`
    head.addAttributes(head.element, {
        innerText: `${articlesInfo.title}`
    });
    text.addAttributes(text.element, {
        innerText: `${articlesInfo.preview}`
    });
    if (!articlesWrapper) {
        const articlesWrapper = new BaseClass('div', ['articles']);
        articleTags.append(articlesWrapper.element);
        articlesWrapper.element.append(div.element);
    } else {
        articlesWrapper.append(div.element);
    }

    div.element.append(img.element);
    div.element.append(textWrap.element);
    textWrap.element.append(head.element);
    head.element.after(text.element)
}
function createArticlePage(){
    db.collection("articles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
                      if(doc.id==window.location.hash.slice(2, window.location.hash.length)){
                        document.querySelector('address').innerText = doc.data().author;
                        document.querySelector('.article_picture').src = doc.data().img;
                        const articleWrapper = document.querySelector('.article_wrapper');
                        const h3 = new BaseClass('h3')
                        h3.element.innerText = doc.data().title;
                        articleWrapper.append(h3.element)
                        for (let i = 0; i < doc.data().subTitles.length; i++) {
                           
                           const h5 = new BaseClass('h5');
                           h5.element.innerText = doc.data().subTitles[i];
                            const p = new BaseClass('p', ['article_text']);
                            p.element.innerText = doc.data().contents[i];
                           articleWrapper.append(h5.element);
                           articleWrapper.append(p.element);
                        }
                        tagsCreating(doc.data().tags) 
                      }
                     
                    }
        );
    });
}