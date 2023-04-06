document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.playPause').setAttribute('id', 'playPause');
    let playing = false;
    document.querySelector('.playPause').addEventListener('click', function(){
        if (playing === false){
            document.getElementById('playPause').classList.add('playing');
            document.getElementById('play').classList.remove('fa-play')
            document.getElementById('play').classList.add('fa-stop');
            playing = true;
        } else{
            document.getElementById('playPause').classList.remove('playing');
            document.getElementById('play').classList.remove('fa-stop')
            document.getElementById('play').classList.add('fa-play');
            playing = false;
        }
    });//click playPause
});//doc ready