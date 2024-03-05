"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme primereact
import "primereact/resources/primereact.min.css";
import "simplebar-react/dist/simplebar.min.css";
import "primeicons/primeicons.css";
import "./globals.css";
import ReactQueryProvider from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"font-inter custom-tippy"}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
