import type React from "react";
import { useLocation } from "react-router-dom";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const location = useLocation();
  const avoidPages = ["/create", "/edit"];
  return <div className="text-white w-full h-full">{children}</div>;
}
