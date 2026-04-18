import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme, setAnimationPackage } from '../store/game/actions';
import { allThemes } from '../themes';
import { allAnimationPackages } from '../animations';

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
  const currentAnimationPackageId = useAppSelector((state) => state.game.currentAnimationPackageId);
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: { names: initialNames.join('\n') },
  });

  const currentTheme = allThemes.find((t) => t.id === currentThemeId) || allThemes[0];
  const currentAnimationPackage =
    allAnimationPackages.find((p) => p.id === currentAnimationPackageId) || allAnimationPackages[0];

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

  const formTheme = currentTheme.formTheme;

  return (
    <div
      className="form"
      style={{
        background: formTheme.backgroundColor,
      }}
    >
      <div className="form-content" style={{ borderColor: formTheme.borderColor }}>
        <h1 style={{ color: formTheme.textColor }}>Name Reveal</h1>
        <p className="form-subtitle">Enter one name per line and reveal a winner in 3D.</p>

        <div className="theme-selector">
          <label htmlFor="theme-select" style={{ color: formTheme.textColor }}>
            Theme:
          </label>
          <select
            id="theme-select"
            value={currentThemeId}
            onChange={(e) => dispatch(setTheme(e.target.value))}
            style={{
              backgroundColor: formTheme.buttonBackground,
              color: formTheme.textColor,
              borderColor: formTheme.accentColor,
            }}
          >
            {allThemes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <p className="selector-description" style={{ color: formTheme.textColor, opacity: 0.7 }}>
            {currentTheme.name}: Changes the 3D environment and lighting.
          </p>
        </div>

        <div className="animation-selector">
          <label htmlFor="animation-select" style={{ color: formTheme.textColor }}>
            Animation:
          </label>
          <select
            id="animation-select"
            value={currentAnimationPackageId}
            onChange={(e) => dispatch(setAnimationPackage(e.target.value))}
            style={{
              backgroundColor: formTheme.buttonBackground,
              color: formTheme.textColor,
              borderColor: formTheme.accentColor,
            }}
          >
            {allAnimationPackages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>
          <p className="selector-description" style={{ color: formTheme.textColor, opacity: 0.7 }}>
            {currentAnimationPackage.description}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('names')}
            placeholder="Enter names, one per line"
            className="name-list"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: formTheme.textColor,
              borderColor: formTheme.borderColor,
            }}
          />
          <button
            type="submit"
            className="submit-button"
            style={{
              backgroundColor: formTheme.buttonBackground,
              color: formTheme.textColor,
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
