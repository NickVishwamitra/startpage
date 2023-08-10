import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { extendDayjs } from "@/lib/utils";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  extendDayjs();
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
