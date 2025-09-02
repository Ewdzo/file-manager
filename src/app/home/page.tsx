"use client";

import { Banner } from "@/app/components/banner";
import { Header } from "@/app/components/header";
import { Highlight } from "@/app/components/highlight";
import { HomeScreen } from "@/app/components/screens";
import "@/app/globals.css";
import { File } from "@/app/types/file.type";
import { useEffect, useState } from "react";
import { Footer } from "../components/footer";


export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const getFiles = async () => {
    await fetch('/config/files.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        return setFiles(json);
      })
      .catch(() => { })
  }

  useEffect(() => {
    getFiles();
  }, [])

  return (
    <>
      <Header />
      <HomeScreen>
        <Banner file={files[0]} />
        {files.length > 0 && (
          <Highlight sections={[{ title: "Arquivos", files: files }]} />
        )}
      </HomeScreen>
      <Footer />
    </>
  );
}
