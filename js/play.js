document.addEventListener("DOMContentLoaded", () => {

    //Variables
    var caps = false;
    var gameLoop, score, loseSound, matchSound, scoreSound, scoreBang, s;
    var setTimeShowTime = 1;
    var isMobile;

    //Run modal
    modals();

    //Check if on a mobile device
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        //mobile device
        isMobile = true;
      }else{
        //not mobile device
        isMobile = false;
    }

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

            //Trigger mobile keyboard
            //document.getElementById('input').focus();

            //Hide modal
            document.querySelector('.modal').style.display = 'none';
            document.querySelector('.wrapper').style.display = 'block';
            //Update the keyboard scale from index.js
            updateScale();

            //Set speed and play
            if(document.getElementById('easy').checked){
                setTimeShowTime = 8;
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
            } else if(document.getElementById('medium').checked){
                setTimeShowTime = 5;
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
            } else if(document.getElementById('hard').checked){
                setTimeShowTime = 3;
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
            }
        });
    }

    function getRandomWord(){

        //Get a random number for dictionary.js
        let randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
        return randomWord;

    }//getRandomWord

    //Game
    function playGame(){

        var setWord = getRandomWord();


        //Set a new word to be the placeholder
        document.getElementById('input').placeholder= setWord;
        //Show word
        document.getElementById('word').innerHTML = setWord;
        document.getElementById('wordMobile').innerHTML = setWord;

        //Play beat
        if(isMobile){
            //Play the audio sprite here
        }else{
            document.getElementById("beat").play();
            document.getElementById("beat").loop = true;
        }

        //Set timer display
        timeShowTime = setTimeShowTime;
        score = 0;

        //Update score
        document.getElementById("score1").innerHTML = score;
        document.getElementById("score2").innerHTML = score;

        //Catch lose sound choice
        loseSound = document.getElementById('lose'+ randomInt(1, 5));

        //Get score sound
        scoreSound = document.getElementById('scoreSound');
        scoreBang = document.getElementById('scoreBang');
        s = 0;

        //Playing
        console.log('Playing');

        //Open the input field
        //Set keypress to return false

        //Check game status
        if (playing == true){

            //Run game loop
            gameLoop = setInterval(() => {

                //Playing
                setWord = getRandomWord();

                document.getElementById("timer").innerHTML = timeShowTime;
                if (timeShowTime == 0){
                    
                    if(document.getElementById('input').placeholder === document.getElementById('input').value){
                        //If Win ********************************************
                        //Play a sound when they match
                        if(isMobile){
                            //Play audio sprite 
                        }else{
                            matchSound = document.getElementById('match'+ randomInt(1, 6));
                            matchSound.play();
                        }

                        //Reset time and increase score
                        timeShowTime = setTimeShowTime;
                        score++;
                        //Set a new word to be the placeholder
                        document.getElementById('input').placeholder= setWord;
                        //Show word
                        document.getElementById('word').innerHTML = setWord;
                        document.getElementById('wordMobile').innerHTML = setWord;
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
                        document.querySelector('.wrapper').style.display = 'none';
                        document.querySelector('.modal').style.display = 'flex';

                        //Disable play button
                        document.getElementById('submit').setAttribute('disabled', 'true');

                        //Play lose sound
                        if(isMobile){
                            //Play audio sprite
                        }else{
                            loseSound.play();
                        }
                        loseSound.addEventListener("ended", function(){
                            //Reset input
                            document.getElementById('input').value = '';
                            document.getElementById('input').placeholder='Try Again';

                            if(score > 0){
                                scoreSound.play();
                                scoreSound.addEventListener("ended", function(){
                                    //Score sound ends
                                    setInterval(() => {
                                        if(s < score){
                                            scoreBang.play();
                                            s++;
                                        }
                                        if(s === score){
                                            //Disable play button
                                            document.getElementById('submit').removeAttribute('disabled', 'true');
                                            s++;
                                        }
                                    }, 800);
                                });
                            } else{
                                //Disable play button
                                document.getElementById('submit').removeAttribute('disabled', 'true');
                            }
                        });

                        //Clear timer
                        timeShowTime = 0;
                        document.getElementById("timer").innerHTML = timeShowTime;

                        //Clear loop
                        clearInterval(gameLoop);

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
            document.querySelector('.wrapper').style.display = 'none';
            document.querySelector('.modal').style.display = 'flex';

            //Reset a new word to be the placeholder
            document.getElementById('input').placeholder='Get Ready...'; 
            document.getElementById('input').value = '';

            //Clear loop
            clearInterval(gameLoop);

            //Disable the input field
            //Set keypress to return false
        }
    }//playGame

    //Set up ids
    function setIds(){
        var keys = document.getElementsByClassName("key");
        var mobileKeys = document.getElementsByClassName("keyboard__key");

        //Desktop
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

        //Mobile
        for (var j = 0; j < mobileKeys.length; j++) {
            if(mobileKeys.item(j).getAttribute('id') === null){
                if(mobileKeys.item(j).querySelectorAll('div')[1]){
                    mobileKeys.item(j).setAttribute('id', mobileKeys.item(j).querySelectorAll('div')[1].innerHTML);
                } else if(mobileKeys.item(j).querySelectorAll('div')[0]){
                    mobileKeys.item(j).setAttribute('id', mobileKeys.item(j).querySelectorAll('div')[0].innerHTML);
                } else{
                    mobileKeys.item(j).setAttribute('id', mobileKeys.item(j).innerHTML);
                }
            }
        }
    }
    setIds();

    //Desktop Keyboard events
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

        //Update and show word at top
        //headerWord();

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

        if(key === "Enter"){
            event.preventDefault();
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

    var mobileScreenKeys = document.getElementsByClassName('keyboard__key');
    for (var j = 0; j < mobileScreenKeys.length; j++) {
        mobileScreenKeys[j].addEventListener('click', keyLight, false);
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
        if(input == 'backspace' || input == 'mobilebackspace'){
            var getInput = document.getElementById('input').value;
            document.getElementById('input').value = getInput.substring(0, getInput.length - 1);
        } else{
            document.getElementById('input').value += input; 
        }
    }

    function randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
      

});//doc ready