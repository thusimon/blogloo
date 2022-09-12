import React, { ReactElement, ReactNode, useState } from 'react';

import './DropDown.scss';

interface DropDownPropsType {
  children: ReactNode[];
  selectCallBack: (idx: number) => void; 
}

const DropDown = ({children, selectCallBack} : DropDownPropsType) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectIdx, setSelectIdx] = useState(0);

  const onClickShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleUpdateIdx = (idx: number) => {
    setSelectIdx(idx);
    setShowDropDown(false);
    selectCallBack(idx);
  };

  return <div className='dropdown-container'>
    <div className='dropdown-current-item' onClick={onClickShowDropDown}>{children[selectIdx]}</div>
    <ul className={`dropdown-list ${showDropDown ? '' : 'dropdown-list-hide'}`}>
      {children.map((child, idx) => {
        return <li key={`dropdown-list-item-${idx}`}
          className='dropdown-list-item'
          onClick={() => handleUpdateIdx(idx)}>{child}</li>
      })}
    </ul>
  </div>
}

export default DropDown;
