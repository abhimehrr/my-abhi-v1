const cardWrapper = $('.card-wrapper')
let data = []

window.onload = async (e) => {
    const res = await fetch('../static/data/about.json')
    data = await res.json()

    data.forEach(d => {
        cardWrapper.append(createCard(d.id, d.icon, d.title))
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
    
    var h3 = `<h3 class="font-m">${d.title}</h3>`
    var html = ''

    var edu = {
        list: 'disc',
        opacity: '1'
    }

    if(d.id == 213 || d.id == 210) {
        edu = {
            list: 'none',
            opacity: '.75'
        }
    }

    d.about.forEach(ab => {
        var lis = ''

        ab.body.forEach(tool => {
            lis += `<li class="text-left" style="list-style-type: ${edu.list}; opacity: ${edu.opacity};">${tool}</li>`
        })

        html += `
            <div class="ml-l mt-m">
                <h4 class="font-500 clr-primary">${ab.head}</h4>
                
                <ul>
                    ${lis}
                </ul>
            </div>
        `
    })
    div.innerHTML = `${h3}${html}`
}
