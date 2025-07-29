import { useState } from 'react';
import { useEffect } from 'react';
import { ArrowLeft, Users, Gift } from "lucide-react";
import { Link } from 'react-router-dom';
// import { register } from '../api/users';
import axios from 'axios';
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


  const generateReferralLink = (code) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/register?ref=${code}`;
};


  // To check for referral codes in the URL
  useEffect(() => {
  // Check for referral code in URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  const refCode = queryParams.get('ref');
  
  if (refCode) {
    setFormData(prev => ({
      ...prev,
      referralCode: refCode
    }));
    
   ;
  }
}, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setShowSuccess(false);



    try {
       // Create the new registration object
     const newRegistration = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNo: formData.phone,
            referralCode: formData.referralCode || null, // optional field
        };

        if(formData.referralCode){
          newRegistration.referredBy = formData.referralCode
        }

     console.log('Payload being sent:', JSON.stringify(newRegistration, null, 2));


      //send registration data to backend
      const response = await axios.post('https://confabevent.chroniclesoft.com/api/register', newRegistration);
      console.log('API request sent', response.data);

      const generatedCodeFromServer = response.data?.referralCode;
      setGeneratedReferralCode(generatedCodeFromServer);

      localStorage.setItem('referralCode', generatedCodeFromServer);



      
      // Save registration data
      const registrations = JSON.parse(localStorage.getItem('conferenceRegistrations') || '[]');
      registrations.push(newRegistration); // Now properly using newRegistration
      localStorage.setItem('conferenceRegistrations', JSON.stringify(registrations));
      
      setShowSuccess(true);
    } catch (err) {
      console.error('API error details', JSON.stringify(err.response?.data, null, 2));
      setError(
        err.response && err.response.data && err.response.data.message 
        ? err.response.data.message 
        : 'Registration failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl relative">
      <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-black hover:text-[#c44513] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold mb-4 bg-[#f68f34] bg-clip-text text-transparent">
              Join the Innovation Revolution
            </h1>
            <p className="text-lg text-[#64758b]">
              Register for Africa's premier innovation conference
            </p>
          </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 border-2 border-[#FCEAD7] p-8 rounded-2xl">
        <div className='flex gap-3'>
        <Users className="w-6 h-6 text-[#c44513]" /><span>Registration Form</span>
        </div>
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
          className="w-full bg-[#ad3435] text-white py-3 px-4 rounded-md hover:bg-[#ce2e31] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>

          <div className="mt-4">
            <p className="font-medium">Your Referral Link:</p>
            <div className="flex items-center mt-2">
              <input
                type="text"
                readOnly
                value={generateReferralLink(generatedReferralCode)}
                className="flex-grow p-2 border rounded-l text-sm"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateReferralLink(generatedReferralCode));
                  alert('Referral link copied to clipboard!');
                }}
                className="bg-indigo-600 text-white p-2 rounded-r hover:bg-indigo-700"
              >
                Copy
              </button>
            </div>
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