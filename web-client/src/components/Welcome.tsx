import './Welcome.scss';

const Welcome = (): JSX.Element => {
  return <div className='welcome-container'>
    <div className='main-title'>WELCOME TO <span>BLOGLOO</span></div>
    <div className='second-title'>articles by Utticus</div>
  </div>;
};

export default Welcome;
