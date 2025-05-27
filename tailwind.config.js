module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB', // Primary - blue-600
        'primary-hover': '#1D4ED8', // Primary Hover - blue-700
        'primary-light': '#DBEAFE', // Primary Light - blue-100
        'background': '#FFFFFF', // Background - white
        'surface': '#F9FAFB', // Surface - gray-50
        'border': '#E5E7EB', // Border - gray-200
        'text-primary': '#111827', // Text Primary - gray-900
        'text-secondary': '#4B5563', // Text Secondary - gray-600
        'text-tertiary': '#9CA3AF', // Text Tertiary - gray-400
        'success': '#16A34A', // Success - green-600
        'warning': '#F59E0B', // Warning - amber-500
        'error': '#DC2626', // Error - red-600
        'info': '#0EA5E9', // Info - sky-500
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}