// assets/js/tailwind.config.js
// Verificação de segurança: Só configura se o Tailwind existir
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                },
                colors: {
                    slate: {
                        850: '#151e2e', // Custom Dark
                    },
                    brand: {
                        blue: '#1E88E5',
                        dark: '#0F172A',
                        accent: '#F59E0B'
                    }
                },
                animation: {
                    'fade-in': 'fadeIn 0.5s ease-out',
                },
                keyframes: {
                    fadeIn: {
                        '0%': { opacity: '0', transform: 'translateY(10px)' },
                        '100%': { opacity: '1', transform: 'translateY(0)' },
                    }
                }
            }
        }
    }
} else {
    console.error("Tailwind CSS não foi carregado corretamente.");
}