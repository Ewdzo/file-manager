import { Header } from "@/app/components/header";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { Footer } from "../components/footer";
import { Search } from "../components/search";


export default function Files() {
  return (
    <>
      <Header />
      <HomeScreen>
        <Search />
      </HomeScreen>
      <Footer />
    </>
  );
}
