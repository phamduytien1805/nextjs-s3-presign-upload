import { Box, Text } from "@chakra-ui/react";
import { fetchComments } from "./actions";
import { TFeed } from "../../../in-memory-db/feed";

export default async function CommentList({ feedId }: { feedId: TFeed["id"] }) {
  const commentList = await fetchComments(feedId);

  return (
    <Box gap={2} display={"flex"} flexDirection={"column"}>
      {commentList.map((comment) => (
        <Box key={comment.id}>
          <Text>{comment.content}</Text>
        </Box>
      ))}
    </Box>
  );
}
