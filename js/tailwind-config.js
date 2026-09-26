        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            gold: '#D4AF37',
                            goldLight: '#F3E5AB',
                            goldDark: '#AA7C11',
                            bg: '#0B0B0D',
                            card: '#16161A',
                            surface: '#1E1E24',
                            accent: '#25252D'
                        }
                    },
                    fontFamily: {
                        serif: ['Cinzel', 'serif'],
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                    },
                    animation: {
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'shine': 'shine 2s infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' },
                        },
                        shine: {
                            '100%': { left: '125%' }
                        }
                    }
                }
            }
        }
