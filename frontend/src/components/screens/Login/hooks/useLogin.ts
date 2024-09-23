import { useForm } from 'react-hook-form'
import { ILogin, loginSchema } from '../interfaces/ILogin'
import { loginService } from '@/services/user/login/loginService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

export function useLogin() {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  async function onLogin(loginData: ILogin) {
    await loginService({
      http: httpClientProvider,
      loginData,
    })
      .then(({ data }) => {
        console.log('Login realizado com sucesso', data)

        router.push('/connection')
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  return {
    handleSubmit,
    register,
    onLogin,
    isSubmitting,
    errors,
  }
}
