import { useForm } from 'react-hook-form'
import { ILogin, loginSchema } from '../interfaces/ILogin'
import { loginService } from '@/services/user/login/loginService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { saveLocalUser } from '@/utils/functions/storage/saveLocalUser'
import { saveLocalToken } from '@/utils/functions/storage/saveLocalToken'

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
      .then(async ({ data }) => {
        await Promise.all([
          saveLocalUser(data.user),
          saveLocalToken(data.token),
        ])

        router.push('/messages')
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
