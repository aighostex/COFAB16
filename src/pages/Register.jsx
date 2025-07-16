import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    referralCode: '',
    agreeTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedReferralCode, setGeneratedReferralCode] = useState('');
//   const navigate = useNavigate();

  const generateReferralCode = () => {
    return `VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const findReferrer = (code) => {
  const registrations = JSON.parse(localStorage.getItem('conferenceRegistrations') || '[]');
  const referrer = registrations.find(reg => reg.referralCode === code);
  return referrer ? `${referrer.firstName} ${referrer.lastName}` : 'Unknown';
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    
    
    try {
      // Generate referral code for new user
      const referralCode = generateReferralCode();
      setGeneratedReferralCode(referralCode);

       // Create the new registration object
      const newRegistration = {
        ...formData,
        id: Date.now(),
        registeredAt: new Date().toISOString(),
        referralCode: formData.referralCode || referralCode,
        referredBy: formData.referralCode ? findReferrer(formData.referralCode) : null,
        isAdmin: false
      };

      // Save registration data
      const registrations = JSON.parse(localStorage.getItem('conferenceRegistrations') || '[]');
      registrations.push(newRegistration); // Now properly using newRegistration
      localStorage.setItem('conferenceRegistrations', JSON.stringify(registrations));
      
      // Show success modal
      setShowSuccess(true);
    } catch{
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl relative">
      <h1 className="text-3xl font-bold mb-8 text-center">Conference Registration</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="referralCode" className="block mb-1 font-medium">Referral Code (Optional)</label>
          <input
            type="text"
            id="referralCode"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeTerms" className="font-medium text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || !formData.agreeTerms}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Complete Registration'}
        </button>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-2xl font-bold mt-4">Registration Successful!</h2>
              <p className="mt-2 text-gray-600">
                Thank you for registering for the Conference of Faithful Ambassadors.
              </p>
              
              <div className="mt-6 bg-indigo-50 p-4 rounded-md">
                <p className="font-medium">Your Referral Code:</p>
                <p className="text-2xl font-bold text-indigo-700 mt-2">
                  {generatedReferralCode}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Share this code with friends to earn rewards!
                </p>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedReferralCode);
                    alert('Referral code copied to clipboard!');
                  }}
                  className="bg-white border border-indigo-600 text-indigo-600 py-2 px-6 rounded-md hover:bg-indigo-50"
                >
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;