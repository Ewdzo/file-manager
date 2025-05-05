"use client";

import { Header } from "@/app/components/header";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import { DetailsBanner } from "../components/banner/details";
import { Details } from "../components/details";
import { Footer } from "../components/footer";
import { File } from "../types/file.type";


export default function Page() {
  const [file, setFile] = useState<File>();

  const getFile = async (name: string) => {
    await fetch('/config/files.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        return setFile(json.filter((file : File) => file.name == name)[0]);
      })
      .catch(() => { })
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");

    if(!name) {
      window.location.replace("/files");
      return;
    }

    getFile(name);
  }, [])

  if(!file) return;

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