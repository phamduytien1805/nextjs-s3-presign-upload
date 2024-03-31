import { TComment } from "../../../in-memory-db/comments";
import { TFeed } from "../../../in-memory-db/feed";
import { TImage } from "../../../in-memory-db/images";

export type TPost = Pick<TFeed, "id"> & Pick<TImage, "url">;
