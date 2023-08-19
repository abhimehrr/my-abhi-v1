const $ = (s) => {
    const nodeList = document.querySelectorAll(s)
    if(nodeList.length > 1) {
        return nodeList
    } else {
        return nodeList[0]
    }
}

const wrapper = $('.main-menu-wrapper')

const createCard = (id, icon, title) => {
    var div = document.createElement('div')

    div.classList.add('card')
    div.classList.add('flex-center')
    div.classList.add('flex-column')

    div.dataset.id = id
    div.setAttribute('onclick', `displayData(${id})`)

    div.innerHTML = `
        <div class="item-icon flex-center mb-s">
            ${icon}
        </div>
        <div class="card-title">
            <h3 class="font-600 font-s">${title}</h3>
        </div>
    `
    return div
}

var tempCard = $('.card-wrapper')
var tempHTML = tempCard.innerHTML

// Close Modal
const closeModal = () => {
    tempCard.innerHTML = tempHTML
    wrapper.style.left = '-150%'
}

// Open Modal
const openModal = () => {
    tempHTML = $('.card-wrapper').innerHTML
    tempCard.innerHTML = ''
    wrapper.style.left = '0'
}