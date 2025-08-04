import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function Logo({ className, size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        {/* Main circle with gradient */}
        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg">
          {/* Calendar icon representation */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-3/5 h-3/5 text-white"
          >
            {/* Calendar base */}
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            {/* Calendar top bar */}
            <rect x="3" y="4" width="18" height="4" fill="currentColor"/>
            {/* Calendar lines */}
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1"/>
            {/* Post dots representing scheduled posts */}
            <circle cx="7" cy="13" r="1" fill="currentColor"/>
            <circle cx="12" cy="13" r="1" fill="currentColor"/>
            <circle cx="17" cy="13" r="1" fill="currentColor"/>
            <circle cx="7" cy="17" r="1" fill="currentColor"/>
            <circle cx="12" cy="17" r="1" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Floating notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        
        {/* Sparkle effect */}
        <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-ping"></div>
      </div>
      
      {showText && (
        <span className={cn('font-bold text-gray-900', textSizes[size])}>
          PostPlanner
        </span>
      )}
    </div>
  )
}

// Alternative logo with different style
export function LogoAlt({ className, size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        {/* Modern geometric design */}
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
          {/* Social media icons combined */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-4/5 h-4/5 text-white"
          >
            {/* LinkedIn icon */}
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Twitter icon overlay */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-md">
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      {showText && (
        <span className={cn('font-bold text-gray-900', textSizes[size])}>
          PostPlanner
        </span>
      )}
    </div>
  )
} 