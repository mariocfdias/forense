import React, { createContext, useState, useContext } from 'react'
import api from '../../services/api';

export const ImageContext = createContext({})

export default function ImageProvider({ children }) {

    const URI = '/images/'


    const getImages = async () => {
        const imageList = await api.get('/auth/me/images/')
        console.log(imageList)

        return imageList.data
    }

    const createImage = (imageData) => {

    }

    const getImageById = (uuid) => {

    }

    const deleteImage = (uuid) => {

    }

    const updateImage = (imageData) => {

    }


    return (
        <ImageContext.Provider value={{
            getImages
        }}>
            {children}

        </ImageContext.Provider>
    )
}

export function useImageProvider() {

    const context = useContext(ImageContext);

    const {
        getImages
    } = context;

    return {
        getImages
    };
}