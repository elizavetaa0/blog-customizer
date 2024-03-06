import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group'; 
import { Select } from '../select';
import styles from './ArticleParamsForm.module.scss';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { Text } from '../text';
import { OptionType, ArticleStateType } from 'src/constants/articleProps';

interface ArticleParamsFormProps {
  isOpen: boolean;
  toggleSideBar: () => void;
  applyStyles: (data: ArticleStateType) => void; 
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ isOpen, toggleSideBar, applyStyles }) => {
  const [formData, setFormData] = useState<ArticleStateType>({
    fontFamilyOption: fontFamilyOptions[0],
    fontSizeOption: fontSizeOptions[0],
    fontColor: fontColors[0],
    backgroundColor: backgroundColors[0],
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

  const handleFontSelect = (option: OptionType) => {
    setFormData({ ...formData, fontFamilyOption: option });
  };

  const handleFontSizeSelect = (option: OptionType) => {
    setFormData({ ...formData, fontSizeOption: option });
  };

  const handleFontColorSelect = (option: OptionType) => {
    setFormData({ ...formData, fontColor: option });
  };

  const handleBackgroundColorSelect = (option: OptionType) => {
    setFormData({ ...formData, backgroundColor: option });
  };

  const handleContentWidthSelect = (option: OptionType) => {
    setFormData({ ...formData, contentWidth: option });
  };

  const handleResetClick = () => {
    setFormData({
      fontFamilyOption: fontFamilyOptions[0],
      fontSizeOption: fontSizeOptions[0],
      fontColor: fontColors[0],
      backgroundColor: backgroundColors[0],
      contentWidth: contentWidthArr[0],
    });
    applyStyles({
      fontFamilyOption: fontFamilyOptions[0],
      fontSizeOption: fontSizeOptions[0],
      fontColor: fontColors[0],
      backgroundColor: backgroundColors[0],
      contentWidth: contentWidthArr[0],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyStyles(formData); 
    toggleSideBar(); 
  };

  return (
    <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Text as="h2" size={31} weight={800} uppercase={true} fontStyle='normal'>Задайте параметры</Text>
        <Select
          options={fontFamilyOptions}
          selected={formData.fontFamilyOption}
          onChange={handleFontSelect}
          title="Шрифт"
        />

        <RadioGroup
          name="fontSize"
          options={fontSizeOptions}
          selected={formData.fontSizeOption}
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
          selected={formData.backgroundColor}
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
