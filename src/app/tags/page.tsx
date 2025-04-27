import { Header } from "@/app/components/header";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { Footer } from "../components/footer";
import { Tag } from "../components/tags";


export default function Tags() {
  return (
    <>
      <Header />
      <HomeScreen>
        <Tag />
      </HomeScreen>
      <Footer />
    </>
  );
}
