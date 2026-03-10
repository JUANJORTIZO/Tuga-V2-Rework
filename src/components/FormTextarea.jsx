export default function FormTextarea({ label, value, onChange, placeholder = 'Escribir...', readOnly = false, rows = 6, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm md:text-base font-bold text-usb-dark">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        className={`w-full px-4 py-3 bg-usb-gray-input rounded-lg text-sm text-usb-dark placeholder:text-usb-text-gray focus:outline-none focus:ring-2 focus:ring-usb-orange/40 transition-all resize-vertical ${readOnly ? 'cursor-default opacity-80' : ''}`}
      />
    </div>
  )
}
