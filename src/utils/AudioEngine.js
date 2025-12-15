// --- [SOUND ENGINE] ---
export const AudioEngine = {
    ctx: null,
    init: function() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
    },
    playClick: function() {
        if(!this.ctx) this.init(); 
        if(this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator(); 
        const gain = this.ctx.createGain(); 
        osc.connect(gain); 
        gain.connect(this.ctx.destination);
        osc.frequency.setValueAtTime(600, this.ctx.currentTime); 
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime); 
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.start(); 
        osc.stop(this.ctx.currentTime + 0.1);
        if (navigator.vibrate) navigator.vibrate(20);
    },
    playMagic: function() {
        if(!this.ctx) this.init(); 
        if(this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator(); 
        const gain = this.ctx.createGain(); 
        osc.connect(gain); 
        gain.connect(this.ctx.destination);
        osc.type = 'triangle'; 
        osc.frequency.setValueAtTime(400, this.ctx.currentTime); 
        osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime); 
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
        osc.start(); 
        osc.stop(this.ctx.currentTime + 0.5);
    },
    playBubble: function() {
        if(!this.ctx) this.init(); 
        if(this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator(); 
        const gain = this.ctx.createGain(); 
        osc.connect(gain); 
        gain.connect(this.ctx.destination);
        osc.type = 'square'; 
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime); 
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.start(); 
        osc.stop(this.ctx.currentTime + 0.1);
    }
};

