import React, { useState, useEffect } from 'react';

export const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem('portfolio_visited');
        const storedCount = localStorage.getItem('portfolio_total_views');
        let currentCount = parseInt(storedCount || '1500', 10);

        // If first visit in this session, increment the count
        if (!hasVisited) {
          currentCount += 1;
          localStorage.setItem('portfolio_total_views', currentCount.toString());
          sessionStorage.setItem('portfolio_visited', 'true');
        }

        // Try to fetch from external API (optional enhancement)
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);

          const response = await fetch('https://api.countapi.xyz/hit/shanewaz-aurnob.com/visits', {
            signal: controller.signal
          });

          if (response.ok) {
            const data = await response.json();
            // Use API count if it's higher than local count
            if (data.value > currentCount) {
              currentCount = data.value;
              localStorage.setItem('portfolio_total_views', currentCount.toString());
            }
          }

          clearTimeout(timeoutId);
        } catch (apiError) {
          // If API fails, just use the incremented local count
          console.log('Using local visitor count as fallback');
        }

        setCount(currentCount);
        setIsLoading(false);
      } catch (error) {
        console.error('Error in visitor counter:', error);
        // Fallback to default count
        setCount(1500);
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  if (isLoading) {
    return null;
  }

  if (count === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 bg-white/[0.02] text-center">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-bold">
          Visitors
        </span>
      </div>
      <span className="text-xs sm:text-sm font-mono font-bold text-white">
        {count.toLocaleString()}
      </span>
    </div>
  );
};

export default VisitorCounter;
