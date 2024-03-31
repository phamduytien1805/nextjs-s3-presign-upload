'use client'
import {  Textarea } from '@chakra-ui/react'
import Dropzone, { useDropzone,DropzoneOptions } from 'react-dropzone'

import { postComment } from './actions';
import {  ChangeEvent, KeyboardEvent, useState } from 'react';
import { TFeed } from '../../../in-memory-db/feed';


export default function CommentPosting({feedId}: {feedId: TFeed['id']}) {
  const [content, setContent] = useState<string>()

  const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if(content) {
        await postComment(feedId,content)
      }
    }
  };

  const handChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  };

  return (
    <Textarea placeholder='Comment...' onKeyDown={handleKeyPress} onChange={handChange} />
  )
}