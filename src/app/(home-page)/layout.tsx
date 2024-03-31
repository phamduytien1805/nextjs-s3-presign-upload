import { Box } from '@chakra-ui/react'

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <Box backgroundColor={'#f1f2f5'} minHeight={'100vh'} display={'flex'}  justifyContent={'center'} overflow={'hidden'}>
      <Box display={'flex'} width={'50%'}>
        {children}
      </Box>
    </Box>
  )
}