import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/nav/Navbar";
import Footer from './Components/fotter/Footer'
import CartProvider from "@/Providers/CartProvider";



const poppins = Poppins({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "E-Bazzar",
  description: "Ecommerce App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`} >
        
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar/>
              <main className="flex-grow">{children}</main>
              <Footer />

            </div>
          </CartProvider>
       


      </body>

    </html>
  );
}
