"use client";

import Image from "next/image";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { InputStyled } from "./style";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    name: string;
    id: string;
    className?: string;
    text?: string;
}

export const ImageInput = (props: InputProps) => {
    const [image] = useState<string>("/assets/images/default_user.png");
    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const { name, id, className, text } = props;
    return (
        <InputStyled className={className}>
            <label className="text-whiteNFM" htmlFor={id}>{name}</label>
            <label id="image-input" htmlFor={id}>
                <Image
                    src={selectedImage ? URL.createObjectURL(selectedImage) : image}
                    alt="User Icon"
                    width={100}
                    height={100}
                    className="rounded-lg aspect-square"
                />
                <p className="text-sm">{text}</p>
            </label>
            <input {...props} className="hidden" type="file" accept="image/png, image/jpg, image/jpeg" onChange={imageChange} />
        </InputStyled>
    )
}