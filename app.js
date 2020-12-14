class Drumkit {
    constructor() {
        this.playSound = document.querySelector('.play');
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.clapAudio = document.querySelector('.clap-sound');
        this.crashAudio = document.querySelector('.crash-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.index = 0;
        this.bpm = 100;
    }

    repeat() {
        const step = this.index % 10;
        const activeBars = document.querySelector(`.b${step}`);
        this.index ++;
        console.log(step);
    }

    start() {
        const interval = (60 / this.bpm) * 1000;
        setInterval(()=>{
            this.repeat();
            },  interval );
        }
    }

const drumKit = new Drumkit();

drumKit.playSound.addEventListener("click", function(){
    drumKit.start();
});