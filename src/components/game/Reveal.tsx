import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { WinnerText } from './WinnerText';
import { LoserTexts } from './LoserTexts';
import { Scene } from './Scene';
import { DecorativeElements } from './DecorativeElements';
import { scrollEvent } from '../../store/game/actions';
import type { RootState } from '../../store';

interface RevealProps {
  winner: string;
  losers: string[];
  onBack: () => void;
  onPickAgain: () => void;
}

const Reveal = ({ winner, losers, onBack, onPickAgain }: RevealProps) => {
  const dispatch = useDispatch();
  const isScrollThrottled = useSelector((state: RootState) => state.game.isScrollThrottled);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isScrollThrottled) {
        dispatch(scrollEvent(e.deltaY));
      }
    };

    const revealElement = revealRef.current;
    if (revealElement) {
      revealElement.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (revealElement) {
        revealElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [dispatch, isScrollThrottled]);

  return (
    <div className="reveal" ref={revealRef}>
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <Scene />
        <LoserTexts losers={losers} />
        <WinnerText winner={winner} />
        <DecorativeElements />
        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>

      <div className="reveal-actions">
        <button className="back-button" onClick={onBack}>
          Back
        </button>
        {losers.length > 0 && (
          <button className="pick-again-button" onClick={onPickAgain}>
            Pick Again from Losers
          </button>
        )}
      </div>
    </div>
  );
};

export default Reveal;
