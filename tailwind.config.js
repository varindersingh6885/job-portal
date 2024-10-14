/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ui-text-primary": "#000000",
        "ui-text-secondary": "#ffffff",
        "ui-button-text-primary": "#ffffff",
        "ui-button-text-secondary": "#000000",
        "ui-text-danger": "#ff0000",
        "ui-text-info-primary": "#0096FF",
      },
      boxShadow: {
        "ui-4": "0 0 4px 0 rgba(0, 0, 0, 0.2)",
      },
      backgroundColor: {
        "ui-background-primary": "#ffffff",
        "ui-background-secondary": "#f2f0ef",
        "ui-button-primary": "#000000",
        "ui-button-primary-hover": "#000000d6",
        "ui-button-secondary": "#f5f5f5",
        "ui-background-primary-highlight": "#EEF7FF",
      },
      borderColor: {
        "ui-input-primary": "hsl(0, 0%, 80%)",
      },
    },
  },
  plugins: [],
};
