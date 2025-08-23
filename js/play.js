document.addEventListener("DOMContentLoaded", () => {

    //Variables
    var caps = false;
    var gameLoop, score, loseSound, matchSound, scoreSound, scoreBang;
    var setTimeShowTime = 1;
    var isMobile;
    var mobileKeyboardEnabled = false;
    var hiddenInput = null;

    //Get mobile audio
    var mobileSprite = document.getElementById('mobileSprite');
    // sprite data
    var mobileSpriteData = {
        beat: {
            start: 0,
            length: 1.8
        },
        lose1: {
            start: 2,
            length: 3.6
        },
        lose2: {
            start: 6,
            length: 4.6
        },
        lose3: {
            start: 11,
            length: 4.4
        },
        lose4: {
            start: 16.5,
            length: 3.9
        },
        lose5: {
            start: 20,
            length: 4.3
        },
        match: {
            start: 25,
            length: 2.1
        },
        score: {
            start: 28,
            length: 0.9
        },
        bang: {
            start: 29,
            length: 0.6
        },
        match1: {
            start: 30,
            length: 0.9
        },
        match2: {
            start: 31,
            length: 1.1
        },
        match3: {
            start: 33,
            length: 0.9
        },
        match4: {
            start: 35,
            length: 0.8
        },
        match5: {
            start: 36,
            length: 1.2
        },
    };

    //Run modal
    modals();
    initMobileKeyboard();

    //Handle stop of mobile audio
    var handleBeatLoop = function () {
        if (this.currentTime >= mobileSpriteData.beat.start + mobileSpriteData.beat.length) {
            this.currentTime = mobileSpriteData.beat.start;
            this.play();
        }
    };
    var handleMatchStop = function () {
        if (this.currentTime >= mobileSpriteData.match.start + mobileSpriteData.match.length) {
            this.pause();
            this.currentTime = mobileSpriteData.beat.start;
            this.play();
            mobileSprite.addEventListener('timeupdate', handleBeatLoop, false);
        }
    };
    var handleMatchOneStop = function () {
        if (this.currentTime >= mobileSpriteData.match1.start + mobileSpriteData.match1.length) {
            this.pause();
            this.currentTime = mobileSpriteData.beat.start;
            this.play();
            mobileSprite.addEventListener('timeupdate', handleBeatLoop, false);
        }
    };
    var handleMatchTwoStop = function () {
        if (this.currentTime >= mobileSpriteData.match2.start + mobileSpriteData.match2.length) {
            this.pause();
            this.currentTime = mobileSpriteData.beat.start;
            this.play();
            mobileSprite.addEventListener('timeupdate', handleBeatLoop, false);
        }
    };
    var handleMatchThreeStop = function () {
        if (this.currentTime >= mobileSpriteData.match3.start + mobileSpriteData.match3.length) {
            this.pause();
            this.currentTime = mobileSpriteData.beat.start;
            this.play();
            mobileSprite.addEventListener('timeupdate', handleBeatLoop, false);
        }
    };
    var handleMatchFourStop = function () {
        if (this.currentTime >= mobileSpriteData.match4.start + mobileSpriteData.match4.length) {
            this.pause();
            this.currentTime = mobileSpriteData.beat.start;
            this.play();
            mobileSprite.addEventListener('timeupdate', handleBeatLoop, false);
        }
    };
    var handleMatchFiveStop = function () {
        if (this.currentTime >= mobileSpriteData.match5.start + mobileSpriteData.match5.length) {
            this.pause();
            this.currentTime = mobileSpriteData.beat.start;
            this.play();
            mobileSprite.addEventListener('timeupdate', handleBeatLoop, false);
        }
    };
    var handleLoseOneStop = function () {
        if (this.currentTime >= mobileSpriteData.lose1.start + mobileSpriteData.lose1.length) {
            this.pause();
        }
    };
    var handleLoseTwoStop = function () {
        if (this.currentTime >= mobileSpriteData.lose2.start + mobileSpriteData.lose2.length) {
            this.pause();
        }
    };
    var handleLoseThreeStop = function () {
        if (this.currentTime >= mobileSpriteData.lose3.start + mobileSpriteData.lose3.length) {
            this.pause();
        }
    };
    var handleLoseFourStop = function () {
        if (this.currentTime >= mobileSpriteData.lose4.start + mobileSpriteData.lose5.length) {
            this.pause();
        }
    };
    var handleLoseFiveStop = function () {
        if (this.currentTime >= mobileSpriteData.lose5.start + mobileSpriteData.lose5.length) {
            this.pause();
        }
    };

    //Check if on a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //mobile device
        isMobile = true;
    } else {
        //not mobile device
        isMobile = false;
    }

    //Play and pause
    document.querySelector('.playPause').setAttribute('id', 'playPause');
    var playing = false;

    document.querySelector('.playPause').addEventListener('click', function () {
        if (playing === false) {

            document.getElementById('playPause').classList.add('playing');
            document.getElementById('play').classList.remove('fa-play')
            document.getElementById('play').classList.add('fa-stop');
            playing = true;
            //Reset input
            document.getElementById('input').value = '';
            document.getElementById('input').placeholder = 'Get Ready...';
            playGame();

        } else {

            document.getElementById('playPause').classList.remove('playing');
            document.getElementById('play').classList.remove('fa-stop')
            document.getElementById('play').classList.add('fa-play');
            playing = false;
            handleGameEnd();
            playGame();

        }
    });//click playPause

    function modals() {

        //Level selected and hide modal
        document.getElementById('submit').addEventListener('click', function () {
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
            if (document.getElementById('easy').checked) {
                setTimeShowTime = 5;
                if (isMobile) {
                    setTimeShowTime = setTimeShowTime * 2;
                }
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
                setupKeyboardForGame();
            } else if (document.getElementById('medium').checked) {
                setTimeShowTime = 5;
                if (isMobile) {
                    setTimeShowTime = setTimeShowTime * 2;
                }
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
                setupKeyboardForGame();
            } else if (document.getElementById('hard').checked) {
                setTimeShowTime = 5;
                if (isMobile) {
                    setTimeShowTime = setTimeShowTime * 2;
                }
                document.getElementById('playPause').classList.add('playing');
                document.getElementById('play').classList.remove('fa-play')
                document.getElementById('play').classList.add('fa-stop');
                playing = true;
                playGame();
                setupKeyboardForGame();
            }
        });
    }

    function getRandomWord() {
        // Define the difficulty filters based on current difficulty level
        let filteredWords = dictionary;

        // Filter the dictionary based on the selected difficulty
        if (document.getElementById('easy').checked) {
            // Easy: words with 7 or fewer characters
            filteredWords = dictionary.filter(word => word.length <= 7);
        } else if (document.getElementById('medium').checked) {
            // Medium: words with 10 or fewer characters
            filteredWords = dictionary.filter(word => word.length <= 10);
        } else if (document.getElementById('hard').checked) {
            // Hard: words with 7 or more characters
            filteredWords = dictionary.filter(word => word.length >= 7);
        }

        // If no words match the filter criteria, use the full dictionary
        // This is a fallback to prevent potential errors
        if (filteredWords.length === 0) {
            filteredWords = dictionary;
        }

        // Get a random word from the filtered list
        let randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
        return randomWord;
    }

    //Game
    function playGame() {

        var setWord = getRandomWord();


        //Set a new word to be the placeholder
        document.getElementById('input').placeholder = setWord;
        //Show word
        document.getElementById('word').innerHTML = setWord;
        document.getElementById('wordMobile').innerHTML = setWord;

        //Play beat
        if (isMobile) {
            mobileSprite.removeEventListener('timeupdate', handleMatchStop, false);
            mobileSprite.removeEventListener('timeupdate', handleMatchOneStop, false);
            mobileSprite.removeEventListener('timeupdate', handleMatchTwoStop, false);
            mobileSprite.removeEventListener('timeupdate', handleMatchThreeStop, false);
            mobileSprite.removeEventListener('timeupdate', handleMatchFourStop, false);
            mobileSprite.removeEventListener('timeupdate', handleMatchFiveStop, false);
            mobileSprite.removeEventListener('timeupdate', handleLoseOneStop, false);
            mobileSprite.removeEventListener('timeupdate', handleLoseTwoStop, false);
            mobileSprite.removeEventListener('timeupdate', handleLoseThreeStop, false);
            mobileSprite.removeEventListener('timeupdate', handleLoseFourStop, false);
            mobileSprite.removeEventListener('timeupdate', handleLoseFiveStop, false);
            mobileSprite.currentTime = mobileSpriteData.beat.start;
            mobileSprite.play();
            mobileSprite.addEventListener('timeupdate', handleBeatLoop, false);
        } else {
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
        loseSound = document.getElementById('lose' + randomInt(1, 5));
        var mobileRandomLose = randomInt(1, 5);

        //Get score sound
        scoreSound = document.getElementById('scoreSound');
        scoreBang = document.getElementById('scoreBang');
        var s = 0;

        //Playing
        console.log('Playing');

        //Scroll to top
        window.scrollTo(0, 0);

        //Open the input field
        //Set keypress to return false

        //Check game status
        if (playing == true) {

            //Run game loop
            gameLoop = setInterval(() => {

                //Playing
                setWord = getRandomWord();

                document.getElementById("timer").innerHTML = timeShowTime;
                if (timeShowTime == 0) {

                    if (document.getElementById('input').placeholder === document.getElementById('input').value) {

                        //If Win ********************************************
                        //Play a sound when they match
                        var mobileRandomMatch = randomInt(1, 6);
                        if (isMobile) {
                            //Play audio sprite 
                            mobileSprite.removeEventListener('timeupdate', handleBeatLoop, false);

                            //random
                            if (mobileRandomMatch == 1) {
                                mobileSprite.currentTime = mobileSpriteData.match.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleMatchStop, false);
                            } else if (mobileRandomMatch == 2) {
                                mobileSprite.currentTime = mobileSpriteData.match1.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleMatchOneStop, false);
                            } else if (mobileRandomMatch == 3) {
                                mobileSprite.currentTime = mobileSpriteData.match2.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleMatchTwoStop, false);
                            } else if (mobileRandomMatch == 4) {
                                mobileSprite.currentTime = mobileSpriteData.match3.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleMatchThreeStop, false);
                            } else if (mobileRandomMatch == 5) {
                                mobileSprite.currentTime = mobileSpriteData.match4.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleMatchFourStop, false);
                            } else if (mobileRandomMatch == 6) {
                                mobileSprite.currentTime = mobileSpriteData.match5.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleMatchFiveStop, false);
                            }
                        } else {
                            matchSound = document.getElementById('match' + randomInt(1, 6));
                            matchSound.play();
                        }

                        //Reset time and increase score
                        timeShowTime = setTimeShowTime;
                        score++;
                        //Set a new word to be the placeholder
                        document.getElementById('input').placeholder = setWord;
                        //Show word
                        document.getElementById('word').innerHTML = setWord;
                        document.getElementById('wordMobile').innerHTML = setWord;
                        //Update score
                        document.getElementById("score1").innerHTML = score;
                        document.getElementById("score2").innerHTML = score;
                        //Clear input
                        document.getElementById('input').value = '';
                    } else {
                        //If Lose ********************************************
                        handleGameEnd();
                        console.log('Stopped');
                        document.getElementById("beat").pause();
                        document.getElementById("beat").currentTime = 0;

                        //Show modal
                        document.querySelector('.wrapper').style.display = 'none';
                        document.querySelector('.modal').style.display = 'flex';

                        //Disable play button
                        document.getElementById('submit').setAttribute('disabled', 'true');

                        //Play lose sound
                        if (isMobile) {
                            //Play audio sprite
                            mobileSprite.removeEventListener('timeupdate', handleBeatLoop, false);
                            if (mobileRandomLose == 1) {
                                mobileSprite.currentTime = mobileSpriteData.lose1.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleLoseOneStop, false);
                            } else if (mobileRandomLose == 2) {
                                mobileSprite.currentTime = mobileSpriteData.lose2.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleLoseTwoStop, false);
                            } else if (mobileRandomLose == 3) {
                                mobileSprite.currentTime = mobileSpriteData.lose3.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleLoseThreeStop, false);
                            } else if (mobileRandomLose == 4) {
                                mobileSprite.currentTime = mobileSpriteData.lose4.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleLoseFourStop, false);
                            } else if (mobileRandomLose == 5) {
                                mobileSprite.currentTime = mobileSpriteData.lose5.start;
                                mobileSprite.play();
                                mobileSprite.addEventListener('timeupdate', handleLoseFiveStop, false);
                            }

                            //Disable play button
                            document.getElementById('submit').removeAttribute('disabled', 'true');
                            //Reset input
                            document.getElementById('input').value = '';
                            document.getElementById('input').placeholder = 'Try Again';
                        } else {
                            loseSound.play();
                        }
                        loseSound.addEventListener("ended", function () {
                            //Reset input
                            document.getElementById('input').value = '';
                            document.getElementById('input').placeholder = 'Try Again';

                            if (score > 0) {
                                scoreSound.play();
                                scoreSound.addEventListener("ended", function () {
                                    //Score sound ends
                                    setInterval(() => {
                                        if (s < score) {
                                            scoreBang.play();
                                            s++;
                                        }
                                        if (s === score) {
                                            //Disable play button
                                            document.getElementById('submit').removeAttribute('disabled', 'true');
                                            s++;
                                        }
                                    }, 800);
                                });
                            } else {
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
                } else {
                    timeShowTime--;
                }
            }, 500);

            //requestAnimationFrame(play);

        } else {
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
            document.getElementById('input').placeholder = 'Get Ready...';
            document.getElementById('input').value = '';

            //Clear loop
            clearInterval(gameLoop);

            //Disable the input field
            //Set keypress to return false
        }
    }//playGame

    //Set up ids
    function setIds() {
        var keys = document.getElementsByClassName("key");
        var mobileKeys = document.getElementsByClassName("keyboard__key");

        //Desktop
        for (var i = 0; i < keys.length; i++) {
            if (keys.item(i).getAttribute('id') === null) {
                if (keys.item(i).querySelectorAll('div')[1]) {
                    keys.item(i).setAttribute('id', keys.item(i).querySelectorAll('div')[1].innerHTML);
                } else if (keys.item(i).querySelectorAll('div')[0]) {
                    keys.item(i).setAttribute('id', keys.item(i).querySelectorAll('div')[0].innerHTML);
                } else {
                    keys.item(i).setAttribute('id', keys.item(i).innerHTML);
                }
            }
        }

        //Mobile
        for (var j = 0; j < mobileKeys.length; j++) {
            if (mobileKeys.item(j).getAttribute('id') === null) {
                if (mobileKeys.item(j).querySelectorAll('div')[1]) {
                    mobileKeys.item(j).setAttribute('id', mobileKeys.item(j).querySelectorAll('div')[1].innerHTML);
                } else if (mobileKeys.item(j).querySelectorAll('div')[0]) {
                    mobileKeys.item(j).setAttribute('id', mobileKeys.item(j).querySelectorAll('div')[0].innerHTML);
                } else {
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

        if (name != 'capslock') {
            setTimeout(function () {
                document.getElementById(`${name}`).classList.remove('keyPressed');
            }, 100);
        }

        //Update and show word at top
        //headerWord();

        //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    }, false);

    //Backspace
    document.addEventListener("keydown", function (event) {
        const key = event.key;
        var getInput = document.getElementById('input').value;

        if (key === "Backspace") {
            document.getElementById('backspace').classList.add('keyPressed');
            document.getElementById('input').value = getInput.substring(0, getInput.length - 1);
            setTimeout(function () {
                document.getElementById('backspace').classList.remove('keyPressed');
            }, 100);
            return false;
        }

        if (key === "Enter") {
            event.preventDefault();
        }

    });

    //Check if caps is on
    function checkCaps() {
        if (caps === true) {
            document.getElementById('capslock').style.backgroundColor = '#e9e9e9';
            caps = false;
        } else {
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
    function keyLight() {
        var input = this.id;

        if (input == 'capslock') {
            input = '';
            checkCaps();
        }

        //Catch caps lock
        if (caps == true) {
            input = input.toUpperCase();
        } else {
            input = input.toLowerCase();
        }

        //Catch input
        if (input == 'backspace' || input == 'mobilebackspace') {
            var getInput = document.getElementById('input').value;
            document.getElementById('input').value = getInput.substring(0, getInput.length - 1);
        } else {
            document.getElementById('input').value += input;
        }
    }

    function randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // Fix 1: Only show toggle on mobile devices
    function initMobileKeyboard() {
        // Only show toggle on mobile devices
        if (!isMobile) return;
        
        // Create hidden input for triggering device keyboard
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'text';
        hiddenInput.style.position = 'absolute';
        hiddenInput.style.left = '-9999px';
        hiddenInput.style.opacity = '0';
        hiddenInput.style.pointerEvents = 'none';
        hiddenInput.autocomplete = 'off';
        hiddenInput.autocorrect = 'off';
        hiddenInput.autocapitalize = 'off';
        hiddenInput.spellcheck = false;
        // Make it readonly to prevent text selection but allow focus
        hiddenInput.readOnly = true;
        document.body.appendChild(hiddenInput);

        // Add toggle button to the level selection modal
        var levelDiv = document.querySelector('.level form');
        var toggleHTML = `
            <div class="mobile-keyboard-toggle">
                <label>
                    <input type="checkbox" id="mobileKeyboardToggle">
                    <span>📱 Use Device Keyboard</span>
                </label>
            </div>
        `;
        levelDiv.insertAdjacentHTML('beforeend', toggleHTML);

        // Handle toggle changes
        var toggle = document.getElementById('mobileKeyboardToggle');
        toggle.addEventListener('change', handleMobileKeyboardToggle);

        // Load saved preference
        var savedPreference = localStorage.getItem('mobileKeyboardEnabled');
        if (savedPreference === 'true') {
            toggle.checked = true;
            mobileKeyboardEnabled = true;
        }
    }

    // Fix 2: Better iOS Safari keyboard triggering
    function setupDeviceKeyboard() {
        if (!isMobile || !mobileKeyboardEnabled) return;
        
        // For iOS Safari, we need to trigger focus from a user interaction
        // and use a different approach
        hiddenInput.style.position = 'fixed';
        hiddenInput.style.top = '0px';
        hiddenInput.style.left = '0px';
        hiddenInput.style.width = '1px';
        hiddenInput.style.height = '1px';
        hiddenInput.style.opacity = '0.01'; // Very low but not 0 for iOS
        hiddenInput.style.zIndex = '-1';
        hiddenInput.readOnly = false; // Allow input
        
        // Focus the input to trigger keyboard
        hiddenInput.focus();
        
        // Add input event listeners
        hiddenInput.addEventListener('input', handleDeviceKeyboardInput);
        hiddenInput.addEventListener('keydown', handleDeviceKeyboardSpecial);
        
        // For iOS, we need to maintain focus differently
        document.addEventListener('touchstart', maintainKeyboardFocus, { passive: true });
        
        // Dim the visual mobile keyboard
        var mobileKeyboard = document.getElementById('keyboard-mobile');
        if (mobileKeyboard) {
            mobileKeyboard.classList.add('device-keyboard-active');
        }
    }

    // Fix 3: Improved focus maintenance for iOS
    function maintainKeyboardFocus(e) {
        if (!mobileKeyboardEnabled || !playing || !hiddenInput) return;
        
        // Don't interfere if user is tapping the visual keyboard
        if (e.target && e.target.classList.contains('keyboard__key')) {
            return;
        }
        
        // Maintain focus on hidden input
        setTimeout(function() {
            if (hiddenInput && playing && mobileKeyboardEnabled) {
                hiddenInput.focus();
            }
        }, 100);
    }

    // Fix 4: Better cleanup function
    function teardownDeviceKeyboard() {
        if (!hiddenInput) return;
        
        // Blur the input to hide keyboard
        hiddenInput.blur();
        
        // Remove event listeners
        hiddenInput.removeEventListener('input', handleDeviceKeyboardInput);
        hiddenInput.removeEventListener('keydown', handleDeviceKeyboardSpecial);
        document.removeEventListener('touchstart', maintainKeyboardFocus);
        
        // Reset hidden input position
        hiddenInput.style.position = 'absolute';
        hiddenInput.style.left = '-9999px';
        hiddenInput.style.opacity = '0';
        hiddenInput.readOnly = true;
        
        // Restore visual mobile keyboard
        var mobileKeyboard = document.getElementById('keyboard-mobile');
        if (mobileKeyboard) {
            mobileKeyboard.classList.remove('device-keyboard-active');
        }
    }

    // Handle mobile keyboard toggle
    function handleMobileKeyboardToggle(e) {
        mobileKeyboardEnabled = e.target.checked;
        localStorage.setItem('mobileKeyboardEnabled', mobileKeyboardEnabled);
        
        if (mobileKeyboardEnabled && playing) {
            setupDeviceKeyboard();
        } else if (!mobileKeyboardEnabled) {
            teardownDeviceKeyboard();
        }
    }

    // Handle regular character input from device keyboard
    function handleDeviceKeyboardInput(e) {
        if (!mobileKeyboardEnabled || !playing) return;
        
        var inputChar = e.data;
        if (inputChar && inputChar.match(/[a-zA-Z]/)) {
            // Add to your game input (same as your existing keyLight function logic)
            var processedChar = inputChar;
            if (caps == true) {
                processedChar = processedChar.toUpperCase();
            } else {
                processedChar = processedChar.toLowerCase();
            }
            
            // Add to input field (matches your existing logic)
            document.getElementById('input').value += processedChar;
        }
        
        // Clear the hidden input to prevent it from filling up
        hiddenInput.value = '';
    }

    // Handle special keys (backspace, etc.) from device keyboard
    function handleDeviceKeyboardSpecial(e) {
            if (!mobileKeyboardEnabled || !playing) return;
            
            if (e.key === 'Backspace') {
                e.preventDefault();
                // Handle backspace (matches your existing logic)
                var getInput = document.getElementById('input').value;
                document.getElementById('input').value = getInput.substring(0, getInput.length - 1);
            }
            
            if (e.key === 'Enter') {
                e.preventDefault();
                // Prevent default enter behavior
            }
    }

    // Fix 6: Also add mobile audio cleanup to handleGameEnd
    function handleGameEnd() {
        if (mobileKeyboardEnabled) {
            teardownDeviceKeyboard();
        }
        
        // Add mobile audio cleanup
        if (isMobile && mobileSprite) {
            mobileSprite.pause();
            mobileSprite.removeEventListener('timeupdate', handleBeatLoop, false);
        }
    }


});//doc ready