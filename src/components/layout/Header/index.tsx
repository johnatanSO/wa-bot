import Link from 'next/link'
import style from './Header.module.scss'

export function Header() {
  return (
    <header className={style.headerContainer}>
      <h1>b</h1>

      <nav>
        <ul>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="about">Sobre</Link>
          </li>
          <li>
            <Link href="howToUse">Como usar</Link>
          </li>

          <li>
            <Link href="/authenticate" className={style.loginAnchor}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
