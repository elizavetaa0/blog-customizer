import React from 'react';
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
  const arrowClassName = isOpen ? `${styles.arrow} ${styles.arrow_open}` : styles.arrow;

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
        className={arrowClassName}
      />
    </div>
  );
};

