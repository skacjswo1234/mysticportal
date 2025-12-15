import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { DestinyModule } from './components/DestinyModule';
import { MindModule } from './components/MindModule';
import { ColorModule } from './components/ColorModule';
import { PotionModule } from './components/PotionModule';
import { TarotModule } from './components/TarotModule';
import { AudioEngine } from './utils/AudioEngine';
import './App.css';

function App() {
    const [mode, setMode] = useState('HOME');
    
    useEffect(() => {
        const container = document.getElementById('stars');
        if (container && container.childElementCount === 0) {
            for(let i=0; i<40; i++) {
                const s = document.createElement('div');
                s.className = 'star';
                s.style.left = Math.random()*100+'%';
                s.style.top = Math.random()*100+'%';
                s.style.width = Math.random()*3+'px';
                s.style.height = s.style.width;
                s.style.setProperty('--duration', Math.random()*3+2+'s');
                container.appendChild(s);
            }
        }
    }, []);

    const goHome = () => {
        AudioEngine.playClick();
        setMode('HOME');
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            {mode === 'HOME' && <HomeScreen onSelect={(m) => { AudioEngine.playClick(); setMode(m); }} />}
            {mode === 'DESTINY' && <DestinyModule onHome={goHome} />}
            {mode === 'MIND' && <MindModule onHome={goHome} />}
            {mode === 'COLOR' && <ColorModule onHome={goHome} />}
            {mode === 'POTION' && <PotionModule onHome={goHome} />}
            {mode === 'TAROT' && <TarotModule onHome={goHome} />}
        </div>
    );
}

export default App;

