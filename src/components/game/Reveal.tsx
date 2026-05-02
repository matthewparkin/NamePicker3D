import { useEffect, useRef } from 'react';
import { SceneManager } from './SceneManager';
import { scrollEvent } from '../../store/game/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTheme } from '../../config/themes';
import { getScene } from '../../config/scenes';

interface RevealProps {
  winner: string;
  losers: string[];
  onBack: () => void;
  onPickAgain: () => void;
}

const Reveal = ({ winner, losers, onBack, onPickAgain }: RevealProps) => {
  const dispatch = useAppDispatch();
  const { isScrollThrottled, currentThemeId, currentRevealStrategy, currentSceneId } =
    useAppSelector((state) => state.game);
  const revealRef = useRef<HTMLDivElement>(null);

  const theme = getTheme(currentThemeId);
  const scene = getScene(currentSceneId);
  const revealStrategy =
    theme.revealStrategies[currentRevealStrategy] || theme.revealStrategies.default;

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
      <SceneManager
        theme={theme}
        scene={scene}
        winner={winner}
        losers={losers}
        revealStrategy={revealStrategy}
      />

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
