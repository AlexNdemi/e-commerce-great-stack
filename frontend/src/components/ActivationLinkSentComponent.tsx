import { type FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ROUTES } from './config/routes'; // Adjust path as needed

const ActivationLinkSentToEmailComponent: FC = () => {
  const location = useLocation();
  
  // Extract message from state, with a fallback just in case of a direct page refresh
  const message = location.state?.message || "Please check your email to activate your account.";
  const email = location.state?.email;

  return (
    <div className="max-w-4xl mx-auto bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)] rounded-2xl p-8 shadow-lg mt-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-green-600">
            Registration Successful
        </h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <p className="text-blue-700">
                {message}
                {email && <strong className="block mt-1">{email}</strong>}
            </p>
        </div>

        <p className="mb-6">
            Once you have clicked the link in your email, you can return here to sign in.
        </p>

        <Link 
          to={ROUTES.LOGIN}
          className="inline-block bg-[#f68b1e] hover:bg-[#e07a0e] text-white rounded-lg px-6 py-3 font-medium transition-colors"
        >
          Go to Login
        </Link>
    </div>
  );
}

export default ActivationLinkSentToEmailComponent;