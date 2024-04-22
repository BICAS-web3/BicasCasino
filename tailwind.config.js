/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        xxs: '400px',
        md: '996px'
      }
    },
    fontFamily: {
      nunito_sans: ['"Nunito Sans"']
    },
    extend: {
      flex: {
        1: '1'
      },
      colors: {
        'black-def': '#181818',
        'border-black': '#252525',
        'inp-col': '#979797',
        'border-def': '#2e2e2e',
        'footer-links': '#aaa',
        'footer-text': '#494949',
        'text-w-def': '#eaeaea',
        'bets-title-color': '#7e7e7e',
        'bets-gr': '#29f061',
        orange: '#ffe09d',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'grey-acc': '#7E7E7E',
        'black-acc': '#202020',
        'white-acc': '#eaeaea'
      },

      screens: {
        '2xl': '1400px',
        '3xl': '1800px',
        '4xl': '1920px',
        '5xl': '1980px',
        tb: '700px',
        tbb: '760px',
        tbbs: '770px',
        xxs: '400px',
        sxs: '370px',
        xxxs: '350px',
        tmd: '910px',
        emd: '996px',
        sm: '650px',
        smx: '600px',
        smm: '490px',
        md: '996px',
        mds: '950px',
        tmd: '1200px',
        tb: '700px',
        tbs: '840px',
        mmd: '1280px',
        med: '1550px',
        mad: '1130px'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        mb: '5px',
        lp: '12px'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      letterSpacing: {
        def: '0.04em'
      },
      spacing: {
        '20px': '20px'
      },
      fontSize: {
        'footer-title': '1.0625rem',
        'footer-text-xs': '0.5rem',
        'footer-text-md': '0.75rem'
      }
    }
  },

  plugins: [require('tailwindcss-animate')]
}
