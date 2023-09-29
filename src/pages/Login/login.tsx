import React from 'react'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Link, Spacer } from '@chakra-ui/react'
import { Button } from 'components/button'
import { Input, InputPassword } from 'components/input'
import { getLoadingInfo } from 'core/store/modules/auth/selector'
import { Authentication as AuthenticationModel } from 'domain/models'
import { Authentication } from 'domain/interfaces/authentication'

const schema = yup.object().shape({
  login: yup
    .string()
    .email('Please enter a valid email.')
    .required('Please enter an email'),
  password: yup.string().required('please enter a password'),
})

type LoginProps = {
  authentication: Authentication
}

const Login = ({ authentication }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationModel>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })
  const { isLoading } = useSelector(getLoadingInfo)

  const onSubmit: SubmitHandler<AuthenticationModel> = async ({
    login,
    password,
  }) => {
    authentication.auth({ login, password })
  }

  return (
    <Flex
      p={8}
      bg="gray.600"
      boxShadow="md"
      direction="column"
      alignItems="center"
      textColor="gray.700"
      w={{ base: '28rem' }}
      borderRadius="0.75rem"
      justifyContent="center"
    >
      <Flex
        as="form"
        px="1.25rem"
        maxW="28rem"
        direction="column"
        alignItems="center"
        w={{ base: '100%' }}
        data-testid="login-form"
        onSubmit={handleSubmit(onSubmit)}
        mt={{ base: '1rem', md: '1.5rem', lg: '1.5rem' }}
      >
        <Input
          mt="8rem"
          autoFocus
          placeholder="E-mail"
          data-testid="email-input"
          error={errors.login?.message}
          {...register('login')}
        />
        <Spacer my="1" />
        <InputPassword
          placeholder="Password"
          data-testid="password-input"
          error={errors.password?.message}
          {...register('password')}
        />
        <Flex mt="1rem" display="column" w="100%">
          <Button
            mt="2rem"
            mb="1rem"
            h="3.375rem"
            type="submit"
            color="white"
            w={{ base: '100%' }}
            disabled={isLoading}
            isLoading={isLoading}
            data-testid="submit-button"
            backgroundColor="gray.500"
            _hover={{
              filter: 'brightness(1.1)',
              transition: '0.2s',
            }}
          >
            Login
          </Button>
          <Link
            as={ReactLink}
            to="/sign-up"
            color="white"
            fontWeight="500"
            _hover={{
              filter: 'brightness(1.1)',
              transition: '0.2s',
            }}
          >
            <Flex direction="row">Sign up</Flex>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login
