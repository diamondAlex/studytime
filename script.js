let names = [
    "music.opus"
]


let audio = new Audio("")
audio.loop = true
let root = document.getElementById("root")
root.classList.add("root")

let canvas = document.createElement("canvas")
canvas.classList.add("canva")

root.appendChild(canvas)
let ctx = canvas.getContext("2d");
let w = canvas.parentElement.clientWidth
let h = canvas.parentElement.clientHeight
canvas.height = h
canvas.width = w

let video = document.createElement("video")
video.classList.add("video")
//video.controls=true
video.muted=true
video.autoplay=true
video.loop=true
let source = document.createElement("source")
video.appendChild(source)
source.src = "vid.mp4"

let video2 = document.createElement("video")
video2.classList.add("video2")
//video2.controls=true
video2.muted=true
video2.autoplay=true
video2.loop=true
let source2 = document.createElement("source")
video2.appendChild(source2)
source2.src = "vids/out.mp4"

window.addEventListener('keydown', function(event) {
  if (event.key === 'm') {
      video.muted = !video.muted
      video2.muted = !video2.muted
  }
});


let bg = document.createElement("div")
bg.classList.add("background")

let left = document.createElement("div")
left.classList.add("left")

let right = document.createElement("div")
right.classList.add("right")

let playlist = document.createElement("div")
playlist.classList.add("playlist")
playlist.classList.add("rainy-background")

root.appendChild(video)
right.appendChild(playlist)
bg.appendChild(left)
bg.appendChild(right)
root.appendChild(video)
root.appendChild(video2)
root.appendChild(bg)

let current_song = -1

let i =0
for(let name of names){
    let div = document.createElement("div")
    div.id = "song_"+i.toString()
    let arrow = document.createElement("span")
    arrow.id = "arrow_"+i.toString()
    arrow.classList.add("arrow")
    arrow.innerHTML="-"
    let span = document.createElement("span")
    span.innerHTML = name
    span.id = "s_"+i.toString()
    i++
    div.classList.add("song")
    div.appendChild(arrow)
    div.appendChild(span)
    playlist.appendChild(div)

    div.addEventListener("click", (e)=>{
        if(current_song != -1){
            let old_arrow = document.getElementById("arrow_" + current_song)
            old_arrow.innerHTML = "-"
        }
        let id = e.target.id.split("_")[1]
        let arrow = document.getElementById("arrow_" + id)
        arrow.innerHTML = ">"
        current_song = parseInt(id)
        audio.src = "music/" + document.getElementById("s_"+id).innerHTML
        //audio.src = "music/DAGOTHWAVE.opus" 
    })
}

audio.addEventListener("canplaythrough", (event) => {
  /* the audio is now playable; play it if permissions allow */
  audio.play();
});

let bx_r = 534/1364
let by_r =296/658

let drawn = 0

let img = new Image();
img.src = "columbo.png";

let columbos_x = 10
let columbos_y = 10
let d_x = 10
let d_y = 10
function spawn_thing(){
    ctx.clearRect(columbos_x, columbos_y, 100, 100);
    ctx.drawImage(img, columbos_x+=d_x, columbos_y+=d_y);
    if(columbos_x >= w)
        d_x *= -1
    if(columbos_y >= h)
        d_y *= -1
    if(columbos_x <= 0)
        d_x *= -1
    if(columbos_y <= 0)
        d_y *= -1
}

setInterval(() =>{
    spawn_thing()
},50)

//for later
window.addEventListener('mousemove', (e)=>{
    x = e.clientX
    y = e.clientY
    bx = bx_r * w
    by = by_r * h
    if(bx - 10 < x && x < bx+10 && by -10 < y && y < by+10){
        ctx.beginPath();
        ctx.strokeStyle = "white"
        ctx.arc(bx, by, 10, 0, 2 * Math.PI);
        ctx.stroke();
        drawn = 1
    }else if(drawn == 1){
        ctx.clearRect(bx-15, by-15, 30, 30);
        drawn = 0
    }
})
