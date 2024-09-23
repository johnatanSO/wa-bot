'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import { useRegister } from './hooks/useRegister'
import style from './Register.module.scss'
import Link from 'next/link'

export function RegisterComponent() {
  const { onRegister, handleSubmit, register } = useRegister()

  return (
    <section className={style.registerContainer}>
      <form className={style.formContainer} onSubmit={handleSubmit(onRegister)}>
        <h3 className={style.title}>Criar uma nova conta</h3>

        <div className={style.fieldsContainer}>
          <CustomTextField
            label="E-mail"
            placeholder="Digite o seu e-mail"
            type="email"
            {...register('email')}
          />

          <CustomTextField
            label="Senha"
            placeholder="Digite a sua senha"
            type="password"
            {...register('password')}
          />

          <CustomTextField
            label="Confirmação de senha"
            placeholder="Digite a senha novamente"
            type="password"
            {...register('confirmPassword')}
          />

          <button type="submit" className={style.submitButton}>
            Confirmar
          </button>

          <p>
            Já possui uma conta?{' '}
            <Link className={style.goToLoginAnchor} href="/login">
              Fazer login
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
