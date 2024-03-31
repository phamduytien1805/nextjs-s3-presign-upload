"use client"
import { Box, CircularProgress, Icon, useToast } from '@chakra-ui/react'
import Dropzone, { useDropzone,DropzoneOptions } from 'react-dropzone'
import { TbUpload } from 'react-icons/tb';
import { requestPreSignedURL, uploadFeed } from './actions';
import { getFileCheckSum } from '../../../utils';
import { useState } from 'react';


export default function FeedPosting() {
  const [uploading, setUploading] = useState(false)

  const toast = useToast()


    const { getRootProps, getInputProps } = useDropzone({
		noDragEventsBubbling: true,
		multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png']
    },
    disabled: uploading,
    onDrop: async (acceptFiles) => {
      if(!acceptFiles.length){
        return;
      }
      try {
        setUploading(true)
        const file = acceptFiles[0];
        const checksum = await getFileCheckSum(file);
        const requestUrl = await requestPreSignedURL({
          name: file.name,
          size: file.size,
          type: file.type,
          checksum: checksum,
        }) 
        if(requestUrl.failure){
          toast({
            status: 'error',
            title: 'error',
            description: 'Failed to upload'
          })
          return
        }
        const presignedUrl = requestUrl.success?.presignedUrl;
        const imageId = requestUrl.success?.imageId
  
        if(presignedUrl && imageId) {
          await fetch(presignedUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });
          await uploadFeed(imageId)
        }
    
      } catch (error: unknown) {
        console.error('error :>> ', error);
        toast({
          status: 'error',
          title: 'error',
          description: 'Failed to upload'
        })
      }
      finally{
        setUploading(false)

      }
   
    },
    maxFiles:1
	});
  return (
    <Box 			
      {...getRootProps({className: 'dropzone'})}
      display='flex'
      justifyContent='center'
      alignContent='center'
      alignItems='top'
      backgroundColor={'white'}
      boxShadow={'0px 5px 7px -7px rgba(0, 0, 0, 0.75)'}
      borderRadius={8}
      borderWidth={1}
      width={'50%'}
      _hover={uploading ? undefined :{
        borderStyle: 'dashed',
        borderColor:'gray'
      }}
      position={'relative'}
>
        {uploading && <CircularProgress isIndeterminate color='green.300' position={'absolute'}/>}
				<input {...getInputProps()}  />
        <Icon as={TbUpload} color={'black'} boxSize={12} visibility={uploading ? 'hidden' :'unset'} />
    </Box>
  )
}