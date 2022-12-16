import { useEffect, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Actions, useAppContext } from '../context/app-context';
import closeIcon from '../assets/images/close.svg';

const Preference = (): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    void i18n.changeLanguage(state.locale);
  }, [state.locale]);

  const onCloseClick = (): void => {
    dispatch({ type: Actions.TogglePrefModal, data: {} });
  };

  const getSelectedFontClass = (size: string): string => {
    return state.fontSize === size ? 'underline underline-offset-2' : '';
  };

  const onFontButtonClick = (evt: MouseEvent<HTMLButtonElement>): void => {
    const dataFont = evt.currentTarget.getAttribute('data-size');
    dispatch({ type: Actions.UpdateFontSize, data: { fontSize: dataFont } });
  };

  const displayClass = state.prefModal ? 'block' : 'hidden';
  return <div className={`${displayClass} absolute inset-y-0 inset-x-0 text-black backdrop-blur-[2px] z-10`}>
    <div className='absolute top-1/4 inset-x-1/4 overflow-hidden border-2 rounded-md border-neutral-800 border-solid drop-shadow-md bg-neutral-800'>
      <div className='flex items-center justify-between px-[4px] text-slate-100'>
        <div>{t('preference')}</div>
        <img className='cursor-pointer sepia-0 hover:sepia-[.8]' src={closeIcon} alt={t('close') ?? 'Close'} onClick={onCloseClick}></img>
      </div>
      <div className='flex flex-col bg-slate-100'>
        <div className='flex my-[12px]'>
          <label className='text-center w-1/5'>{`${t('font')}:`}</label>
          <div className='flex justify-evenly grow'>
            <button className={`${getSelectedFontClass('small')} hover:text-slate-500`} data-size='small' onClick={onFontButtonClick}>{t('small')}</button>
            <button className={`${getSelectedFontClass('normal')} hover:text-slate-500`} data-size='normal' onClick={onFontButtonClick}>{t('normal')}</button>
            <button className={`${getSelectedFontClass('large')} hover:text-slate-500`} data-size='large' onClick={onFontButtonClick}>{t('large')}</button>
            <button className={`${getSelectedFontClass('xlarge')} hover:text-slate-500`} data-size='xlarge' onClick={onFontButtonClick}>{t('xlarge')}</button>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Preference;
