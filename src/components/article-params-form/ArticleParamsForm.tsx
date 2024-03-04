import React, { useState, useEffect } from 'react';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group'; 
import { Select } from '../select';
import styles from './ArticleParamsForm.module.scss';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
  isOpen: boolean;
  toggleSideBar: () => void;
  applyStyles: (data: any) => void; 
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ isOpen, toggleSideBar, applyStyles }) => {
  const [formData, setFormData] = useState({
    fontFamily: fontFamilyOptions[0],
    fontSize: fontSizeOptions[0],
    fontColor: fontColors[0],
    bgColor: backgroundColors[0],
    contentWidth: contentWidthArr[0],
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleFontSelect = (option: any) => {
    setFormData({ ...formData, fontFamily: option });
  };

  const handleFontSizeSelect = (option: any) => {
    setFormData({ ...formData, fontSize: option });
  };

  const handleFontColorSelect = (option: any) => {
    setFormData({ ...formData, fontColor: option });
  };

  const handleBackgroundColorSelect = (option: any) => {
    setFormData({ ...formData, bgColor: option });
  };

  const handleContentWidthSelect = (option: any) => {
    setFormData({ ...formData, contentWidth: option });
  };

  const handleResetClick = () => {
    setFormData({
      fontFamily: fontFamilyOptions[0],
      fontSize: fontSizeOptions[0],
      fontColor: fontColors[0],
      bgColor: backgroundColors[0],
      contentWidth: contentWidthArr[0],
    });
    applyStyles({
      fontFamily: fontFamilyOptions[0],
      fontSize: fontSizeOptions[0],
      fontColor: fontColors[0],
      bgColor: backgroundColors[0],
      contentWidth: contentWidthArr[0],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyStyles(formData); 
    toggleSideBar(); 
  };

  return (
    <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Задайте параметры</h2>
        <Select
          options={fontFamilyOptions}
          selected={formData.fontFamily}
          onChange={handleFontSelect}
          title="Шрифт"
        />

        <RadioGroup
          name="fontSize"
          options={fontSizeOptions}
          selected={formData.fontSize}
          onChange={handleFontSizeSelect}
          title="Размер шрифта"
        />

        <Select
          options={fontColors}
          selected={formData.fontColor}
          onChange={handleFontColorSelect}
          title="Цвет шрифта"
        />

        <hr />

        <Separator />

        <Select
          options={backgroundColors}
          selected={formData.bgColor}
          onChange={handleBackgroundColorSelect}
          title="Цвет фона"
        />

        <Select
          options={contentWidthArr}
          selected={formData.contentWidth}
          onChange={handleContentWidthSelect}
          title="Ширина контента"
        />

        <div className={styles.bottomContainer}>
          <Button onClick={handleResetClick} title='Сбросить' type='reset' />
          <Button type='submit' title='Применить'/>
        </div>
      </form>
    </aside>
  );
};

export default ArticleParamsForm;
