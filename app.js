class Drumkit {
    constructor() {
        this.playBtn = document.querySelector('.playBtn');
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.clapAudio = document.querySelector('.clap-sound');
        this.crashAudio = document.querySelector('.crash-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.tomAudio = document.querySelector('.tom-sound');
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.resetBtn = document.querySelector('.resetBtn');
    }

    //get the active pad 
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        const step = this.index % 12;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over the pads 
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.2s alternate ease-in-out 2`;
            //check if pad is active
            if(bar.classList.contains('active')){
                //check each sound
                if (bar.classList.contains('pad-kick')){
                    this.kickAudio.play();
                    this.kickAudio.currentTime = 0;
                }
                if (bar.classList.contains('pad-clap')){
                    this.clapAudio.play();
                    this.clapAudio.currentTime = 0;
                }
                if (bar.classList.contains('pad-crash')){
                    this.crashAudio.play();
                    this.crashAudio.currentTime = 0;
                }
                if (bar.classList.contains('pad-hihat')){
                    this.hihatAudio.play();
                    this.hihatAudio.currentTime = 0;
                }
                if (bar.classList.contains('pad-snare')){
                    this.snareAudio.play();
                    this.snareAudio.currentTime = 0;
                }
                if (bar.classList.contains('pad-tom')){
                    this.tomAudio.play();
                    this.tomAudio.currentTime = 0;
                }
            }
        });
        this.index ++;
    }
  
    start() {
        const interval = (60 / this.bpm) * 1000;
        // check if is playing 
        if (!this.isPlaying) {
            this.isPlaying = setInterval(()=>{
                this.repeat();
                },  interval);
            } else {
                //remove the intervalle
                clearInterval(this.isPlaying);
                this.isPlaying = null;
            } 
        }
    updateBtn(){
        if (!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }

    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName){
            case  "select-kick":
                this.kickAudio.src = selectionValue;
                break;
            case  "select-clap":
                this.clapAudio.src = selectionValue;
                break;
            case "select-crash":
                this.crashAudio.src = selectionValue;
                break;
            case "select-hihat":
                this.hihatAudio.src = selectionValue;
                break;
            case "select-snare":
                this.snareAudio.src = selectionValue;
                break;
            case "select-tom":
                this.tomAudio.src = selectionValue;
                break;
        }
    }

    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')){
            switch (muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.clapAudio.volume = 0;
                    break;
                case "2":
                    this.crashAudio.volume = 0;
                    break;
                case "3":
                    this.hihatAudio.volume = 0;
                    break;
                case "4":
                    this.snareAudio.volume = 0;
                    break;
                case "5":
                    this.tomAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.clapAudio.volume = 1;
                    break;
                case "2":
                    this.crashAudio.volume = 1;
                    break;
                case "3":
                    this.hihatAudio.volume = 1;
                    break;
                case "4":
                    this.snareAudio.volume = 1;
                    break;
                case "5":
                    this.tomAudio.volume = 1;
                    break;
        }
    }
    }

    changeTempo(e){
        const tempoValue = document.querySelector('.tempo-nbr');
        this.bpm = e.target.value;
        tempoValue.innerText = e.target.value;
    }

    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.playBtn');
        if (playBtn.classList.contains('active')){
            this.start();
        }
    }

    reset(){
        this.pads.forEach(pad => {
            pad.classList.remove('active');
        })
    }
}


const drumKit = new Drumkit();

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    })
})


drumKit.playBtn.addEventListener("click", function(){
    drumKit.updateBtn();
    drumKit.start();
});


drumKit.resetBtn.addEventListener("click", function(){
    drumKit.reset();
});


drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});


drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    });
});


drumKit.tempoSlider.addEventListener('change', function(e){
        drumKit.changeTempo(e);
    });

drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
});