import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Actions, useAppContext } from '../context/app-context';
import closeIcon from '../assets/images/close.svg';

const Preference = (): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const { t, i18n } = useTranslation();
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    void i18n.changeLanguage(state.locale);
  }, [state.locale]);

  const onCloseClick = (): void => {
    dispatch({ type: Actions.TogglePrefModal, data: {} });
  };

  const displayClass = state.prefModal ? 'block' : 'hidden';
  return <div className={`${displayClass} absolute inset-y-0 inset-x-0 text-black backdrop-blur-sm`}>
    <div className='absolute top-1/4 inset-x-1/4 overflow-hidden border-2 rounded-md border-neutral-800 border-solid drop-shadow-md bg-neutral-800'>
      <div className='flex items-center justify-between px-[4px] text-slate-100'>
        <div>{t('preference')}</div>
        <img className='cursor-pointer sepia-0 hover:sepia-[.8]' src={closeIcon} alt={t('close') ?? 'Close'} onClick={onCloseClick}></img>
      </div>
    </div>
  </div>;
};

export default Preference;
