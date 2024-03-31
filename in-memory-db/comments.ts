import { randomUUID } from "crypto";

export const Comments: { [key: string]: TComment } = {};

export type TComment = {
  id: string;
  content: string;
};

export const createComment = (comment: Pick<TComment, "content">): TComment => {
  const createdComment = {
    id: randomUUID(),
    ...comment,
  };
  Comments[createdComment.id] = createdComment;
  return createdComment;
};
export const findCommentById = (id: string): TComment => {
  return Comments[id];
};
