import { Banner } from "@/app/components/banner";
import { Header } from "@/app/components/header";
import { Highlight } from "@/app/components/highlight";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { mockFile, mockSection } from "@/app/helper/mock";


export default function Home() {
  return (
    <HomeScreen>
      <Header />
      <Banner file={mockFile} />
      <Highlight sections={[mockSection]}/>
    </HomeScreen>
  );
}
