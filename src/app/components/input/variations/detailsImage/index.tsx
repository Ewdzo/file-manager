"use client";

import Image from "next/image";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { InputStyled } from "./style";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    name: string;
    id: string;
    className?: string;
    defaultValue: string;
}

export const DetailsImageInput = (props: InputProps) => {
    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const { name, id, className } = props;
    return (
        <InputStyled className={className}>
            <label className="text-whiteNFM" htmlFor={id}>{name}</label>
            <label id="image-input" htmlFor={id}>
                <div>
                    <Image
                        src={selectedImage ? URL.createObjectURL(selectedImage) : props.defaultValue}
                        alt="User Icon"
                        width={100}
                        height={100}
                    />
                </div>
            </label>
            <input {...props} defaultValue="" disabled className="hidden" type="file" accept="image/png, image/jpg, image/jpeg" onChange={imageChange} />
        </InputStyled>
    )
}