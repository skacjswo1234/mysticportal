import { useState } from 'react';
import { IconArrowLeft } from './Icons';
import { AudioEngine } from '../utils/AudioEngine';
import { COLORS } from '../utils/constants';

export const ColorModule = ({ onHome }) => {
    const [sel, setSel] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePick = (colorObj) => {
        AudioEngine.playClick();
        setLoading(true);
        setTimeout(() => {
            setSel(colorObj);
            setLoading(false);
            AudioEngine.playMagic();
        }, 1500);
    };

    return (
        <div className="w-full h-full flex flex-col p-6 fade-in overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onHome} className="text-white/70 hover:text-white"><IconArrowLeft/></button>
                <span className="text-green-300 font-bold font-cute text-xl">색채 오라 테스트</span>
                <div className="w-6"></div>
            </div>
            {!loading && !sel && (
                <div className="text-center">
                     <div className="glass-box mb-8">
                        <p className="text-sm font-light">지금 이 순간,<br/>가장 눈길이 가는 <strong>색깔</strong>을 골라보세요.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto">
                        {COLORS.map((c, i) => (
                            <div key={i} onClick={()=>handlePick(c)} 
                                className="w-full aspect-square rounded-full cursor-pointer transition-transform hover:scale-110 shadow-lg border-2 border-white/20"
                                style={{backgroundColor: c.c}}>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {loading && (
                <div className="flex flex-col items-center justify-center h-80">
                    <div className="loader-icon text-green-300"></div>
                    <p className="mt-4 text-green-200 font-cute text-xl">당신의 오라를 읽는 중...</p>
                </div>
            )}
            {!loading && sel && (
                <div className="glass-box w-full max-w-sm mx-auto fade-in">
                    <div className="w-24 h-24 rounded-full mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.5)] border-4 border-white/30" style={{backgroundColor: sel.c}}></div>
                    <h2 className="text-2xl font-bold text-white mb-2 font-cute" style={{color:sel.c}}>{sel.t}</h2>
                    <p className="text-xs text-gray-300 font-eng tracking-widest mb-6 uppercase">{sel.n} AURA</p>
                    <div className="w-full h-px bg-white/20 mb-6"></div>
                    <p className="text-sm leading-7 text-gray-100 font-light text-justify break-keep">
                        {sel.m}
                    </p>
                    <button onClick={()=>setSel(null)} className="mt-8 text-xs underline opacity-70">다른 색 고르기</button>
                </div>
            )}
        </div>
    );
};

