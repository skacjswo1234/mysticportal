import { IconStar, IconBrain, IconPalette, IconPotion, IconTarot, IconSparkle } from './Icons';

export const HomeScreen = ({ onSelect }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center fade-in">
            <div className="mb-10">
                <h1 className="text-4xl text-yellow-300 font-bold cute-font drop-shadow-md flex items-center justify-center gap-2">
                    <IconSparkle /> MYSTIC PORTAL
                </h1>
                <p className="text-base text-pink-200 eng-font mt-2 tracking-widest">MAGICAL DESTINY LAB</p>
            </div>
            <div className="glass-box w-full max-w-xs mb-8">
                <p className="text-base font-light leading-relaxed text-gray-100">
                    안녕? 신비한 마법 상점에<br/>
                    <strong>어서와! (ENTER)</strong><br/><br/>
                    다섯 개의 문 중 하나를 선택해봐.<br/>
                    <strong className="text-yellow-300">너의 운명</strong>이 기다리고 있어 
                </p>
            </div>
            <div className="w-full max-w-xs">
                <button onClick={() => onSelect('DESTINY')} className="btn-portal btn-destiny">
                    <div className="bg-white/20 p-2 rounded-full"><IconStar /></div>
                    <div className="text-left">
                        <div className="text-xl font-cute">운명 코드</div>
                        <div className="text-sm opacity-80 font-eng">Numerology Tarot</div>
                    </div>
                </button>
                <button onClick={() => onSelect('MIND')} className="btn-portal btn-mind">
                    <div className="bg-white/20 p-2 rounded-full"><IconBrain /></div>
                    <div className="text-left">
                        <div className="text-xl font-cute">직관 심리</div>
                        <div className="text-sm opacity-80 font-eng">Future Pattern</div>
                    </div>
                </button>
                <button onClick={() => onSelect('COLOR')} className="btn-portal btn-color" style={{background: 'linear-gradient(135deg, #059669, #34d399)'}}>
                    <div className="bg-white/20 p-2 rounded-full"><IconPalette /></div>
                    <div className="text-left">
                        <div className="text-xl font-cute">색채 오라</div>
                        <div className="text-sm opacity-80 font-eng">Color Energy</div>
                    </div>
                </button>
                <button onClick={() => onSelect('POTION')} className="btn-portal btn-potion" style={{background: 'linear-gradient(135deg, #3b82f6, #0ea5e9)'}}>
                    <div className="bg-white/20 p-2 rounded-full"><IconPotion /></div>
                    <div className="text-left">
                        <div className="text-xl font-cute">미래 연금술</div>
                        <div className="text-sm opacity-80 font-eng">Alchemy Lab</div>
                    </div>
                </button>
                <button onClick={() => onSelect('TAROT')} className="btn-portal btn-tarot">
                    <div className="bg-white/20 p-2 rounded-full"><IconTarot /></div>
                    <div className="text-left">
                        <div className="text-xl font-cute">타로 스프레드</div>
                        <div className="text-sm opacity-80 font-eng">3-Card Reading</div>
                    </div>
                </button>
            </div>
        </div>
    );
};

