export default function OrangeButton({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) {
  const base = 'px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-usb-orange hover:bg-usb-orange-light text-white shadow-md hover:shadow-lg',
    secondary: 'bg-usb-orange/20 hover:bg-usb-orange/30 text-usb-orange border border-usb-orange/30',
    outline: 'bg-transparent border-2 border-usb-orange text-usb-orange hover:bg-usb-orange hover:text-white',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}
