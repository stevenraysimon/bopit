document.addEventListener("DOMContentLoaded", () => {

    //Variables
    var caps = false;

    //Play and pause
    document.querySelector('.playPause').setAttribute('id', 'playPause');
    let playing = false;

    document.querySelector('.playPause').addEventListener('click', function(){
        if (playing === false){

            document.getElementById('playPause').classList.add('playing');
            document.getElementById('play').classList.remove('fa-play')
            document.getElementById('play').classList.add('fa-stop');
            playing = true;
            play();
            getRandomWord();

        } else{

            document.getElementById('playPause').classList.remove('playing');
            document.getElementById('play').classList.remove('fa-stop')
            document.getElementById('play').classList.add('fa-play');
            playing = false;
            play();

        }
    });//click playPause

    function getRandomWord(){

        //Words to match
        var dictionary = ['One', 'Two', 'Three'];

        //Get a random number
        let randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];

        return randomWord;
    }

    var game;

    //Game
    function play(){


        //Set a new word to be the placeholder
        document.getElementById('input').placeholder= getRandomWord();

        //Set timer
        var time = 5000;

        //Check game status
        if (playing == true){
            //Run game loop
            game = setInterval(() => {
                console.log('Playing');
            }, time);

            //requestAnimationFrame(play);

            //Play music 

            //Run timer

            //Check if word matches input

            //If timer runs out before word match, end game

            //If matches, next word


        } else{

            //cancelAnimationFrame(play);
            console.log('Stopped');

            //Reset a new word to be the placeholder
            document.getElementById('input').placeholder='Text';

            //Clear loop
            clearInterval(game);
        }
    }

    //Set up ids
    function setIds(){
        var keys = document.getElementsByClassName("key");
        for (var i = 0; i < keys.length; i++) {
            if(keys.item(i).getAttribute('id') === null){
                if(keys.item(i).querySelectorAll('div')[1]){
                    keys.item(i).setAttribute('id', keys.item(i).querySelectorAll('div')[1].innerHTML);
                } else if(keys.item(i).querySelectorAll('div')[0]){
                    keys.item(i).setAttribute('id', keys.item(i).querySelectorAll('div')[0].innerHTML);
                } else{
                    keys.item(i).setAttribute('id', keys.item(i).innerHTML);
                }
            }
        }
    }
    setIds();

    //Keyboard events
    document.addEventListener('keypress', (event) => {
        var name = event.key;
        var code = event.code;

        //Catch input
        document.getElementById('input').value += name;

        //Make string
        name = String(name).toUpperCase();

        //Keyboard Lights
        document.getElementById(`${name}`).classList.add('keyPressed');

        if (name != 'capslock'){
            setTimeout(function(){
                document.getElementById(`${name}`).classList.remove('keyPressed');
            }, 100);
        }

        //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    }, false);

    //Backspace
    document.addEventListener("keydown", function(event){
        const key = event.key;
        var getInput = document.getElementById('input').value;

        if (key === "Backspace") {
            document.getElementById('backspace').classList.add('keyPressed');
            document.getElementById('input').value = getInput.substring(0, getInput.length - 1);
            setTimeout(function(){
                document.getElementById('backspace').classList.remove('keyPressed');
            }, 100);
            return false;
        }


        //If caps locks
        // if(key === "CapsLock"){
        //     checkCaps();
        // } 
    
    });

    function checkCaps(){
        if(caps === true){
            document.getElementById('capslock').style.backgroundColor = '#e9e9e9';
            caps = false;
        }else{
            document.getElementById('capslock').style.backgroundColor = '#38fd95';
            caps = true;
        }
    }

    //Keyboard click
    var screenKeys = document.getElementsByClassName('key');
    for (var i = 0; i < screenKeys.length; i++) {
        screenKeys[i].addEventListener('click', keyLight, false);
    }
    function keyLight(){
        var input = this.id;

        if(input == 'capslock'){
            input = '';
            checkCaps();
        }

        //Catch caps lock
        if(caps == true){
            input = input.toUpperCase();
        } else{
            input = input.toLowerCase();
        }

        //Catch input
        if(input == 'backspace'){
            var getInput = document.getElementById('input').value;
            document.getElementById('input').value = getInput.substring(0, getInput.length - 1);
        } else{
            document.getElementById('input').value += input; 
        }
    }

    // document.addEventListener("keyup", function(){
    //     document.getElementById(`${name}`).style.backgroundColor = '#2283FF';
    //     document.getElementById(`${name}`).style.color = '#FFF';
    // });//Refresh keys

});//doc ready