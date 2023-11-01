import React, { useEffect, useRef } from 'react';
import './test.css';

const BG = () => {
  const subcontainerRef = useRef(null);

  const randomZposition = () => {
    const randomNumber = Math.floor(Math.random() * 2000) + 1;
    return randomNumber % 2 === 0 ? randomNumber : -randomNumber;
  };

  const randomBlur = (zPosition) => {
    const positivePositionValue = Math.abs(zPosition);
    const positionString = positivePositionValue.toString().padStart(4, '0');
    const stringArr = positionString.split('');
    stringArr.splice(2, 0, '.');
    return stringArr.join('');
  };

  useEffect(() => {
    const subcontainer = subcontainerRef.current;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const circle = document.createElement('div');
      const position = randomZposition();
      circle.classList.add('circle');
      circle.style.top = `${Math.floor(Math.random() * window.innerHeight) + 1}px`;
      circle.style.left = `${Math.floor(Math.random() * window.innerWidth) + 1}px`;
      circle.style.setProperty('--z-position', `${position}px`);
      circle.style.setProperty('--blur-value', `${randomBlur(position)}px`);
      circle.style.setProperty('--hue', `${Math.floor(Math.random() * 361)}`);
      fragment.appendChild(circle);
    }
    subcontainer.appendChild(fragment);
  }, [subcontainerRef]);

  return (
    <div className='container5'>
      <div className='subcontainer' ref={subcontainerRef}></div>
    </div>
  );
};

export default BG;
