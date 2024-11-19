export const Button = ({ children, loading, className, ...props }) => {
    return (
      <button
        className={`
          block
          w-full
          text-center
          bg-[#F7CE3E]
          text-black
          font-bold
          py-4
          rounded-lg
          border-2
          border-black
          hover:bg-opacity-90
          transition-duration-300
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        disabled={loading}
        {...props}
      >
        {loading ? 'Processing...' : children}
      </button>
    );
  }