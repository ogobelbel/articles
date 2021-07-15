
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

class CreateElement { // creating DOM elements class
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
    removeItems(arrayOfElements){
        arrayOfElements.forEach(elem=>{
            if(elem) elem.remove();
        })
    }
}

let baseOfTags = ['Angular', 'SAP ABAP', 'Java', 'SAP TM Consultant', 'Design', 'Frontend', 'Programmer', 'Python', 'DevOps']
let baseOfTags2 = ['UX/UI Design', 'Product Development', 'Web Disign', 'SAP TM Consultant'];

class Autorization{
    static googleLogin() { // google enter
        firebase.auth().signInWithPopup(GoogleAuthProvider).then(res => {
            console.log('successfully loggined', res.user)
        }).catch(e => {
            console.log(e)
        })
    }
    static googleLogOut() {
        firebase.auth().signOut()
    }

    static checkAuthState(page = null) { // login check
        firebase.auth().onAuthStateChanged(user => { // if logginned
            Header.createUserHeader (user);
                switch (page) {
                    case 'autorization.html': {
                       AutorizePage.createAutorizePage(user);
                        break;
                    }
                    case 'index.html': {
                        if (user){
                            MainPage.tagsListeners(baseOfTags);
                            MainPage.articlesCreating()
                        }
                        else{
                            MainPage.tagsListeners(baseOfTags);
                            MainPage.articlesCreating()
                        }
                        break;
                    }
                    case 'creating_page.html': {
                        
                        if(user){
                            ArticlePage.uploadArticle()
                            CreateArticle.duplicateBlocks()
                            MainPage.tagsListeners(baseOfTags.concat(baseOfTags2));
                            CreateArticle.uploadingImage();
                        }
                        else{
                            creationPageError()
                        }
                        break;
                    }
                    case 'article_page.html': {
                       ArticlePage.createArticlePage();
                    }
                }
        })
    }
}

(function checkPage() { // проверка локации
    const location = window.location.href;
    if (location.includes('index.html')) {
       Autorization.checkAuthState('index.html'); // проверка логина
    } else if (location.includes('creating_page.html')) {
        Autorization.checkAuthState('creating_page.html');
    } else if (location.includes('article_page.html')) {
        Autorization.checkAuthState('article_page.html');
    } else if (location.includes('autorization.html')) {
        Autorization.checkAuthState('autorization.html');
    }
}());
class AnyPage{
    static tagsCreating(arrayOfTags) { // создние тэгов статей
       if(!document.querySelector('.article_tags_list') || !document.querySelector('.article_prev_block')){
        for (let i = 0; i < arrayOfTags.length; i++) {
            const newElement = new CreateElement('div', ['article_tags']);
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
    }
}

class MainSearch{
    static search() {

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
                            if ((doc.data().title.toLowerCase().includes(search.value.toLowerCase()))
                             && doc.data().tags.some(elem => arr.some((el) => elem == el))) { // search with tags
                               ArticlePage.createArticle({
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
                                const articleTags = document.querySelector('.articles');
                                if(! document.querySelector('.autorize_head')) { 
        
                                const h1 = new CreateElement('h1', ['autorize_head', 'search_head']);
                                h1.element.innerText = 'There are no results'
                                articleTags.append(h1.element)
                            }
                            }
                        } else if (search.value !== '' && (doc.data().title.toLowerCase().includes(search.value.toLowerCase()))) { // search without tags
                           ArticlePage.createArticle({
                                img: doc.data().img,
                                title: doc.data().title,
                                subTitles: doc.data().subtitles,
                                contents: doc.data().contents,
                                preview: doc.data().preview,
                                tags: doc.data().tags,
                            }, doc.id)
                            
                        }
                       
                        else if(!(doc.data().title.toLowerCase().includes(search.value.toLowerCase())) && counter==querySnapshot.docs.length && !document.querySelector('.article_prev_block')){
                            const articleTags = document.querySelector('.articles');
                            if(! document.querySelector('.autorize_head')) { 
    
                            const h1 = new CreateElement('h1', ['autorize_head', 'search_head']);
                            h1.element.innerText = 'There are no results'
                            articleTags.append(h1.element)
                        }
                        }
                        else if(search.value==='' && arr.length===0){
                            if(counter<9){
                                ArticlePage.createArticle({
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
}

class MainPage extends AnyPage{
   
    
    
   static articlesCreating() { // создание превью статей
        document.querySelector('#search').addEventListener('click', MainSearch.search())
        db.collection("articles").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                ArticlePage.createArticle({
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
    static tagsListeners(baseOfTags) { // навешевание листенеров на тэги
        const tagsPromise = new Promise(function (resolve) {
            resolve(
               MainPage.tagsCreating(baseOfTags)
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
}

class CreateArticle extends AnyPage{

    static imagePasting(srcEl) {
        const removeImgBtn = document.querySelector('.delete_btn');
        const fileArea = document.querySelector('.files_area');
        const imgTag = new CreateElement('img');
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

    static uploadingImage() { // загрузка картинок и drag n drop
        const removeImgBtn = document.querySelector('.delete_btn');
        const AddFileBtn = document.querySelector('#files_drop');
     const fileArea = document.querySelector('.files_area');
        fileArea.ondragover = () => {
            fileArea.classList.add('hover_drag');
            return false;
        }
    
        fileArea.ondragleave = () => {
            fileArea.classList.remove('hover_drag');
            return false;
        }
    
        fileArea.ondrop = function (e) {
            e.preventDefault();
            CreateArticle.imagePasting(e.dataTransfer.files);
        };
    
        AddFileBtn.addEventListener('change', (e) => {
            e.preventDefault();
            CreateArticle.imagePasting();
        })
    
        removeImgBtn.addEventListener('click', (e) => {
            fileArea.classList.remove('hidden');
            fileArea.classList.remove('hover_drag');
            document.querySelector('#dropped_img').remove();
            e.target.classList.add('hidden');
            document.querySelector('#files_drop').value = '';
        })
    }
    
    static deleteBlock() { // удаление блока создания статьи
        const buttons = document.querySelectorAll('.delete_article_btn');
        const inputsBlock = document.querySelectorAll('.creating_block');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => {
                buttons[i].remove();
                inputsBlock[i + 1].remove();
            })
        }
    }
    static duplicateBlocks() { // копирование блока создания статьи
        const addBtn = document.querySelector('.new_block_btn');
    
        addBtn.addEventListener('click', () => {
            const inputsBlock = document.querySelectorAll(".creating_block");
            const NewinputBlock = new CreateElement('div', ['creating_block']);
            const inputSubtitle = new CreateElement('input');
            const inputPrev = new CreateElement('h6');
            const textPrev = new CreateElement('h6');
            inputSubtitle.addAttributes(inputSubtitle.element, {id:'creating_input2', type: 'text'});
            inputSubtitle.element.required = true;
            inputSubtitle.element.placeholder = 'Enter Subtitle'
            const inputText = new CreateElement('textarea');
            inputText.addAttributes(inputText.element, {id:'creating_input3'});
            inputText.element.required;
            inputText.element.cols = 60;
            inputText.element.rows = 5;
            let delete_btn = new CreateElement('button', ['delete_article_btn']);
             delete_btn.addAttributes(delete_btn.element, {innerText: 'Delete block', type: 'button'})
            inputsBlock[[...inputsBlock].length - 1].after(NewinputBlock.element);
            inputPrev.element.innerText = 'Enter the subtitle of your article';
            NewinputBlock.element.append(inputPrev.element);
            NewinputBlock.element.append(inputSubtitle.element);
            textPrev.element.innerText = 'Tell your story...';
            NewinputBlock.element.append(textPrev.element);
            NewinputBlock.element.append(inputText.element)
            inputsBlock[[...inputsBlock].length - 1].after(delete_btn.element)
    
            CreateArticle.deleteBlock();
        })
    }

}

class Header{

    static createUserHeader (user = null) { // хедер в зависимости от логина
        const userMenu = document.querySelector('.menu__item');
        if (user) {// user loggined
                document?.querySelector('#auth')?.remove();
                const logOutBtn = new CreateElement('button');
                logOutBtn.addAttributes(logOutBtn.element, {
                    id: 'un_auth'
                });
                logOutBtn.element.innerText = 'Log out';
                logOutBtn.element.addEventListener('click', () => {
                   Autorization.googleLogOut();
                })
                const userBlock = new CreateElement('a', ['user_block']);
                const userName = new CreateElement('h6', ['avatar_user_name']);
                const img = new CreateElement('img', ['menu__item_avatar']);
    
                if (!window.location.href.includes('creating_page.html')) {
                    const createPostBtn = new CreateElement('a', ['menu__item_post']);
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
            }
            else { // user not loggined
                if (!window.location.href.includes('autorization.html')) {
                    const logBtn = document.createElement('a');
                    logBtn.id = 'auth';
                    logBtn.href = 'autorization.html';
                    userMenu.append(logBtn);
                    logBtn.innerText = 'Sign in';
                }
                const Deleteelems = new CreateElement();
                Deleteelems.removeItems([document?.querySelector('.menu__item_post'),
                    document?.querySelector('.user_block'),
                    document?.querySelector('#un_auth')
                ])
            }
    }
}

class AutorizePage{
    static createAutorizePage(userLog) {
        const autorizeBlock = document.querySelector('.autorize_block');
        const checkWrapper = new CreateElement('div', ['check_wrapper']);
    
        if (userLog) {
            const Deleteelems = new CreateElement();
            Deleteelems.removeItems([document.querySelector('.autorize_head'),
                document.querySelector('.check_wrapper'),
                document.querySelector('.google_btn')
            ])
            const h1 = new CreateElement('h1', ['autorize_head']);
            h1.element.innerText = 'You seccessfully loggined! Now you can create posts';
            autorizeBlock.append(h1.element);
        } else {
            document.querySelector('.autorize_head')?.remove();
            const h1 = new CreateElement('h1', ['autorize_head']);
            const button = new CreateElement('button', ['google_btn']);
            const input = new CreateElement('input');
            input.addAttributes(input.element, {
                type: 'checkbox',
                id: 'privacy_policy'
            });
            input.element.required = true
            const label = new CreateElement('label', ['privacy_policy']);
            label.element.setAttribute('for', 'privacy_policy');
            h1.element.innerText = 'Welcome to course';
            button.element.innerText = 'Sign In with Google';
            autorizeBlock.append(h1.element);
            autorizeBlock.append(button.element);
            autorizeBlock.append(checkWrapper.element);
            document.querySelector('.check_wrapper').append(input.element);
            label.element.innerText = 'You agree to our Terms of Use and Privacy Policy';
            document.querySelector('.check_wrapper').append(label.element);
            AutorizePage.checkPrivacy(button.element);
        }
    }
    
    static checkPrivacy(googleBtn) { // проверка согласия с политикой конф.
        document.querySelector('#privacy_policy')
            .addEventListener('change', (e) => {
                if (e.target.checked) {
                    googleBtn.addEventListener('click',Autorization.googleLogin);
                    googleBtn.classList.add('btn_active');
                } else {
                    googleBtn.removeEventListener('click', Autorization.googleLogin);
                    googleBtn.classList.remove('btn_active');
                }
            });
    }
}

function creationPageError() { 
    document.querySelector('.creating_wrapper').remove();
    document.querySelector('footer').remove();
    const mainWrapper = new CreateElement('div', ['main_wrapper']);
    const autorizeWrapper = new CreateElement('div', ['autorize_wrapper']);
    const h1 = new CreateElement('h1', ['autorize_head']);
    h1.element.innerText = 'You cannot create an article, you must log in';
    document.querySelector('main').append(mainWrapper.element);
    mainWrapper.element.append(autorizeWrapper.element);
    autorizeWrapper.element.append(h1.element);
}



//------------------страница авторизации-----------------------------

class Database{
    static addToDB(imgURL, base, path = null) {
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
                window.location.href =`${path}##${docRef.id}` // relocate to new article 
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}


class ArticlePage{
    static addArticleData(){
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
                   let str = formData.elements[i].value;
                baseOutput.preview = `${str.slice(0, 101)}`;
                baseOutput.preview.length > 100 ? baseOutput.preview += '..' : baseOutput.preview;
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
    
    static uploadArticle() {
        document.querySelector('#drag_form').addEventListener('submit', (e) => {
            e.preventDefault()
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
                    let base = ArticlePage.addArticleData();
                   Database.addToDB(url, base, 'article_page.html');
                    xhr.send();
                })
        }).catch(e => {
            console.log(e)
        })
    })
    }
    
    static createArticle(articlesInfo, articleId) {
        const articlesWrapper = document.querySelector('.articles');
        const articleTags = document.querySelector('.articles_tags');
    
        const div = new CreateElement('a', ['article_prev_block']),
            head = new CreateElement('h6', []),
            text = new CreateElement('p', ['article_text_style']),
            textWrap = new CreateElement('div', ['atricle_text_wrap']),
            img = new CreateElement('img', ['article_prev_img']);
        div.addAttributes(div.element, {
            href: `article_page.html##${articleId}`
        });
        img.element.src = `${articlesInfo.img}`
        head.addAttributes(head.element, {
            innerText: `${ articlesInfo.title.slice(0,40)}`
        });
        text.addAttributes(text.element, {
            innerText: `${articlesInfo.preview}`
        });
        if (!articlesWrapper) {
            const articlesWrapper = new CreateElement('div', ['articles']);
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
    
    
    static createArticlePage(){
        db.collection("articles").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                          if(doc.id==window.location.hash.slice(2, window.location.hash.length)){
                            const articleWrapper = document.querySelector('.article_wrapper');
                            const h3 = new CreateElement('h3');
                            const hr = new CreateElement('hr');
                            const img = new CreateElement('img', ['article_picture']);
                            img.addAttributes(img.element, {alt: 'Article icture', src: doc.data().img})
                            const address = new CreateElement('address');
                            const articleTags = new CreateElement('div', ['article_tags_list']);
                            address.element.innerText = doc.data().author;
                            h3.element.innerText = doc.data().title;
                            articleWrapper.append(img.element)
                            articleWrapper.append(h3.element)
                            for (let i = 0; i < doc.data().subTitles.length; i++) {
                               const h5 = new CreateElement('h5');
                               h5.element.innerText = doc.data().subTitles[i];
                                const p = new CreateElement('p', ['article_text']);
                                p.element.innerText = doc.data().contents[i];
                               articleWrapper.append(h5.element);
                               articleWrapper.append(p.element);
                            }
                            articleWrapper.append(hr.element)
                            articleWrapper.append(address.element)
                            articleWrapper.append(articleTags.element)
                           CreateArticle.tagsCreating(doc.data().tags) 
                          }
                         
                        }
            );
        });
    }
}

