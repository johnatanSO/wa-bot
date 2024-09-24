import Link from 'next/link'
import style from './Header.module.scss'

export function Header() {
  return (
    <header className={style.headerContainer}>
      <h1>JChat</h1>

      <nav>
        <ul>
          <li>
            <Link href="/">Início</Link>
          </li>

          <li>
            <Link href="/messages">Mensagens</Link>
          </li>

          <li>
            <Link href="/chatbot">Chat</Link>
          </li>

          <li>
            <Link href="/about">Sobre</Link>
          </li>

          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
