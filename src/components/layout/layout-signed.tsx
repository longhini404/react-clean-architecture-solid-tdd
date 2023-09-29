import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Container } from 'components/container'
import { Header } from 'components/header'

const LayoutSigned = ({ children }: any) => (
  <Flex direction="column">
    <Header />
    <Flex direction="row">
      <Container>
        <Flex as="main" justify="center" minHeight="100vh">
          {children}
        </Flex>
      </Container>
    </Flex>
  </Flex>
)

export default LayoutSigned
