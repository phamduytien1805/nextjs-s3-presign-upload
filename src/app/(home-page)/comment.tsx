"use server";
import { Box, Text } from "@chakra-ui/react";
import { TComment } from "../../../in-memory-db/comments";
import CommentPosting from "./comment-posting";
import { useEffect, useState } from "react";
import { TFeed } from "../../../in-memory-db/feed";
import CommentList from "./comment-list";

export default async function CommentPage({ feedId }: { feedId: TFeed["id"] }) {
  return (
    <Box
      position={"relative"}
      display={"flex"}
      gap={8}
      flexDirection={"column"}
    >
      <CommentPosting feedId={feedId} />
      <CommentList feedId={feedId} />
    </Box>
  );
}
