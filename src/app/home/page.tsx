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

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token || !token.length) window.location.replace("/");

    fetch("/api/verify", {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(async (data) => {
      const res = await data.json();
      return res;
    }).then(res => {
      if (!res.data) window.location.replace("/");
    }).catch(e => alert(e));

  }, [])

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
