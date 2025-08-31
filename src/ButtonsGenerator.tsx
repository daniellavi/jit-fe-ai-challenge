
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress, ButtonGroup, Button, TextField } from '@mui/material';
import Toast from './components/Toast';
import { generateComponentHTML } from './api/openai';
import { buildComponentPrompt } from './api/promptBuilder';
import { inputConfigs, type FormFields } from './types';


const ButtonsGenerator = () => {
  const { register, handleSubmit, reset, watch, formState } = useForm<FormFields>();
  const { isSubmitting } = formState;
  const [error, setError] = useState('');
  const [buttonHTML, setButtonHTML] = useState('');
  const [inputMode, setInputMode] = useState<'style' | 'regular'>('style');

  const onSubmit = async (data: FormFields) => {
    setError('');
    setButtonHTML('');
    try {
      const props = { ...data };
      if (props.style?.trim()) {
        props.color = undefined;
        props.size = undefined;
      }
      const prompt = buildComponentPrompt({ type: 'button', props });
      const html = await generateComponentHTML(prompt, 'button');
      setButtonHTML(html);
      reset();
    } catch (err: any) {
      setError(err.message || 'Failed to generate button.');
    }
  };

  const watchedFields = watch();
  const isTextFilled = Boolean(watchedFields.text?.trim());
  const isStyleFilled = Boolean(watchedFields.style?.trim());
  const isColorAndSizeFilled = Boolean(watchedFields.color?.trim()) && Boolean(watchedFields.size?.trim());
  const isAnyFieldEmpty = !isTextFilled || !(isStyleFilled || isColorAndSizeFilled);

  return (
    <div className="container">
      <div className="title">Buttons Generator</div>
      <Toast
        open={!!error}
        message={error}
        severity="error"
        autoHideDuration={4000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <ButtonGroup>
        <Button
          variant={inputMode === 'style' ? 'contained' : 'outlined'}
          onClick={() => setInputMode('style')}
        >
          <span className="field">Style</span>
        </Button>
        <Button
          variant={inputMode === 'regular' ? 'contained' : 'outlined'}
          onClick={() => setInputMode('regular')}
        >
          <span className="field">Color & Size</span>
        </Button>
      </ButtonGroup>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input-group">
          <div className="input-group-label">{inputConfigs.text.label}</div>
          <TextField
            id="text"
            {...register('text', { required: true })}
            type="text"
            placeholder={inputConfigs.text.placeholder}
            required
            variant="outlined"
            size="small"
            className="input-group-input"
            fullWidth
          />
        </div>
        {inputMode === 'style' ? (
          <div className="input-group">
            <div className="input-group-label">{inputConfigs.style.label}</div>
            <TextField
              id="style"
              {...register('style')}
              type="text"
              placeholder={inputConfigs.style.placeholder}
              variant="outlined"
              size="small"
              className="input-group-input"
              fullWidth
            />
          </div>
        ) : (
          <>
            <div className="input-group">
              <div className="input-group-label">{inputConfigs.color.label}</div>
              <TextField
                id="color"
                {...register('color')}
                type="text"
                placeholder={inputConfigs.color.placeholder}
                variant="outlined"
                size="small"
                className="input-group-input"
                fullWidth
              />
            </div>
            <div className="input-group">
              <div className="input-group-label">{inputConfigs.size.label}</div>
              <TextField
                id="size"
                {...register('size')}
                type="text"
                placeholder={inputConfigs.size.placeholder}
                variant="outlined"
                size="small"
                className="input-group-input"
                fullWidth
              />
            </div>
          </>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || isAnyFieldEmpty}
          className="generate-btn"
          fullWidth
        >
          {isSubmitting ? <CircularProgress size={22} /> : <span>Generate Button</span>}
        </Button>
      </form>
      <div className="result">
        {buttonHTML && (
          <div
            dangerouslySetInnerHTML={{ __html: buttonHTML }}
          />
        )}
      </div>
    </div>
  );
};

export default ButtonsGenerator;
