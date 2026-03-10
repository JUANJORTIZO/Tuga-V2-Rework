export default function ActionCard({ icon, label, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center justify-center gap-3 bg-usb-orange hover:bg-usb-orange-light text-white rounded-xl p-6 md:p-8 w-full max-w-[280px] aspect-[4/3] border-4 border-white shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer ${className}`}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-lg md:text-xl font-bold text-center leading-tight">{label}</span>
    </button>
  )
}
