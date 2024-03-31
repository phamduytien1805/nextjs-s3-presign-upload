import { Box, SimpleGrid } from "@chakra-ui/react";
import FeedPosting from "./feed-posting";
import NewFeeds from "./new-feeds";

export default async function HomePage() {

  return (
    <Box display={'flex'} flex={1} flexDirection={'column'} padding={'8px 0px'} alignItems={'center'} gap={12}> 
      <FeedPosting/>
      <NewFeeds/>
    </Box>
  )
}
