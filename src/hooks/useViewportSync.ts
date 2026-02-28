import { useEffect } from 'react';

export const useViewportSync = (): void => {
  useEffect(() => {
    const getViewportType = () => window.innerWidth < 768 ? 'mobile' : 'desktop';
    let previousViewportType = getViewportType();
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const currentViewportType = getViewportType();

        if (previousViewportType !== currentViewportType) {
          previousViewportType = currentViewportType;
          sessionStorage.setItem('portfolio_scroll_position', window.scrollY.toString());
          window.location.reload();
        }
      }, 250);
    };

    const restoreScrollPosition = () => {
      const savedScrollPosition = sessionStorage.getItem('portfolio_scroll_position');
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition));
        sessionStorage.removeItem('portfolio_scroll_position');
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', restoreScrollPosition);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', restoreScrollPosition);
      clearTimeout(resizeTimeout);
    };
  }, []);
};
