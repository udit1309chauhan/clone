console.log("let's write java script");
 let currentsong=new Audio();
 function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
async function getsongs() {
    let a = await fetch("./songs/");
    let response = await a.text()
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playMusic=(track,pause=false)=>{
// var audio = new Audio("/songs/"+ track);
currentsong.src="/songs/"+ track;
if(!pause)
{
    currentsong.play();  
}
      currentsong.play();
      play.src="play.svg"; 
      document.querySelector(".songinfo").innerHTML= track
      document.querySelector(".songtime").innerHTML="00:00/00:00"
}
async function main() {
   
    let songs = await getsongs()
    playMusic(songs[0],true);
    //show all the song in the play list 
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img  class="invert"src="music.svg" alt="">
                            <div class="info">
                                <div>${song}</div>
                                <div>udit</div>
                            </div>
                            <div class="playNow">
                                <span>playNow</span>
                                <img class="invert"src="play.svg " height="40px" width="27px" alt="" >
                            </div>
    
    </li>`;
    }
    //play the song
    // if (songs.length > 0) {
    //     var audio = new Audio(`songs/${songs[0]}`);
    //     audio.play();
    //     audio.addEventListener("loadeddata", () => {

    //         console.log(audio.duration, audio.currentSrc, audio.currentTime);
    //     });
    // }
  Array.from (document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click",element=>{
         console.log(e.querySelector(".info").firstElementChild.innerHTML)
         playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  });
  //attech an event litioner to play and next
 play.addEventListener("click",()=>{
    if(currentsong.paused){
        currentsong.play();
        play.src="pause.svg";
    }
    else{
        currentsong.pause();
        play.src="play.svg";
    }
 })
 //listen for time update event 
 currentsong.addEventListener("timeupdate",()=>{
    console.log(currentsong.currentTime,currentsong.duration);
    document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;  
    document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";
 })
 document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left =percent +"%"; 
    currentsong.currentTime=(currentsong.duration)*percent/100;
 })
 //add an event literner for he 
 document.querySelector(".hamburger").addEventListener("click",()=>{
document.querySelector(".left").style.left="0";
 })

  document.querySelector(".close").addEventListener("click",()=>{
document.querySelector(".left").style.left="-100%";
 })
} 
main()



