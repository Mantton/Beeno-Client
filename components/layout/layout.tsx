import { ReactNode } from "react";
import FooterComponent from "../nav/footer";
import NavBar from "../nav/navbar";

interface LayoutInterface {
  children: ReactNode;
}
export default function Layout({ children }: LayoutInterface) {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <NavBar />
        <main className="min-h-screen ">{children}</main>
        <FooterComponent />
      </div>
    </>
  );
}
