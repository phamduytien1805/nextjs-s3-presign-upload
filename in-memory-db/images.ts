import { randomUUID } from "crypto"

export const Images: {[key: string]: TImage} = {}

export type TImage = {
  id: string,
  original_name: string,
  url: string,
}

export const createImage = (image: Omit<TImage,'id'>) :TImage=> {
  const createdImg =  {
    id: randomUUID(),
    ...image
  }
  Images[createdImg.id] = createdImg;
  console.log('Images :>> ', Images);
  return createdImg
}

export const findImageById = (imgId: string)=> {
  console.log('Images dind:>> ', Images);

  return Images[imgId];
}