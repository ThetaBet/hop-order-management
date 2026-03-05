import { createContext, useContext, useRef, useState } from 'react'
import { IEditCustomerContext } from './types'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@renderer/lib/queryKeys'

const EditCustomerProviderContext = createContext<IEditCustomerContext | null>(null)

const EditCustomerProvider = ({ children }) => {
  const { customerCode } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const submitFormRef = useRef<(() => void) | null>(null)
  const resetFormRef = useRef<(() => void) | null>(null)
  const queryClient = useQueryClient()

  const toggleEditing = (editing: boolean) => {
    setIsEditing(editing)
    if (!editing) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.customers.all, queryKeys.customers.byCode(customerCode || '')] })
      if (resetFormRef.current) {
        resetFormRef.current()
      }
    }
  }

  const registerSubmit = (submitFn: () => void, resetFn: () => void) => {
    submitFormRef.current = submitFn
    resetFormRef.current = resetFn
  }

  const handleSubmit = () => {
    if (submitFormRef.current) {
      submitFormRef.current()
      setIsEditing(false)
    }
  }

  return (
    <EditCustomerProviderContext.Provider
      value={{
        isEditing,
        toggleEditing,
        registerSubmit,
        handleSubmit,
        customerCode: customerCode || ''
      }}
    >
      {children}
    </EditCustomerProviderContext.Provider>
  )
}

export const useEditCustomer = () => {
  const context = useContext(EditCustomerProviderContext)
  if (context === null) {
    throw new Error('useEditCustomer must be used within a EditCustomerProvider')
  }
  return context
}

export default EditCustomerProvider
