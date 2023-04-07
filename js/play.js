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

        setTimeout(function(){
            document.getElementById(`${name}`).classList.remove('keyPressed');
        }, 100);


        //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    }, false);

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
    
    });

    // document.addEventListener("keyup", function(){
    //     document.getElementById(`${name}`).style.backgroundColor = '#2283FF';
    //     document.getElementById(`${name}`).style.color = '#FFF';
    // });//Refresh keys

});//doc ready