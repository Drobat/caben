export default function VerifyPage() {
    return (
      <div className="min-h-screen bg-[#1f2937] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Vérifiez votre email
          </h2>
          <div className="text-center text-gray-600">
            <p className="mb-4">
              Un lien de connexion a été envoyé à votre adresse email.
            </p>
            <p>
              Vérifiez votre boîte de réception et vos spams.
            </p>
          </div>
        </div>
      </div>
    );
  }