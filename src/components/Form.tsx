import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme, setScene } from '../store/game/actions';
import { allThemes } from '../config/themes';
import { allScenes } from '../config/scenes';

interface FormData {
  names: string;
}

interface FormProps {
  initialNames: string[];
  onPick: (names: string[]) => void;
}

const Form = ({ initialNames, onPick }: FormProps) => {
  const dispatch = useAppDispatch();
  const currentThemeId = useAppSelector((state) => state.game.currentThemeId);
  const currentSceneId = useAppSelector((state) => state.game.currentSceneId);
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: { names: initialNames.join('\n') },
  });

  const currentTheme = allThemes.find((t) => t.id === currentThemeId) || allThemes[0];
  const currentScene = allScenes.find((s) => s.id === currentSceneId) || allScenes[0];

  useEffect(() => {
    if (initialNames.length > 0) {
      setValue('names', initialNames.join('\n'));
    }
  }, [initialNames, setValue]);

  const onSubmit = (data: FormData) => {
    const names = data.names
      .split('\n')
      .map((name) => name.trim())
      .filter(Boolean);

    if (names.length === 0) return;
    onPick(names);
  };

  const themeStyle = currentTheme.style;

  return (
    <div
      className="form"
      style={{
        background: themeStyle.backgroundColor,
      }}
    >
      <div className="form-content" style={{ borderColor: themeStyle.borderColor }}>
        <h1 style={{ color: themeStyle.textColor }}>Name Reveal</h1>
        <p className="form-subtitle">Enter one name per line and reveal a winner in 3D.</p>

        <div className="scene-selector">
          <label htmlFor="scene-select" style={{ color: themeStyle.textColor }}>
            Scene:
          </label>
          <select
            id="scene-select"
            value={currentSceneId}
            onChange={(e) => dispatch(setScene(e.target.value))}
            style={{
              backgroundColor: themeStyle.buttonColor,
              color: themeStyle.textColor,
              borderColor: themeStyle.accentColor,
            }}
          >
            {allScenes.map((scene) => (
              <option key={scene.id} value={scene.id}>
                {scene.name}
              </option>
            ))}
          </select>
          <p className="selector-description" style={{ color: themeStyle.textColor, opacity: 0.7 }}>
            {currentScene.name}: Game mechanics and animation style.
          </p>
        </div>

        <div className="theme-selector">
          <label htmlFor="theme-select" style={{ color: themeStyle.textColor }}>
            Theme:
          </label>
          <select
            id="theme-select"
            value={currentThemeId}
            onChange={(e) => dispatch(setTheme(e.target.value))}
            style={{
              backgroundColor: themeStyle.buttonColor,
              color: themeStyle.textColor,
              borderColor: themeStyle.accentColor,
            }}
          >
            {allThemes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <p className="selector-description" style={{ color: themeStyle.textColor, opacity: 0.7 }}>
            {currentTheme.name}: Colors and visual style.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('names')}
            placeholder="Enter names, one per line"
            className="name-list"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: themeStyle.textColor,
              borderColor: themeStyle.borderColor,
            }}
          />
          <button
            type="submit"
            className="submit-button"
            style={{
              backgroundColor: themeStyle.buttonColor,
              color: themeStyle.textColor,
            }}
          >
            Pick Random Name
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
