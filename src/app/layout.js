import { Inter } from "next/font/google";
import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Puzzle-Panda",
  description: "Next Generation Quiz Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
