document.addEventListener("DOMContentLoaded", () => {

    //Variables
    var caps = false;
    var showTime, score, loseSound;
    var setTimeShowTime = 1;

    //Run modal
    modals();

    //Play and pause
    document.querySelector('.playPause').setAttribute('id', 'playPause');
    let playing = false;

    document.querySelector('.playPause').addEventListener('click', function(){
        if (playing === false){

            document.getElementById('playPause').classList.add('playing');
            document.getElementById('play').classList.remove('fa-play')
            document.getElementById('play').classList.add('fa-stop');
            playing = true;
            //Reset input
            document.getElementById('input').value = '';
            document.getElementById('input').placeholder='Get Ready...';
            playGame();
            getRandomWord();

        } else{

            document.getElementById('playPause').classList.remove('playing');
            document.getElementById('play').classList.remove('fa-stop')
            document.getElementById('play').classList.add('fa-play');
            playing = false;
            playGame();

        }
    });//click playPause

    function modals(){
        //Level selected and hide modal
        document.getElementById('submit').addEventListener('click', function(){

            //Reset score
            score = 0;

            //Set speed and play
            if(document.getElementById('easy').checked){
                document.querySelector('.modal').style.display = 'none';
                setTimeShowTime = 5;
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
                getRandomWord();
            } else if(document.getElementById('medium').checked){
                document.querySelector('.modal').style.display = 'none';
                setTimeShowTime = 3;
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
                getRandomWord();
            } else if(document.getElementById('hard').checked){
                document.querySelector('.modal').style.display = 'none';
                setTimeShowTime = 1;
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
                getRandomWord();
            }
        });

        //On lose show modal
    }

    function getRandomWord(){

        //Get a random number for dictionary.js
        let randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];

        return randomWord;
    }//getRandomWord

    //Set Hard 1, Medium 3, Easy 5

    //Game
    function playGame(){


        //Set a new word to be the placeholder
        document.getElementById('input').placeholder= getRandomWord();

        //Set timer
        document.getElementById("beat").play();
        document.getElementById("beat").loop = true;

        //Set timer display
        timeShowTime = setTimeShowTime;
        score = 0;

        //Update score
        document.getElementById("score1").innerHTML = score;
        document.getElementById("score2").innerHTML = score;

        //Catch lose sound choice
        loseSound = document.getElementById('lose'+ randomInt(1, 5));

        //Playing
        console.log('Playing');

        //Open the input field
        //Set keypress to return false

        //Check game status
        if (playing == true){

            //Run game loop
            showTime = setInterval(() => {
                //Playing
                document.getElementById("timer").innerHTML = timeShowTime;
                if (timeShowTime == 0){
                    
                    if(document.getElementById('input').placeholder === document.getElementById('input').value){
                        //If Win ********************************************
                        timeShowTime = setTimeShowTime;
                        score++;
                        //Set a new word to be the placeholder
                        document.getElementById('input').placeholder= getRandomWord();
                        //Update score
                        document.getElementById("score1").innerHTML = score;
                        document.getElementById("score2").innerHTML = score;
                        //Clear input
                        document.getElementById('input').value = '';
                    } else{
                        //If Lose ********************************************
                        console.log('Stopped');
                        document.getElementById("beat").pause();
                        document.getElementById("beat").currentTime = 0;

                        //Show modal
                        document.querySelector('.modal').style.display = 'flex';

                        //Play lose sound
                        loseSound.play();
                        loseSound.addEventListener("ended", function(){
                            //Reset input
                            document.getElementById('input').value = '';
                            document.getElementById('input').placeholder='Try Again';
                        });

                        //Clear timer
                        timeShowTime = 0;
                        document.getElementById("timer").innerHTML = timeShowTime;

                        //Hide word
                        document.getElementById('word').style.display = 'none';

                        //Clear loop
                        clearInterval(showTime);

                        //Reset play button
                        playing = false;
                        document.getElementById('playPause').classList.remove('playing');
                        document.getElementById('play').classList.remove('fa-stop')
                        document.getElementById('play').classList.add('fa-play');

                        //Disable the input field
                        //Set keypress to return true
                    }
                } else{
                    timeShowTime--;
                }
            }, 500);

            //requestAnimationFrame(play);

        } else{
            //If Stopped ********************************************

            //cancelAnimationFrame(play);
            console.log('Stopped');
            document.getElementById("beat").pause();
            document.getElementById("beat").currentTime = 0;

            //Clear timer
            timeShowTime = 0;
            document.getElementById("timer").innerHTML = timeShowTime;

            //Show modal
            document.querySelector('.modal').style.display = 'flex';

            //Reset a new word to be the placeholder
            document.getElementById('input').placeholder='Get Ready...'; 
            document.getElementById('input').value = '';

            //Hide word
            document.getElementById('word').style.display = 'none';

            //Clear loop
            clearInterval(showTime);

            //Disable the input field
            //Set keypress to return false
        }
    }//playGame

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

        //Update and show word at top
        headerWord();

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

        //Update and show word at top
        if(document.getElementById('input').innerHTML == 'Word'){
            document.getElementById('word').style.display = 'flex';
        } else{
            document.getElementById('word').style.display = 'none';
        }

        if (key === "Backspace") {
            document.getElementById('backspace').classList.add('keyPressed');
            document.getElementById('input').value = getInput.substring(0, getInput.length - 1);
            setTimeout(function(){
                document.getElementById('backspace').classList.remove('keyPressed');
            }, 100);
            return false;
        }
    
    });

    //Check if caps is on
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

    //Keyboard light up
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

    function randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    //Show the word in the header while typing
    function headerWord(){
        if(document.getElementById('input').innerHTML != 'Word'){
            //Hide word initially
            document.getElementById('word').style.display = 'flex';
            //document.getElementById('word').innerHTML = 'right';
        } else{
            document.getElementById('word').style.display = 'none';
        }
    }

});//doc ready