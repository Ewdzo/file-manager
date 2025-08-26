"use client";

import { User } from "@/app/types/user.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderStyled } from "./style";

export const Header = () => {
    const [user, setUser] = useState<User>();
    const [isMounted, setIsMounted] = useState<boolean>(false);

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
            setUser(res.data)
        }).catch(e => alert(e));
    }, [])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <HeaderStyled>
            <Link href='/home'>
                <Image
                    width={25}
                    height={25}
                    alt="House Icon"
                    src="/assets/icons/home.svg"
                />
            </Link>
            <Link href='/files'>
                <Image
                    width={25}
                    height={25}
                    alt="House Icon"
                    src="/assets/icons/folder.svg"
                />
            </Link>
            <Link href='/user'>
                <Image
                    width={35}
                    height={35}
                    priority
                    alt="User Icon"
                    src={user?.photo || "/assets/images/default_user.svg"}
                    className="rounded-full border border-darkGreyNFM"
                />
            </Link>
            <Link href='/tags'>
                <Image
                    width={25}
                    height={25}
                    alt="House Icon"
                    src="/assets/icons/tags.svg"
                />
            </Link>
            <Link href='/servers'>
                <Image
                    width={25}
                    height={25}
                    alt="House Icon"
                    src="/assets/icons/server.svg"
                />
            </Link>
        </HeaderStyled>
    )
}