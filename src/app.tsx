import { useState, useEffect, CSSProperties, useRef } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';
import clsx from 'clsx';
import { ArrowButton } from './components/arrow-button';
import styles from './styles/index.module.scss';

export const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const cssVariables = {
    fontFamily: '--font-family',
    fontSize: '--font-size',
    fontColour: '--font-color',
    containerWidth: '--container-width',
    bgColour: '--bg-color'
  };

  const [pageStyles, setPageStyles] = useState({
    [cssVariables.fontFamily]: defaultArticleState.fontFamilyOption.value,
    [cssVariables.fontSize]: defaultArticleState.fontSizeOption.value,
    [cssVariables.fontColour]: defaultArticleState.fontColor.value,
    [cssVariables.containerWidth]: defaultArticleState.contentWidth.value,
    [cssVariables.bgColour]: defaultArticleState.backgroundColor.value,
  });

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedState = localStorage.getItem('sideBarOpen');
    if (savedState) {
      setSideBarOpen(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideBarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSideBarOpen(false);
        localStorage.setItem('sideBarOpen', JSON.stringify(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sideBarOpen]);

  const toggleSideBar = () => {
    setSideBarOpen(prevState => !prevState);
  };

  const applyStyles = (data: ArticleStateType) => {
    setPageStyles({
      [cssVariables.fontFamily]: data.fontFamilyOption.value,
      [cssVariables.fontSize]: data.fontSizeOption.value,
      [cssVariables.fontColour]: data.fontColor.value,
      [cssVariables.containerWidth]: data.contentWidth.value,
      [cssVariables.bgColour]: data.backgroundColor.value,
    });
  };

  return (
    <main className={styles.main} style={pageStyles as CSSProperties}>
      <div className={clsx(styles.container, { [styles.container_open]: sideBarOpen })} ref={sidebarRef}>
        <ArrowButton onClick={toggleSideBar} isOpen={sideBarOpen} />
        <ArticleParamsForm isOpen={sideBarOpen} toggleSideBar={toggleSideBar} applyStyles={applyStyles} />
      </div>
      <Article />
    </main>
  );

};
