import React, { memo } from 'react'
import { Avatar, AvatarProps as ChackraAvatarProps } from '@chakra-ui/react'

type AvatarProps = ChackraAvatarProps & {
  name: string
  image?: string
}

const AvatarIcon = ({ name, image, ...props }: AvatarProps) => {
  return (
    <Avatar
      name={name || 'User'}
      src={image}
      bg="#4A5568"
      color="gray.50"
      {...props}
    />
  )
}

export default memo(AvatarIcon)
