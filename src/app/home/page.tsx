import { Header } from "@/app/components/header";
import { Highlight } from "@/app/components/highlight";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { mockFile } from "@/app/helper/mock";


export default function Home() {
  return (
    <HomeScreen>
      <Header />
      <Highlight file={mockFile} />
    </HomeScreen>
  );
}
