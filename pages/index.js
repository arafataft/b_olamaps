import Image from "next/image";
import { Inter } from "next/font/google";
import OlaMaps from "@/components/OlaMaps";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <OlaMaps />
  );
}
