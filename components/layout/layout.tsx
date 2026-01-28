"use client";

import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import { Header } from "./nav/header";
import { usePathname } from "next/navigation";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default function Layout({ children, rawPageData }: LayoutProps) {
  const pathname = usePathname();
  
  // Determine if we should remove top padding for full-width image overlap
  // For 'Equipes' and 'Contact', we want the content to start at the very top (under the header)
  const isTransparentHeaderPage = pathname === "/Equipes" || pathname === "/Contact";

  return (
    <LayoutProvider pageData={rawPageData}>
      <Header />
      <main className={`overflow-x-hidden ${isTransparentHeaderPage ? '' : 'pt-32'}`}>
        {children}
      </main>
    </LayoutProvider>
  );
}
