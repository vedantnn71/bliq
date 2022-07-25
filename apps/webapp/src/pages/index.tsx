import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Nav from 'components/nav'
import Header from 'components/header'
import { Flex } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'unauthenticated')
    router.push('/auth/signup')

  return (
    <Flex>
      <Nav />
      <Header />
    </Flex>
  )
}

export default Home
