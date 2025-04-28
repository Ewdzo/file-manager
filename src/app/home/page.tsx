"use client";

import { Banner } from "@/app/components/banner";
import { Header } from "@/app/components/header";
import { Highlight } from "@/app/components/highlight";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { mockFile, mockSection } from "@/app/helper/mock";
import { useEffect } from "react";
import { Footer } from "../components/footer";


export default function Home() {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if(!token || !token.length) window.location.replace("/");

    fetch("/api/verify", {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}`},
    }).then(async (data) => {
      const res = await data.json();
      return res;
    }).then(res => {
      if(!res.data) window.location.replace("/");
    }).catch(e => alert(e));
  }, [])

  return (
    <>
      <Header />
      <HomeScreen>
        <Banner file={mockFile} />
        <Highlight sections={[mockSection]} />
      </HomeScreen>
      <Footer />
    </>
  );
}
