import { ReactNode } from "react";
import FooterComponent from "../nav/footer";
import NavBar from "../nav/navbar";

interface LayoutInterface {
  children: ReactNode;
}
export default function Layout({ children }: LayoutInterface) {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <NavBar />
        <main>{children}</main>
        <FooterComponent />
      </div>
    </>
  );
}
