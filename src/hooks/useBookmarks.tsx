
import React, { createContext, useContext, useState, useEffect } from 'react';

interface BookmarksContextType {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const BookmarksProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('hr-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hr-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => 
      prev.includes(id) 
        ? prev.filter(bookmarkId => bookmarkId !== id)
        : [...prev, id]
    );
  };

  const isBookmarked = (id: number) => bookmarks.includes(id);

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};
