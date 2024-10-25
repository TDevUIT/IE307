'use client'
import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";
import { AdminSidebar } from "@/lib/admin.type";

interface SidebarContextProps {
  selected: keyof typeof AdminSidebar;
  setSelected: Dispatch<SetStateAction<keyof typeof AdminSidebar>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<keyof typeof AdminSidebar>("Dashboard");

  useEffect(() => {
    const savedSelected = localStorage.getItem("selectedSidebar");
    if (savedSelected) {
      setSelected(savedSelected as keyof typeof AdminSidebar);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSidebar", selected);
  }, [selected]);

  return (
    <SidebarContext.Provider value={{ selected, setSelected }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
