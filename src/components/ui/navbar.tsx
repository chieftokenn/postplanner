'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  variant?: 'landing' | 'dashboard'
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const landingNavItems = [
    { href: '#features', label: 'Fonctionnalités' },
    { href: '#pricing', label: 'Tarifs' },
    { href: '/auth/login', label: 'Connexion' },
  ]

  const dashboardNavItems = [
    { href: '/dashboard/analytics', label: 'Analytics', icon: '📊' },
    { href: '/dashboard/settings', label: 'Paramètres', icon: '⚙️' },
  ]

  const navItems = variant === 'landing' ? landingNavItems : dashboardNavItems

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Logo size="md" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 rounded-full hover:bg-gray-100/80 group"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
                <div className="absolute inset-0 bg-gray-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
              </Link>
            ))}
            
            {variant === 'landing' && (
              <div className="ml-4">
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Link href="/auth/register">
                    Commencer gratuitement
                  </Link>
                </Button>
              </div>
            )}

            {variant === 'dashboard' && (
              <div className="ml-4">
                <Button 
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-full transition-all duration-200"
                >
                  <span className="mr-2">👤</span>
                  Déconnexion
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200/50">
            <nav className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-colors duration-200"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {variant === 'landing' && (
                <div className="pt-2">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg"
                  >
                    <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                      Commencer gratuitement
                    </Link>
                  </Button>
                </div>
              )}

              {variant === 'dashboard' && (
                <div className="pt-2">
                  <Button 
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-lg"
                  >
                    <span className="mr-2">👤</span>
                    Déconnexion
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 