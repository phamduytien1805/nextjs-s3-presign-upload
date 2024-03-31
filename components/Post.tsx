'use client'
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Image, Stack, useDisclosure } from '@chakra-ui/react'
import { TPost } from '@/app/(home-page)/types';
import React from 'react';
import { TComment } from '../in-memory-db/comments';
import { TFeed } from '../in-memory-db/feed';
import { useRouter } from 'next/navigation';


export default function Post({post,Comment} : {post: TPost, Comment: JSX.Element}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack boxSize={'sm'} gap={4} alignItems={'center'}>
        <Image src={post.url} alt='uploaded img' />
        <Button colorScheme='blue' onClick={() => {
          onOpen();
        }} w={'50%'}>
          Open
      </Button>
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            {Comment}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  )
}