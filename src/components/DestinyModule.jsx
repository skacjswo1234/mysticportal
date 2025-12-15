import { useState } from 'react';
import { IconArrowLeft, IconStar } from './Icons';
import { AudioEngine } from '../utils/AudioEngine';
import { DB_DESTINY, calculateLifePath } from '../utils/constants';

export const DestinyModule = ({ onHome }) => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [res, setRes] = useState(null);

    const calc = () => {
        if(!name || birth.length !== 8) { 
            alert("정보를 정확히 입력해줘!"); 
            return; 
        }

        AudioEngine.playMagic();
        setStep(1); // Loading
        
        const num = calculateLifePath(birth);
        
        setTimeout(() => {
            setRes({ num: num, ...DB_DESTINY[num] });
            AudioEngine.playMagic();
            setStep(2); // Result
        }, 2500);
    };

    return (
        <div className="w-full h-full flex flex-col p-6 fade-in overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onHome} className="text-white/70 hover:text-white"><IconArrowLeft/></button>
                <span className="text-pink-300 font-bold font-cute text-xl">운명 코드 계산기</span>
                <div className="w-6"></div>
            </div>
            {step === 0 && (
                <div className="glass-box">
                    <p className="mb-6 text-sm text-gray-100">생년월일에 숨겨진<br/><strong className="text-yellow-300">비밀 코드</strong>를 해독해줄게!</p>
                    <input className="magic-input" placeholder="이름 입력" onChange={e=>setName(e.target.value)}/>
                    <input className="magic-input" type="tel" maxLength="8" placeholder="생년월일 (20000101)" onChange={e=>setBirth(e.target.value)}/>
                    <button onClick={calc} className="btn-action">확인하기 </button>
                </div>
            )}
            {step === 1 && (
                <div className="flex flex-col items-center justify-center h-80">
                    <div className="loader-icon text-yellow-300"></div>
                    <p className="mt-6 text-pink-200 font-cute text-xl">별들의 속삭임을 듣는 중...</p>
                </div>
            )}
            {step === 2 && res && (
                <div className="w-full flex flex-col items-center pb-10">
                    <div className="card-frame mb-8">
                        <div className="badge">DESTINY NO. {res.num}</div>
                        <div className="text-7xl mb-6 pt-10 animate-bounce">{res.i}</div>
                        <div className="text-3xl text-yellow-300 font-bold font-eng mb-2 text-center">{res.k}</div>
                    </div>
                    <div className="glass-box text-left">
                        <h3 className="text-lg font-bold text-yellow-300 mb-2 flex items-center gap-2">
                            <IconStar/> {name}님의 운명
                        </h3>
                        <p className="text-gray-100 leading-relaxed font-light">{res.m}</p>
                    </div>
                    <button onClick={()=>setStep(0)} className="text-white/60 text-sm underline hover:text-white">다시 하기</button>
                </div>
            )}
        </div>
    );
};

