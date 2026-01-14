'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { ThemeToggle } from './ThemeToggle'
import { usePathname } from 'next/navigation'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/#products' },
  { label: 'Why EcoLink', href: '/#why-ecolink' },
  { label: 'Contact', href: '/#contact-us' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <header className="relative top-0 left-0 right-0 z-50 ">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 pl-4 md:pl-0">
            <Image 
              src="/logo.svg" 
              alt="EcoLink Logo" 
              width={155} 
              height={75} 
              className="h-[75px] w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isHomePage 
                  ? "text-black/80 hover:text-black transition-colors text-shadow-white-lg " 
                  : "text-foreground/70  hover:text-foreground transition-colors"
                }
              >
                {item.label}
              </Link>
            ))}
            {/* <ThemeToggle /> */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative pr-5 z-[9999] "
              aria-label="Toggle menu"
            >
              <div className="w-7 flex flex-col gap-1">
                <span className={`block h-0.5 w-full dark:bg-white bg-foreground transition-transform duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`} />
                <span className={`block h-0.5 w-full dark:bg-white bg-foreground transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`block h-0.5 w-full dark:bg-white  bg-foreground transition-transform duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`
            fixed inset-0 bg-black/80 backdrop-blur-sm transition-transform duration-300 md:hidden z-[9996]
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={isHomePage 
                    ? "text-xl text-white hover:text-white/80 transition-colors" 
                    : "text-xl text-foreground/70 hover:text-foreground transition-colors"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
} 