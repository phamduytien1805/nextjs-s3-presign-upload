import { randomUUID } from "crypto"

export const Feeds : {[key: TFeed['id']]: TFeed} = {

}

export type TFeed = {
  id: string,
  imageId: string,
  commentIds: string[],
}

export const createFeed = (feed: Pick<TFeed,'imageId'>) :TFeed=> {
  const createdFeed =  {
    id: randomUUID(),
    commentIds: [],
    ...feed
  }
  Feeds[createdFeed.id] = createdFeed;
  return createdFeed
}

export const findAllFeeds = () => {
  return Object.values(Feeds)
}

export const findFeedById = (id: TFeed['id']) => {
  return Feeds[id]
}

export const addComment = (id: TFeed['id'],commentId: string) => {
  Feeds[id].commentIds.push(commentId)
}