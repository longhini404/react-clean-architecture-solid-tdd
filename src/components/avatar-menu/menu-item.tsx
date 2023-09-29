import React from 'react'
import { Flex, Icon, MenuItem as ChakraMenuItem } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

type MenuItemProps = {
  item: string
  onClick?: () => void
  icon: IconType
}

const MenuItem = ({ item, onClick, icon, ...props }: MenuItemProps) => {
  return (
    <ChakraMenuItem
      _hover={{
        transition: '0.2s',
        background: 'gray.700',
        filter: 'brightness(0.8)',
      }}
      color="white"
      onClick={onClick}
      {...props}
    >
      <Flex align="center">
        <Icon as={icon} mr="0.5rem" />
        {item}
      </Flex>
    </ChakraMenuItem>
  )
}

export default MenuItem
