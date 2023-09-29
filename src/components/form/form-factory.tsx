/* eslint-disable react/prop-types */
import React, { forwardRef, memo } from 'react'
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormLabel,
  FormLabelProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  TextProps,
  UseNumberInputProps,
} from '@chakra-ui/react'

export type FormFactoryProps<T = any> = T & {
  name: string
  label?: string
  errorText?: JSX.Element | string
  isDisabled?: boolean
  isRequired?: boolean
  formLabelProps?: FormLabelProps
  errorMessageProps?: FormErrorMessageProps
  formControlProps?: FormControlProps
  helperTextProps?: TextProps
}

type FormFactoryTypes =
  | InputProps
  | SelectProps
  | Omit<RadioGroupProps, 'children'>
  | UseNumberInputProps

const FormFactory = <T extends FormFactoryTypes>(
  Component: React.ComponentType<T>,
  displayName: string
): any => {
  const component = forwardRef<
    HTMLInputElement | HTMLSelectElement,
    FormFactoryProps<T>
  >((props, ref) => {
    const {
      isDisabled,
      isRequired,
      formControlProps,
      formLabelProps,
      errorMessageProps,
      errorText,
      label,
      ...componentProps
    } = props as any
    const sizeDefaultInput = '3.375rem'

    return (
      <FormControl
        color="gray.500"
        isDisabled={isDisabled}
        isRequired={isRequired}
        {...formControlProps}
      >
        {label && (
          <FormLabel
            fontSize="0.875rem"
            mb="0.9"
            color="gray.500"
            fontWeight={400}
            htmlFor={props.name}
            {...formLabelProps}
          >
            {label}
          </FormLabel>
        )}

        <Component
          h={sizeDefaultInput}
          bg="white"
          borderColor="gray.200"
          _focus={{ borderColor: 'blue.400' }}
          {...componentProps}
          ref={ref}
        />

        <FormErrorMessage
          role="alert"
          marginTop="0.1875rem"
          {...errorMessageProps}
        >
          {errorText}
        </FormErrorMessage>
      </FormControl>
    )
  })
  component.displayName = displayName
  return memo(component)
}

export default FormFactory
