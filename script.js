let names = [
    "DAGOTHWAVE.opus",
    "Employee of The Month.opus",
    "lofimix.opus",
    "synthwave-mix-1.opus",
    "synthwave-mix-2.opus",
    "synthwave-mix-3.opus",
    "synthwave-mix-4.opus",
    "synthwave-mix-5.opus",
    "synthwave-mix-6.opus",
    "synthwave-mix-7.opus",
    "synthwave-mix-8.opus",
]

let audio = new Audio("music/DAGOTHWAVE.opus")
let root = document.getElementById("root")
root.classList.add("root")

let video = document.createElement("video")
video.classList.add("video")
//video.controls=true
video.muted=true
video.autoplay=true
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
