import Link from 'next/link'
import style from './Header.module.scss'

export function Header() {
  return (
    <header className={style.headerContainer}>
      <h1>Chat bot</h1>

      <nav>
        <ul>
          <li>
            <Link href="/">Início</Link>
          </li>

          <li>
            <Link href="/connection">BOT</Link>
          </li>

          <li>
            <Link href="/about">Sobre</Link>
          </li>

          <li>
            <Link href="/login" className={style.loginAnchor}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
