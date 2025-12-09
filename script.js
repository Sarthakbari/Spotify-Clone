console.log("Lets Write a JavaScript")

let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/Songs/")
    let response = await a.text();
    console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
    }
    return songs
}

const playMusic = (track) => {
    currentSong.src = track;   // <-- correct
    currentSong.play();
    play.src = "asset/pause.svg"
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songTime").innerHTML = "00:00/ 00:00"
};


async function main() {
    // Get the list of all the songs 
    let songs = await getSongs()

    let songUl = document.querySelector(".songList ul");

    for (const song of songs) {

        let name = decodeURIComponent(song.split("/").pop());

        songUl.innerHTML += `
        <li data-track="${song}">
            <img class="invert" src="asset/music.svg">
            <div class="info">
                <div>${name}</div>
                <div>Sarthak</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="asset/play.svg">
            </div>
        </li>`;
    }




    // Attach click event listeners to <li>
    Array.from(document.querySelectorAll(".songList li")).forEach(li => {
        li.addEventListener("click", () => {
            playMusic(li.dataset.track);
        });
    });


    // Attach an even listener to play, next and pervious.
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "asset/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "asset/play.svg"
        }
    })



    // To play Audio in Js 
    // var audio = new Audio(songs[0]);

    // document.addEventListener("click", () => {
    //     audio.play();
    // }, { once: true });

    // Attach an event Listerner to each songs
}
main()





