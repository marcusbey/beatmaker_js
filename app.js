class Drumkit {
    constructor() {
        this.playBtn = document.querySelector('.playBtn');
        this.pads = document.querySelectorAll('.pad');
        this.currentKick = "./allSounds/kick-classic.wav";
        this.currentclap = "./allSounds/clap-808.wav";
        this.currentcrash = "./allSounds/crash-noise.wav";
        this.currenthihat = "./allSounds/hihat-808.wav";
        this.currentsnare = "./allSounds/snare-808.wav";
        this.kickAudio = document.querySelector('.kick-sound');
        this.clapAudio = document.querySelector('.clap-sound');
        this.crashAudio = document.querySelector('.crash-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.selects = document.querySelector('select');
    }

    //get the active pad 
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        const step = this.index % 10;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over the pads 
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.2s alternate ease-in-out 2`;
            console.log(bar);
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
            }
        });
        this.index ++;
        console.log(step);
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

    changeSound(){

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


drumKit.selects.forEach(select => {
    select.addEventListener('change', function(){
        drumKit.changeSound();
    } )
})