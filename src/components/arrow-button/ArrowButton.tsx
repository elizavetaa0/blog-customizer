import React, { useState } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

interface ArrowButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({ isOpen, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  const containerClassName = isOpen ? `${styles.container} ${styles.container_open}` : styles.container;

  return (
    <div
      role='button'
      aria-label='Открыть/Закрыть форму параметров статьи'
      tabIndex={0}
      className={containerClassName}
      onClick={handleClick}
    >
      <img
        src={arrow}
        alt='иконка стрелочки'
        className={isOpen ? styles.arrow_open : styles.arrow}
      />
    </div>
  );
};
