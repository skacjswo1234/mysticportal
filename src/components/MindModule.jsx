import { useState } from 'react';
import { IconArrowLeft } from './Icons';
import { AudioEngine } from '../utils/AudioEngine';
import { MIND_Q, MIND_RES } from '../utils/constants';

export const MindModule = ({ onHome }) => {
    const [idx, setIdx] = useState(0);
    const [ans, setAns] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSel = (k) => {
        AudioEngine.playClick();
        const next = [...ans, k];
        if(idx < 2) {
            setAns(next);
            setIdx(idx+1);
        } else {
            setAns(next);
            setLoading(true);
            setTimeout(()=>setLoading(false), 2000);
        }
    };

    const res = !loading && ans.length === 3 ? (MIND_RES[ans[0]] || MIND_RES["Forest"]) : null;

    return (
        <div className="w-full h-full flex flex-col p-6 fade-in overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onHome} className="text-white/70 hover:text-white"><IconArrowLeft/></button>
                <span className="text-purple-300 font-bold font-cute text-xl">직관 심리 테스트</span>
                <div className="w-6"></div>
            </div>
            {!loading && ans.length < 3 && (
                <div className="text-center">
                    <div className="text-xs text-purple-400 font-bold mb-4 tracking-widest font-eng">SCENE 0{idx+1}</div>
                    <h2 className="text-xl font-bold mb-8 font-cute leading-relaxed text-white">{MIND_Q[idx].q}</h2>
                    <div className="img-grid">
                        {MIND_Q[idx].ops.map((op, i) => (
                            <div key={i} onClick={()=>handleSel(op.k)} className="img-card">
                                <div className="text-4xl mb-2">{op.i}</div>
                                <div className="mt-2 text-sm font-bold font-cute">{op.t}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {loading && (
                <div className="flex flex-col items-center justify-center h-80">
                    <div className="text-4xl animate-bounce"></div>
                    <p className="mt-4 text-purple-200 font-cute text-xl">무의식 조각을 맞추는 중...</p>
                </div>
            )}
            {!loading && res && (
                <div className="glass-box w-full max-w-sm mx-auto fade-in">
                    <div className="text-xs text-purple-300 font-bold mb-2">FUTURE PATTERN</div>
                    <div className="text-6xl mb-4">{res.i}</div>
                    <h2 className="text-2xl font-bold text-white mb-4 font-cute">{res.t}</h2>
                    <p className="text-sm leading-6 text-gray-200">{res.m}</p>
                    <button onClick={()=>{setIdx(0); setAns([]);}} className="mt-6 text-xs underline opacity-70">다시 하기</button>
                </div>
            )}
        </div>
    );
};

