import React, { memo } from 'react'
import { Avatar, AvatarProps as ChackraAvatarProps } from '@chakra-ui/react'

type AvatarProps = ChackraAvatarProps & {
  name: string
  image?: string
}

const AvatarIcon = ({ name, image, ...props }: AvatarProps) => {
  return (
    <Avatar
      src={image}
      bg="#4A5568"
      color="gray.50"
      name={name || 'User'}
      {...props}
    />
  )
}

export default memo(AvatarIcon)
