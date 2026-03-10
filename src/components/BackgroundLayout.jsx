export default function BackgroundLayout({ children, className = '' }) {
  return (
    <div className="relative min-h-[calc(100vh-70px)] flex items-center justify-center p-4 md:p-8">
      {/* Background image */}
      <div
        className="fixed inset-0 top-[70px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg.jpg)' }}
      />
      {/* Blur + dark overlay */}
      <div className="fixed inset-0 top-[70px] bg-black/30 backdrop-blur-[2px]" />
      {/* Content */}
      <div className={`relative z-10 w-full ${className}`}>
        {children}
      </div>
    </div>
  )
}
