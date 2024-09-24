import Link from 'next/link'
import style from './Header.module.scss'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  const options = [
    { path: '/', title: 'Início' },
    { path: '/messages', title: 'Mensagens' },
    { path: '/chatbot', title: 'Chat' },
    { path: '/about', title: 'Sobre' },
  ]

  return (
    <header className={style.headerContainer}>
      <h1>JChat</h1>

      <nav>
        <ul>
          {options.map((option) => {
            return (
              <li key={option.path}>
                <Link
                  {...(pathname === option.path && { className: style.active })}
                  href={option.path}
                >
                  {option.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
