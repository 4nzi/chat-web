module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/templates/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".btn": {
          width: "100%",
          backgroundColor: "#6366F1",
          color: "#ffffff",
          fontWeight: "700",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          transition: "all 0.2s ease"
        },
        ".btn:hover": {
          backgroundColor: "#4338CA",
        },
        ".ipt": {
          width: "100%",
          backgroundColor: "#374151",
          color: "#ffffff",
          lineHeight: "1.25",
          padding: "0.5rem 0.75rem",
          borderWidth: "1px",
          borderRadius: "0.25rem",
          borderColor: "#000000",
        },
        ".ipt:focus": {
          outline: "0",
        }
      };
      addUtilities(newUtilities);
    }
  ]
}
