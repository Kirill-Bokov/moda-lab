import type { ReactNode } from "react";

type DataLoaderProps = {
  isLoading: boolean;
  error: unknown;
  children: ReactNode;
  loadingText?: string;
  errorText?: string;
};

export function DataLoader({
  isLoading,
  error,
  children,
  loadingText = "Загрузка...",
  errorText = "Ошибка при загрузке",
}: DataLoaderProps) {
  if (isLoading) return <p>{loadingText}</p>;
  if (error) return <p>{errorText}</p>;
  return <>{children}</>;
}
