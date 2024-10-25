import { useTranslations } from "next-intl";
export function useHandleTranslations<T extends Record<string, string>>(namespace: string): T {
  const t = useTranslations(namespace);
  return new Proxy({} as T, {
    get: (_, key: string) => {
      return t(key as keyof T);
    },
  });
}
