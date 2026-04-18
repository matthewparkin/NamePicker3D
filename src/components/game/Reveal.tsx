import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { WinnerText } from './WinnerText';
import { LoserTexts } from './LoserTexts';
import { ThemeScene } from './ThemeScene';
import { DecorativeElements } from './DecorativeElements';
import { scrollEvent } from '../../store/game/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTheme } from '../../themes';
import { getAnimationPackage } from '../../animations';

interface RevealProps {
  winner: string;
  losers: string[];
  onBack: () => void;
  onPickAgain: () => void;
}

const Reveal = ({ winner, losers, onBack, onPickAgain }: RevealProps) => {
  const dispatch = useAppDispatch();
  const { isScrollThrottled, currentThemeId, currentRevealStrategy, currentAnimationPackageId } =
    useAppSelector((state) => state.game);
  const revealRef = useRef<HTMLDivElement>(null);

  const theme = getTheme(currentThemeId);
  const animationPackage = getAnimationPackage(currentAnimationPackageId);
  const revealStrategy =
    theme.revealStrategies[currentRevealStrategy] || theme.revealStrategies.default;

  // Use custom animation components if available, otherwise fall back to default
  const WinnerComponent = animationPackage.WinnerComponent || WinnerText;
  const LoserComponent = animationPackage.LoserComponent || LoserTexts;
  const SceneEffects = animationPackage.SceneEffects;

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
        <ThemeScene theme={theme} />
        {SceneEffects && <SceneEffects />}
        <LoserComponent losers={losers} strategy={revealStrategy} />
        <WinnerComponent winner={winner} strategy={revealStrategy} />
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
