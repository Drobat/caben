export default function SuccessPage() {
    return (
      <div className="min-h-screen bg-[#1f2937] text-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4 py-8">
          <div className="mb-6">
            <svg 
              className="mx-auto w-16 h-16 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-300 mb-8">
            Thank you for enrolling in our Business English course. 
            You will receive an email with your course access details shortly.
          </p>
        </div>
      </div>
    );
  }