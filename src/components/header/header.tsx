import React, { memo } from 'react'
import { Flex } from '@chakra-ui/react'
import { AvatarMenu } from 'components/avatar-menu'

const Header = () => {
  return (
    <Flex
      width="100vw"
      p="0.625rem 1.25rem"
      justifyContent="flex-start"
      border-bottom="0.0625rem solid gray.600"
      bgGradient="linear(to-r,gray.800, gray.700, gray.600)"
    >
      <Flex
        ml="auto"
        width="13.75rem"
        data-cy="header"
        alignItems="center"
        data-testid="header"
        justifyContent="space-around"
      />
      <AvatarMenu />
    </Flex>
  )
}

export default memo(Header)
