//variables
let favorites = JSON.parse(localStorage.getItem('favorites')) || []
const imageConteiner = document.querySelector('.image')
const button = document.querySelector('button')

//events
button.onclick = () => updateImage()
imageConteiner.onclick = () => updateAll()

//Methods

function getState(){
    const imageSource = document.querySelector('.image img').src
    const index = favorites.indexOf(imageSource)
    const existsInLocalStorage = index != -1

    return {existsInLocalStorage, index, imageSource}
}

function updateAll(){
    updateFavorite()
    updateClasses()
}

function updateFavorite(){
    const {existsInLocalStorage, index, imageSource} = getState()

    existsInLocalStorage ? favorites.splice(index,1) : favorites.push(imageSource)

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

function updateClasses(){

    const {existsInLocalStorage} = getState()

    imageConteiner.classList.remove('fav')
    
    if(existsInLocalStorage){
        imageConteiner.classList.add('fav')
    }
}

async function updateImage(){
    await getExternalmage()
    updateClasses()
}

async function getExternalmage(){
    const response = await fetch('https://source.unsplash.com/random')
    imageConteiner.innerHTML = `<img src="${response.url}" >`
}


getExternalmage()

