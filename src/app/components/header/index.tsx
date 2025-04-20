"use client";

import Image from "next/image";
import Link from "next/link";
import { HeaderStyled } from "./style";

export const Header = () => {
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
                    src="/assets/images/default_user.png"
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