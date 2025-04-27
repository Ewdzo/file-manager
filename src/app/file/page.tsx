import { Header } from "@/app/components/header";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { DetailsBanner } from "../components/banner/details";
import { Details } from "../components/details";
import { Footer } from "../components/footer";
import { mockFile } from "../helper/mock";


export default function File() {
  const file = mockFile;

  return (
    <>
      <Header />
      <HomeScreen>
        <DetailsBanner file={file} />
        <Details file={file} />
      </HomeScreen>
      <Footer />
    </>
  );
}
