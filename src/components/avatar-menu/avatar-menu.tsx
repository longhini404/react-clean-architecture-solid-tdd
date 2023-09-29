import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, MenuButton, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import { AvatarIcon } from 'components/avatar-icon'
import { signOut } from 'core/store/modules/auth/actions'
import { getProfileInfo } from 'core/store/modules/auth/selector'
import { nameFormatter } from 'utils/functions'
import { FiUser, FiXCircle } from 'react-icons/fi'
import { MenuItem } from '.'

const AvatarMenu = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector(getProfileInfo)

  return (
    <Menu autoSelect={false} data-testid="avatar-menu">
      <MenuButton>
        <AvatarIcon
          name={profile?.name}
          image={profile?.avatar}
          border="0.125rem solid #2D3748"
        />
      </MenuButton>
      <MenuList boxShadow="md" borderStyle="none" mt="0.8rem" bg="gray.700">
        <MenuOptionGroup title={nameFormatter(profile?.name, 25)} color="white">
          <Link to="/profile">
            <MenuItem item="Profile" icon={FiUser} data-testid="profile-item" />
          </Link>
          <MenuItem
            item="Logout"
            icon={FiXCircle}
            onClick={() => dispatch(signOut())}
            data-testid="logout-item"
          />
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default memo(AvatarMenu)
