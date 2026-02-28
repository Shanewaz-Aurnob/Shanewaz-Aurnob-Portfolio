import { useState, useEffect } from 'react';

interface ScholarCitationData {
  citations: number;
  isLoading: boolean;
  error: string | null;
}

// Default fallback citations (matches your current hardcoded values)
const FALLBACK_CITATIONS: Record<string, number> = {
  'Crisis Response through Social Cues Analysis': 0,
  'Exploring media consumption and mental health among young adults during the second wave of COVID-19 in Bangladesh': 4,
};

// Cache key prefix
const CACHE_PREFIX = 'scholar_citation_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheData {
  citations: number;
  timestamp: number;
}

const isCacheValid = (cacheData: CacheData): boolean => {
  const now = Date.now();
  return now - cacheData.timestamp < CACHE_DURATION;
};

/**
 * Custom hook to fetch citation counts from Google Scholar
 * Implements caching, error handling, and fallback values
 * @param title - Paper/thesis title
 * @param fallbackCitations - Default citation count if fetch fails
 * @returns Object with citations, loading state, and error status
 */
export const useScholarCitations = (
  title: string,
  fallbackCitations: number
): ScholarCitationData => {
  const [citations, setCitations] = useState<number>(fallbackCitations);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no title provided, use fallback immediately
    if (!title || !title.trim()) {
      setCitations(fallbackCitations);
      setIsLoading(false);
      return;
    }

    const fetchCitations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const cacheKey = `${CACHE_PREFIX}${title}`;
        
        // Check if we have cached data
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          try {
            const parsedCache: CacheData = JSON.parse(cachedData);
            if (isCacheValid(parsedCache)) {
              setCitations(parsedCache.citations);
              setIsLoading(false);
              return;
            }
          } catch (cacheError) {
            console.warn('Cache parsing error:', cacheError);
            localStorage.removeItem(cacheKey);
          }
        }

        // Fetch from API endpoint
        const response = await fetch('/api/scholar-citations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const fetchedCitations = data.citations ?? fallbackCitations;

        // Cache the result
        const cacheData: CacheData = {
          citations: fetchedCitations,
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));

        setCitations(fetchedCitations);
      } catch (err) {
        console.warn(`Failed to fetch citations for "${title}":`, err);
        // Use fallback on error
        setCitations(fallbackCitations);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCitations();
  }, [title, fallbackCitations]);

  return { citations, isLoading, error };
};
