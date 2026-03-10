export default function Panel({ children, className = '', maxWidth = 'max-w-5xl' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-10 mx-auto w-full ${maxWidth} ${className}`}>
      {children}
    </div>
  )
}
