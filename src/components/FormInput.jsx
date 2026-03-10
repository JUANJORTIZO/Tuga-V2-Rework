export default function FormInput({ label, value, onChange, placeholder = 'Escribir', type = 'text', readOnly = false, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm md:text-base font-bold text-usb-dark">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-4 py-2.5 bg-usb-gray-input rounded-lg text-sm text-usb-dark placeholder:text-usb-text-gray focus:outline-none focus:ring-2 focus:ring-usb-orange/40 transition-all ${readOnly ? 'cursor-default opacity-80' : ''}`}
      />
    </div>
  )
}
