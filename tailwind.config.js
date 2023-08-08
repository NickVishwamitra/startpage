/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "picton-blue": {
          50: "#D8F0F9",
          100: "#C6EAF6",
          200: "#A3DDF1",
          300: "#80CFEB",
          400: "#5CC2E6",
          500: "#39B5E0",
          600: "#1E98C2",
          700: "#177292",
          800: "#0F4C61",
          900: "#082631",
          950: "#041319",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
