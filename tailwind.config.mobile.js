/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom breakpoints for presentation design
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Custom presentation breakpoints
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
      },
      
      // Custom spacing for mobile touch targets
      spacing: {
        'touch': '44px', // Minimum touch target size
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // Custom font sizes optimized for mobile
      fontSize: {
        'xs-mobile': ['12px', { lineHeight: '16px' }],
        'sm-mobile': ['14px', { lineHeight: '20px' }],
        'base-mobile': ['16px', { lineHeight: '24px' }],
        'lg-mobile': ['18px', { lineHeight: '28px' }],
        'xl-mobile': ['20px', { lineHeight: '32px' }],
        '2xl-mobile': ['24px', { lineHeight: '36px' }],
        '3xl-mobile': ['28px', { lineHeight: '40px' }],
      },
      
      // Custom animations for mobile
      animation: {
        'slide-in-mobile': 'slideInMobile 0.3s ease-out',
        'fade-in-mobile': 'fadeInMobile 0.2s ease-out',
        'bounce-mobile': 'bounceMobile 0.6s ease-in-out',
      },
      
      keyframes: {
        slideInMobile: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInMobile: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceMobile: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-8px)' },
          '70%': { transform: 'translateY(-4px)' },
          '90%': { transform: 'translateY(-2px)' },
        },
      },
      
      // Custom backdrop blur for mobile performance
      backdropBlur: {
        'mobile': '8px',
        'tablet': '12px',
        'desktop': '16px',
      },
      
      // Custom grid templates for responsive layouts
      gridTemplateColumns: {
        'mobile-toc': 'repeat(1, minmax(0, 1fr))',
        'tablet-toc': 'repeat(2, minmax(0, 1fr))',
        'desktop-toc': 'repeat(3, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    // Custom plugin for mobile utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Touch-optimized utilities
        '.touch-target': {
          minHeight: theme('spacing.touch'),
          minWidth: theme('spacing.touch'),
        },
        
        // Safe area utilities
        '.pt-safe': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.pb-safe': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.pl-safe': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.pr-safe': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        
        // Mobile-optimized text
        '.text-mobile-optimized': {
          fontSize: 'clamp(14px, 4vw, 18px)',
          lineHeight: '1.5',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        
        // Presentation utilities
        '.slide-container': {
          width: '100%',
          maxWidth: '100vw',
          padding: '0 1rem',
          '@media (min-width: 640px)': {
            padding: '0 1.5rem',
          },
          '@media (min-width: 1024px)': {
            padding: '0 2rem',
          },
        },
        
        // Mobile navigation
        '.mobile-nav': {
          position: 'fixed',
          bottom: '0.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '40',
          '@media (min-width: 640px)': {
            bottom: '1.5rem',
          },
          '@media (min-width: 1024px)': {
            bottom: '2rem',
          },
        },
      }
      
      addUtilities(newUtilities)
    }
  ],
}
