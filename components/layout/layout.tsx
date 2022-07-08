import { ReactNode } from "react";
import Footer from "../nav/footer";
import Header from "../nav/header";

interface LayoutInterface {
  children: ReactNode;
}
export default function Layout({ children }: LayoutInterface) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
