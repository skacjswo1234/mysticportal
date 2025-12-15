import { useState } from 'react';
import { IconArrowLeft } from './Icons';
import { AudioEngine } from '../utils/AudioEngine';
import { ING, POTIONS } from '../utils/constants';

export const PotionModule = ({ onHome }) => {
    const [picks, setPicks] = useState([]);
    const [phase, setPhase] = useState('SHELF'); // SHELF, MIX, RESULT

    const togglePick = (id) => {
        AudioEngine.playClick();
        if (picks.includes(id)) setPicks(picks.filter(p => p !== id));
        else if (picks.length < 3) setPicks([...picks, id]);
    };

    const mixPotion = () => {
        if (picks.length !== 3) return;
        setPhase('MIX');
        AudioEngine.playBubble();
        setTimeout(() => {
            setPhase('RESULT');
            AudioEngine.playMagic();
        }, 3000);
    };

    const getResult = () => {
        const sum = picks.reduce((a,b)=>a+b,0);
        if (sum % 4 === 0) return POTIONS["Wealth"];
        if (sum % 4 === 1) return POTIONS["Love"];
        if (sum % 4 === 2) return POTIONS["Luck"];
        return POTIONS["Power"];
    };

    return (
        <div className="w-full h-full flex flex-col p-6 fade-in overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onHome} className="text-white/70 hover:text-white"><IconArrowLeft/></button>
                <span className="text-blue-300 font-bold font-cute text-xl">미래 연금술</span>
                <div className="w-6"></div>
            </div>
            {phase === 'SHELF' && (
                <div className="text-center">
                    <div className="glass-box mb-6">
                        <p className="text-sm font-light">
                            마법의 솥에 넣을<br/>
                            <strong className="text-blue-300">재료 3가지</strong>를 골라주세요.
                        </p>
                    </div>
                    <div className="ing-grid">
                        {ING.map((item) => (
                            <div key={item.id} onClick={()=>togglePick(item.id)}
                                className={`ing-item ${picks.includes(item.id) ? 'selected' : ''}`}>
                                <div className="text-3xl mb-1">{item.i}</div>
                                <div className="text-xs font-cute text-white">{item.n}</div>
                            </div>
                        ))}
                    </div>
                    <button disabled={picks.length !== 3} onClick={mixPotion}
                        className={`btn-action w-full mt-8 ${picks.length!==3 ? 'opacity-50' : ''}`}>
                        물약 제조하기 
                    </button>
                </div>
            )}
            {phase === 'MIX' && (
                <div className="flex flex-col items-center justify-center h-80">
                    <div className="cauldron text-4xl"></div>
                    <p className="mt-6 text-blue-200 font-cute text-xl animate-pulse">보글보글 끓이는 중...</p>
                </div>
            )}
            {phase === 'RESULT' && (
                <div className="glass-box fade-in">
                    <div className="text-xs text-blue-300 font-bold mb-2">POTION COMPLETE</div>
                    <div className="text-7xl mb-4 animate-bounce">{getResult().i}</div>
                    <h2 className="text-2xl font-bold text-white mb-4 font-cute">{getResult().t}</h2>
                    <p className="text-sm leading-7 text-gray-200">{getResult().m}</p>
                    <button onClick={()=>{setPhase('SHELF'); setPicks([]);}} className="mt-8 text-xs underline opacity-70">다시 만들기</button>
                </div>
            )}
        </div>
    );
};

