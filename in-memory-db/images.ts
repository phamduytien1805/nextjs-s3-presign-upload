import { randomUUID } from "crypto";

export const Images: { [key: string]: TImage } = {};

export type TImage = {
  id: string;
  original_name: string;
  url: string;
};

export const createImage = (image: Omit<TImage, "id">): TImage => {
  const createdImg = {
    id: randomUUID(),
    ...image,
  };
  Images[createdImg.id] = createdImg;
  return createdImg;
};

export const findImageById = (imgId: string) => {
  return Images[imgId];
};
