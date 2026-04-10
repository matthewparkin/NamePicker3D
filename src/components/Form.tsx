import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  names: string;
}

interface FormProps {
  initialNames: string[];
  onPick: (names: string[]) => void;
}

const Form = ({ initialNames, onPick }: FormProps) => {
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: { names: initialNames.join('\n') },
  });

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

  return (
    <div className="form">
      <div className="form-content">
        <h1>Name Reveal</h1>
        <p className="form-subtitle">Enter one name per line and reveal a winner in 3D.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('names')}
            placeholder="Enter names, one per line"
            className="name-list"
          />
          <button type="submit" className="submit-button">
            Pick Random Name
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
