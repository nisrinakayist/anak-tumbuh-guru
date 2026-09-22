import type { Metadata } from "next";

import "./globals.css";
import ReduxProvider from "@/redux/provider";


export const metadata: Metadata = {
  title: "ANAKTUMBUH.ID | Wali Kelas",
  description: "Sistem Pemantauan 7 Kebiasaan Anak Indonesia Hebat",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="id">
      <body className={`antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
