var container = document.getElementsByClassName('container');
var holes = container[0].children[1].children

var win = false
var start = false
var clicks = 0
var time = 0
var timeout;
const mole_img_url = new URL("mole.60ea17ce.png", import.meta.url).href

var set_mole_location = () =>  Math.floor(Math.random() * holes.length)
document.querySelector('.start-button').addEventListener('click', start_game)

function clickHole(event) {
    clicks++
    document.querySelector('.clicks').textContent = `Clicks: ${clicks}`
    hit(event)
    debounce()
}

function setClickListener() {
    for (let i = 0; i < holes.length; i++) {
        holes[i].addEventListener('click', clickHole)
    }
}

function hit(event) {
    if (event.target.tagName == 'IMG')
    {
        win = true
        document.querySelector('.start-button').removeAttribute('disabled')
        document.querySelector('.win-message').textContent = 'You win!'
        setTimeout(() => {
            alert(`Gotcha! time to catch ${time} seconds and ${clicks} clicks`)
        }, 100)        
    }
}

setClickListener()

const debounceAction = (l, e) => {
    if (!win)
    {
        timer()
        clearTimeout(timeout)
        timeout = setTimeout(() => l.apply(), e)        
    }
}, randomInterval = (l, e) => Math.floor(l + Math.random() * (e - l + 1));

var show_mole = () => {
    var mole_img = document.createElement('img')
    mole_img.setAttribute('src', mole_img_url)
    mole_img.classList.add('mole')

    holes[set_mole_location()].children[0].append(mole_img), setTimeout(() => {
                hide_mole()
            }, randomInterval(200, 400))
}

var hide_mole = () => {
    if (!win)
    {
        for(var i = 0; i < holes.length; i++) {
            if (holes[i].children[0].hasChildNodes()) {
                holes[i].children[0].removeChild(holes[i].children[0].firstChild)
            }
        }
        debounce()        
    }
}

var debounce = () => debounceAction(show_mole, 1e3)

function timer() {
    time += 1
    document.querySelector('.time').textContent = `Elapsed time: ${time} seconds`
}

function start_game() {
    start = true
    win = false
    document.querySelector('.start-button').setAttribute('disabled', 1)
    document.querySelector('.time').textContent = `Elapsed time: 0 seconds`
    document.querySelector('.clicks').textContent = `Clicks: 0`
    document.querySelector('.win-message').textContent = ''
    show_mole()
}