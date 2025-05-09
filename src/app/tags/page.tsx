import { Header } from "@/app/components/header";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { Footer } from "../components/footer";
import { TagsPage } from "../components/tags";


export default function Tags() {
  return (
    <>
      <Header />
      <HomeScreen>
        <TagsPage />
      </HomeScreen>
      <Footer />
    </>
  );
}
