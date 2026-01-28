"use client";
import React, { useState, useContext } from "react";

interface LayoutState {
  pageData: {};
  setPageData: React.Dispatch<React.SetStateAction<{}>>;
  theme: {
    color: string;
    font: string;
    darkMode: string;
  };
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      theme: {
        color: "pink",
        font: "sans",
        darkMode: "light",
      },
      pageData: undefined,
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  pageData: {};
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  pageData: initialPageData,
}) => {
  const [pageData, setPageData] = useState<{}>(initialPageData);

  const theme = {
    color: "pink",
    font: "sans",
    darkMode: "light",
  };

  return (
    <LayoutContext.Provider
      value={{
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
