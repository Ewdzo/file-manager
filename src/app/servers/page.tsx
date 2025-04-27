import { Header } from "@/app/components/header";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { Footer } from "../components/footer";
import { Server } from "../components/servers";


export default function Servers() {
  return (
    <>
      <Header />
      <HomeScreen>
        <Server />
      </HomeScreen>
      <Footer />
    </>
  );
}
