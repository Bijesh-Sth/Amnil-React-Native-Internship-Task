import React, {createContext, useState} from 'react';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface AppContextType {
  quotes: Quote | null;
  setQuotes: (quotes: Quote | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  message: string;
  setMessage: (message: string) => void;
}

const initialContext: AppContextType = {
  quotes: null,
  setQuotes: () => {},
  loading: true,
  setLoading: () => {},
  message: '',
  setMessage: () => {},
};

export const AppContext = createContext<AppContextType>(initialContext);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [quotes, setQuotes] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const contextValue: AppContextType = {
    quotes,
    setQuotes,
    loading,
    setLoading,
    message,
    setMessage,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
