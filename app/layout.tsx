import type { Metadata } from "next";

import "./globals.css";
import ReduxProvider from "@/redux/provider";
import PwaBootstrap from "@/components/pwa/PwaBootstrap";


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
        <ReduxProvider>
          <PwaBootstrap />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
