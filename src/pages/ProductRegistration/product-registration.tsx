import React, { memo, useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Text } from 'components/text'
import { Button } from 'components/button'
import { Input } from 'components/input'
import {
  CreateProduct,
  ReadProducts,
  UpdateProduct,
} from 'domain/interfaces/products'
import { Toast } from 'domain/interfaces/toast'
import { Product } from 'domain/models'
import { Link, useHistory } from 'react-router-dom'

const schema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup.number().required('Required'),
  discountPercentage: yup.number().required('Required'),
  rating: yup.number().required('Required'),
  stock: yup.number().required('Required'),
  brand: yup.string().required('Required'),
  category: yup.string().required('Required'),
})

type ProductRegistrationProps = {
  createProduct: CreateProduct
  readProducts: ReadProducts
  updateProduct: UpdateProduct
  toast: Toast
  id?: number
}

const ProductRegistration = ({
  createProduct,
  readProducts,
  updateProduct,
  toast,
  id,
}: ProductRegistrationProps) => {
  const history = useHistory()
  const [getProduct, setProduct] = useState<Product>()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Product>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  if (id) {
    const fetchProduct = async (idProduct: number) => {
      try {
        const product = await readProducts.read(idProduct)
        setProduct(product as Product)
      } catch (error) {
        toast.error({
          message: 'Erro ao buscar produto.',
        })
      }
    }

    if (getProduct) {
      setValue('title', getProduct.title)
      setValue('description', getProduct.description)
      setValue('price', getProduct.price)
      setValue('discountPercentage', getProduct.discountPercentage)
      setValue('rating', getProduct.rating)
      setValue('stock', getProduct.stock)
      setValue('brand', getProduct.brand)
      setValue('category', getProduct.category)
    }

    useEffect(() => {
      fetchProduct(id)
    }, [])
  }

  const onSubmit: SubmitHandler<Product> = async product => {
    try {
      if (id) {
        await updateProduct.update(id, product)
        toast.success({
          message: 'Produto atualizado com sucesso',
          duration: 5000,
        })
      } else {
        await createProduct.create(product)
        toast.success({
          message: 'Produto cadastrado com sucesso',
          duration: 5000,
        })
      }
      history.push('/listar-produtos')
    } catch (error: any) {
      toast.error({
        message: 'Erro ao cadastrar o produto.',
        duration: 5000,
      })
    }
  }

  return (
    <Flex
      pt="4rem"
      as="form"
      direction="column"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="product-registration-form"
    >
      <Flex direction="column" align="center">
        <Flex
          mb="24"
          w="80vw"
          boxShadow="base"
          borderRadius={5}
          bgColor="gray.700"
          direction="column"
        >
          <Text gRole="title" ml="1rem" my="1rem">
            Cadastrar Produto
          </Text>
          <Flex align="flex-start" direction="column" p="1rem">
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Título"
                  data-testid="title-input"
                  error={errors.title?.message}
                  {...register('title')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Descrição"
                  data-testid="description-input"
                  error={errors.description?.message}
                  {...register('description')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Preço"
                  data-testid="price-input"
                  error={errors.price?.message}
                  {...register('price')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Porcentagem de desconto"
                  data-testid="discountPercentage-input"
                  error={errors.discountPercentage?.message}
                  {...register('discountPercentage')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Classificação"
                  data-testid="rating-input"
                  error={errors.rating?.message}
                  {...register('rating')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Estoque"
                  data-testid="stock-input"
                  error={errors.stock?.message}
                  {...register('stock')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Marca"
                  data-testid="brand-input"
                  error={errors.brand?.message}
                  {...register('brand')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Categoria"
                  data-testid="category-input"
                  error={errors.category?.message}
                  {...register('category')}
                />
              </Flex>
            </Flex>
            <Flex
              w="100%"
              mb="1rem"
              alignItems="center"
              justify="space-between"
              data-testid="buttons-flexbox"
            >
              <Link to="/listar-produtos">
                <Button
                  h="3.25rem"
                  backgroundColor="gray.600"
                  _hover={{
                    filter: 'brightness(1.1)',
                    transition: '0.2s',
                  }}
                  color="white"
                >
                  Voltar
                </Button>
              </Link>
              <Button
                h="3.25rem"
                type="submit"
                color="white"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                backgroundColor="gray.600"
                data-testid="submit-button"
                _hover={{
                  filter: 'brightness(1.1)',
                  transition: '0.2s',
                }}
              >
                Cadastrar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default memo(ProductRegistration)
