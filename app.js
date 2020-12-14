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
        this.bpm = 200;
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
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            console.log(bar);
        });
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

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    })
})


drumKit.playSound.addEventListener("click", function(){
    drumKit.start();
});