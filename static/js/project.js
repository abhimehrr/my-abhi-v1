const cardWrapper = $('.card-wrapper')
let data = []

window.onload = async (e) => {
    const res = await fetch('../static/data/project.json')
    data = await res.json()

    data.forEach(d => {
        cardWrapper.append(createCard(d.id, d.icon, d.shorttitle))
    });
}

// Display Data
const displayData = id => {
    openModal()
    var d = data.filter(o => o.id == id)
    createMenu(d[0])
}

// Creating Menu 
const createMenu = (d) => {
    var div = $('.content-box')
    div.scrollTop = 0

    var tech = ''
    d.tech.forEach(t => {
        tech += `<li class="text-left" style="list-style-type: disc;">${t}</li>`
    })
    
    var screenshots = ''
    d.screenshots.forEach(s => {
        screenshots += `
            <div class="gallery-item">
                <span onclick="scaleImg(event)" style="--screenshot: url('../img/screenshots/${s}')"></span>
            </div>
        `
    })

    var msg = 'Click on the images to scale large...'
    if(d.screenshots.length < 1) {
        screenshots = '<span class="clr-warning">No images to show...</span>'
        msg = ''
    }
    

    div.innerHTML = `
        <h3 class="font-m">${d.title}</h3>

        <div class="ml-l mt-m">
            <a class="project-link" href="${d.liveLink}" target="_blank">
                <span class="mr-s">Live Link</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <p class="mb-m" style="margin-top: 5px; opacity: .75;">${d.period}</p>

            <div style="text-align: justify;">
                <p>${d.desc}</p>
            </div>
        </div>

        <div class="ml-l mt-m">
            <h4 class="font-500 clr-primary mt-m mb-s">Technologies Used :</h4>
            
            <ul>
                ${tech}
            </ul>
        </div>

        <div class="ml-l mt-m">
            <h4 class="font-500 clr-primary">Screenshots :</h4>
            
            <div class="gallery mt-m mb-m flex flex-wrap">
                ${screenshots}
            </div>

            <div class="gallery mt-m mb-m flex-center font-xs clr-warning">
                ${msg}
            </div>
        </div>
    `
}

// Scale Image to 100%
const scaleImg = (e) => {
    e.target.parentElement.classList.toggle('scale-img')
}