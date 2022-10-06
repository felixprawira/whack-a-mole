var container = document.getElementsByClassName('container');
var holes = container[0].children[1].children

var win = false
var start = false
var clicks = 0
var time = 0

const mole_img_url = new URL("mole.60ea17ce.png", import.meta.url).href
var win_msg = document.querySelector('.win-message')
var start_btn = document.querySelector('.start-button')
var txt_time = document.querySelector('.time')
var txt_clicks = document.querySelector('.clicks')

var set_mole_location = () =>  Math.floor(Math.random() * holes.length)
document.querySelector('.start-button').addEventListener('click', start_game)

function setClickListener() {
    for (let i = 0; i < holes.length; i++) {
        holes[i].addEventListener('click', clickHole)
    }
}

setClickListener()

const debounceAction = (l, e) => {
    if (!win)
    {
        let timeout;

        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => l.apply(null, args), e)
        }        
    }
}, randomInterval = (l, e) => Math.floor(l + Math.random() * (e - l + 1));

const debounce = debounceAction(() => show_mole(), 1e3)

function clickHole(event) {
    if (!win)
    {
        clicks++
        txt_clicks.textContent = `Clicks: ${clicks}`
        hit(event), debounce()        
    }
    else {
        alert("You already catch the mole, restart the game!")
    }
}

function hit(event) {
    if (event.target.tagName == 'IMG')
    {
        win = true
        start_btn.removeAttribute('disabled')
        win_msg.textContent = 'You win!'
        setTimeout(() => {
            alert(`Gotcha! time to catch ${time} seconds and ${clicks} clicks`)
        }, 100)
    }
}

function show_mole() {
    if (!win)
    {
        var mole_img = document.createElement('img')
        mole_img.setAttribute('src', mole_img_url)
        mole_img.classList.add('mole')

        holes[set_mole_location()].children[0].append(mole_img), setTimeout(() => {
                    win || hide_mole()
                }, randomInterval(200, 400))        
    }
}

var hide_mole = () => {
    for(var i = 0; i < holes.length; i++) {
        if (holes[i].children[0].hasChildNodes()) {
            holes[i].children[0].removeChild(holes[i].children[0].firstChild)
        }
    }
    debounce()
}

function timer() {
    setInterval(() => {
        if (!win)
        {
            time += 1
            txt_time.textContent = `Elapsed time: ${time} seconds`        
        }
    }, 1000)
}

function start_game() {
    start = true
    win = false
    timer()
    start_btn.setAttribute('disabled', 1)
    txt_time.textContent = `Elapsed time: 0 seconds`
    txt_clicks.textContent = `Clicks: 0`
    win_msg.textContent = ''
    show_mole()
}