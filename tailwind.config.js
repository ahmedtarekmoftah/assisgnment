/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "480px" }, // Extra small devices (e.g., smartphones in portrait mode)
        sm: { max: "640px" }, // Small devices (e.g., smartphones)
        md: { max: "768px" }, // Medium devices (e.g., tablets)
        lg: { max: "1024px" }, // Large devices (e.g., laptops)
        xl: { max: "1280px" }, // Extra large devices (e.g., desktops)
        "2xl": { max: "1536px" }, // 2x Extra large devices (e.g., large desktops)
      },
    },
  },
  plugins: [],
};
