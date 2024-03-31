import { Box } from '@chakra-ui/react'
import Post from '../../../components/Post'
import { TPost } from './types'
import Comment from './comment';
import { fetchPosts } from './actions';
import { useState } from 'react';

export default async function NewFeeds() {
  const posts = await fetchPosts();  
  return (
    <Box justifyContent={'center'} display={'flex'} gap={8} flexDirection={'column'}>
    {  posts.map((post) => <Post key={post.id} post={post} Comment={<Comment feedId={post.id}/>}/>)}
    </Box>
  )
}