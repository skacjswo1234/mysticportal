import { useState } from 'react';
import { IconArrowLeft } from './Icons';
import { AudioEngine } from '../utils/AudioEngine';
import { TAROT_DECK } from '../utils/constants';

export const TarotModule = ({ onHome }) => {
    const [question, setQuestion] = useState('');
    const [deck, setDeck] = useState(TAROT_DECK.map(c => ({ ...c, drawn: false })));
    const [drawnCards, setDrawnCards] = useState(new Array(3).fill(null));
    const [phase, setPhase] = useState('INPUT'); // INPUT, DRAW, RESULT
    const [reading, setReading] = useState(null);

    const shuffleDeck = () => {
        if(!question) { 
            alert("질문을 입력해주세요."); 
            return; 
        }
        AudioEngine.playMagic();
        
        // 1. Shuffle the DECK data
        const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
        setDeck(shuffled);
        setDrawnCards(new Array(3).fill(null)); // Reset drawn cards state
        setReading(null); // Reset reading result
        setPhase('DRAW');
    };

    const handleDraw = (slotIndex) => {
        if (drawnCards[slotIndex] || drawnCards.filter(c => c).length >= 3) return;
        // Pick the card based on the current draw count from the shuffled deck
        const drawCount = drawnCards.filter(c => c).length;
        const card = deck[drawCount]; // Pick the next unique card
        
        AudioEngine.playClick();
        
        // State Update (Critical Fix for visual update)
        const newDrawn = [...drawnCards];
        newDrawn[slotIndex] = card; 
        setDrawnCards(newDrawn);
        // Check if final card drawn
        if (newDrawn.filter(c => c).length === 3) {
            // Wait for the third card to visually flip (800ms) before starting loading
            setTimeout(() => {
                setPhase('LOADING');
                
                setTimeout(() => interpretReading(newDrawn), 1700); // 1700ms Analysis time
            }, 800); 
        }
    };
    
    const interpretReading = (cards) => {
        const [past, present, future] = cards;
        let summary = "당신의 운명은 다음과 같은 흐름을 타고 있습니다.";
        
        // Synthesis Logic (Simplified for demonstration)
        if(past.name === 'DEATH' && future.name === 'THE STAR') summary = "과거의 혼란은 이미 끝났습니다. 이제 당신의 인생에 가장 밝은 성공이 찾아올 것입니다.";
        else if (present.name === 'THE HERMIT' && future.name === 'THE LOVERS') summary = "현재의 고독한 성찰을 끝내면, 곧 진정한 관계의 결실을 맺게 될 것입니다.";
        
        setReading({
            past, present, future, summary,
        });
        setPhase('RESULT');
    };

    // Handle Reset/Replay
    const handleReset = () => {
        setQuestion('');
        setDeck([]);
        setDrawnCards(new Array(3).fill(null));
        setReading(null);
        setPhase('INPUT');
        AudioEngine.playClick();
    };

    return (
        <div className="w-full h-full flex flex-col p-6 fade-in overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onHome} className="text-white/70 hover:text-white"><IconArrowLeft/></button>
                <span className="text-yellow-300 font-bold font-cute text-xl">타로 운명의 거울</span>
                <div className="w-6"></div>
            </div>
            {phase === 'INPUT' && (
                <div className="glass-box">
                    <p className="mb-6 text-base text-gray-100">운명의 거울에 비춰볼<br/><strong className="text-yellow-300">궁금한 질문</strong>을 떠올려보세요.</p>
                    <input className="magic-input" placeholder="예: 이번 사업은 성공할까요?" value={question} onChange={e=>setQuestion(e.target.value)}/>
                    <button disabled={!question} onClick={shuffleDeck} className="btn-action">카드를 섞다 </button>
                </div>
            )}
            {phase === 'DRAW' && (
                <div className="text-center pt-8">
                    <div className="text-sm text-yellow-400 font-bold mb-8 tracking-widest font-eng">터치하여 카드를 뽑으세요</div>
                    <div className="tarot-spread-container">
                        <div className="spread-slots">
                            {['과거', '현재', '미래'].map((label, i) => (
                                <div key={i} className={`slot ${drawnCards[i] ? 'drawn' : ''}`} onClick={() => handleDraw(i)}>
                                    {drawnCards[i] ? (
                                        <div className="card-inner-tarot drawn">
                                            <div className="cf-front-tarot text-white/90">
                                                <div className="text-5xl">{drawnCards[i].icon}</div>
                                                <div className="text-xs font-bold mt-1 text-yellow-300">{drawnCards[i].kr}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="card-inner-tarot">
                                            <div className="cf-back-tarot"></div>
                                        </div>
                                    )}
                                    <div className="slot-label mt-2">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 text-sm text-gray-400">
                            {drawnCards.filter(c=>c).length < 3 ? `남은 카드: ${3 - drawnCards.filter(c=>c).length}장` : '운명 동기화 중...'}
                    </div>
                </div>
            )}
            {phase === 'LOADING' && (
                <div className="flex flex-col items-center justify-center h-80">
                    <div className="loader-icon text-yellow-300"></div>
                    <p className="mt-6 text-pink-200 font-cute text-2xl">운명을 해석하는 중...</p>
                </div>
            )}
            {phase === 'RESULT' && reading && (
                <div className="glass-box w-full max-w-md mx-auto fade-in pb-10">
                    <h2 className="text-2xl font-bold text-yellow-300 mb-4 font-title">당신의 질문에 대한 답</h2>
                    <p className="text-base text-pink-200 mb-6">"{question}"</p>
                    
                    <div className="border border-white/10 p-4 rounded-lg text-left text-base space-y-3">
                        <p className="text-white font-bold"> **핵심 예언:** {reading.summary}</p>
                        <p className="text-gray-400 text-sm mt-3 border-t border-white/10 pt-3">
                            과거(원인): <span className="text-pink-300">{reading.past.kr}</span><br/>
                            현재(전략): <span className="text-purple-300">{reading.present.kr}</span><br/>
                            미래(결과): <span className="text-yellow-300">{reading.future.kr}</span>
                        </p>
                        <details className="mt-4 pt-2 border-t border-white/10">
                            <summary className="text-sm text-gray-400 cursor-pointer">더 깊은 해석 보기</summary>
                            <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                                {reading.past.msg}<br/>
                                {reading.present.msg}<br/>
                                {reading.future.msg}
                            </p>
                        </details>
                    </div>
                    
                    <button onClick={handleReset} className="mt-8 text-base underline opacity-70">새로운 질문하기</button>
                </div>
            )}
        </div>
    );
};

