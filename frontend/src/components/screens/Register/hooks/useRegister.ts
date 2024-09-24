import { useForm } from 'react-hook-form'
import { IRegister, registerSchema } from '../interfaces/IRegister'
import { registerService } from '@/services/user/register/registerService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

export function useRegister() {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IRegister>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
  })

  async function onRegister(registerData: IRegister) {
    await registerService({
      http: httpClientProvider,
      registerData,
    })
      .then(() => {
        router.push('/login')
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  return {
    handleSubmit,
    register,
    onRegister,
    isSubmitting,
    errors,
  }
}
