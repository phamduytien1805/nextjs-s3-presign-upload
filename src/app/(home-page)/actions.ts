"use server";
import { ALLOWED_FILES } from "../../../constants";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createImage, findImageById } from "../../../in-memory-db/images";
import {
  addComment,
  createFeed,
  findAllFeeds,
  findFeedById,
  TFeed,
} from "../../../in-memory-db/feed";
import { generateUniqueFilename } from "../../../utils/generateFileName";
import { revalidatePath } from "next/cache";
import { TPost } from "./types";
import { createComment, findCommentById } from "../../../in-memory-db/comments";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type FileUpload = {
  name: string;
  type: string;
  size: number;
  checksum: string;
};

export const requestPreSignedURL = async ({
  name,
  type,
  size,
  checksum,
}: FileUpload) => {
  if (!ALLOWED_FILES.includes(type)) {
    return { failure: "File type not allowed" };
  }

  const fileName = generateUniqueFilename();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum, // pass checksum of requested file to prevent bad file when using presignedUrl
  });

  const presignedUrl = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 sec for a photo
  );

  const image = createImage({
    original_name: name,
    url: presignedUrl.split("?")[0],
  });

  return { success: { presignedUrl, imageId: image.id } };
};

export const uploadFeed = async (imageId: string) => {
  const feed = createFeed({
    imageId,
  });

  revalidatePath("/");

  return { success: { feed } };
};

export const fetchPosts = async () => {
  const feeds = findAllFeeds();
  const posts: TPost[] = feeds.map((feed) => ({
    id: feed.id,
    url: findImageById(feed.imageId).url,
  }));
  return posts;
};

export const fetchComments = async (feedId: TFeed["id"]) => {
  const feed = findFeedById(feedId);
  const comments = feed.commentIds.map((cmtId) => findCommentById(cmtId));
  return comments;
};

export const postComment = async (feedId: TFeed["id"], content: string) => {
  const comment = createComment({ content });
  addComment(feedId, comment.id);
  revalidatePath("/");

  return true;
};
