"use client";
import { createContext, useContext, useState } from "react";
import { ItemSelectContextProps } from "../type";

export const ItemSelectContext = createContext<ItemSelectContextProps | null>(
  null
);

export const ItemsSelectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentItem, setCurrentItem] = useState<
    "pointer" | "rectangle" | "circle" | null
  >("pointer");

  const newItemSelect = (item: "pointer" | "rectangle" | "circle" | null) => {
    setCurrentItem(item);
  };

  return (
    <ItemSelectContext.Provider
      value={{ itemSelect: currentItem, setItemSelect: newItemSelect }}
    >
      {children}
    </ItemSelectContext.Provider>
  );
};

export const useSelectItem = () => {
  const context = useContext(ItemSelectContext);
  if (!context) {
    throw new Error("UseContext must be within the ItemSelectProvider");
  }
  return context;
};
