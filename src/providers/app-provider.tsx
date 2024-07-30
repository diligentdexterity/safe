"use client";
import { AllVariantsWithCustomFieldType } from "@/types";
import { Card, Password } from "@prisma/client";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";

type AppContextT = {
  selectedField: AllVariantsWithCustomFieldType | null;

  formState: "empty" | "read" | "new";
  setFormState: Dispatch<SetStateAction<"empty" | "read" | "new">>;
  setSelectedField: Dispatch<SetStateAction<AllVariantsWithCustomFieldType | null>>;
};

export const AppContext = createContext<AppContextT>({
  selectedField: null,
  formState: "empty",
  setFormState: () => {},
  setSelectedField: () => {},
});

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedField, setSelectedField] = useState<AllVariantsWithCustomFieldType | null>(null);

  const [formState, setFormState] = useState<"empty" | "read" | "new">("empty");

  useEffect(() => {
    if (selectedField) {
      setFormState("read");
    }
  }, [selectedField]);

  useEffect(() => {
    if (formState === "new") {
      setSelectedField(null);
    }
  }, [formState]);

  return (
    <AppContext.Provider
      value={{
        selectedField: selectedField,
        formState,
        setFormState,
        setSelectedField,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const app = useContext(AppContext);
  return app;
};
