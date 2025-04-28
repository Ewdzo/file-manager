import { Header } from "@/app/components/header";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { Footer } from "../components/footer";
import { Servers } from "../components/servers";


export default function ServerPage() {
  return (
    <>
      <Header />
      <HomeScreen>
        <Servers />
      </HomeScreen>
      <Footer />
    </>
  );
}
