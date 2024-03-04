import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form';
import { defaultArticleState } from './constants/articleProps';
import { ArrowButton } from './components/arrow-button';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [pageStyles, setPageStyles] = useState({
    '--font-family': defaultArticleState.fontFamilyOption.value,
    '--font-size': defaultArticleState.fontSizeOption.value,
    '--font-color': defaultArticleState.fontColor.value,
    '--container-width': defaultArticleState.contentWidth.value,
    '--bg-color': defaultArticleState.backgroundColor.value,
  });

  useEffect(() => {
    const savedState = localStorage.getItem('sideBarOpen');
    if (savedState) {
      setSideBarOpen(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('aside');
  
      if (
        sideBarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node)
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
    const newState = !sideBarOpen;
    setSideBarOpen(newState);
    localStorage.setItem('sideBarOpen', JSON.stringify(newState));
  };

  const applyStyles = (data: any) => {
    setPageStyles({
      '--font-family': data.fontFamily.value,
      '--font-size': data.fontSize.value,
      '--font-color': data.fontColor.value,
      '--container-width': data.contentWidth.value,
      '--bg-color': data.bgColor.value,
    });
  };

  return (
    <div
      className={clsx(styles.main, { [styles.sidebarOpen]: sideBarOpen })}
      style={pageStyles as CSSProperties}
    >
      <ArrowButton onClick={toggleSideBar} isOpen={sideBarOpen} />
      <ArticleParamsForm isOpen={sideBarOpen} toggleSideBar={toggleSideBar} applyStyles={applyStyles} />
      <Article />
    </div>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

export default App;
