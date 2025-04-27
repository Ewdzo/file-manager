"use client";

import Image from "next/image";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { ImageInputLikeContainerStyled } from "./style";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    name: string;
    id: string;
    className?: string;
    text?: string;
    defaultValue: string;
}

export const ImageInputLikeContainer = (props: InputProps) => {
    const [image, setImage] = useState<string>(props.defaultValue);
    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const { name, id, className, text } = props;
    return (
        <ImageInputLikeContainerStyled className={className} $text={text}>
            <label className="text-whiteNFM" htmlFor={id}>{name}</label>
            <label id="image-input" htmlFor={id}>
                <Image
                    src={selectedImage ? URL.createObjectURL(selectedImage) : image}
                    alt="User Icon"
                    width={100}
                    height={100}
                    className="rounded-lg aspect-square p-2"
                />
                <p className="text-sm">{text}</p>
            </label>
            <input {...props} disabled className="hidden" type="file" accept="image/png, image/jpg, image/jpeg" onChange={imageChange} />
        </ImageInputLikeContainerStyled>
    )
}