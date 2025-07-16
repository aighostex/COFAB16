import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [referralStats, setReferralStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(null);
  const navigate = useNavigate();

  // Pagination state
  const [currentRegPage, setCurrentRegPage] = useState(1);
  const [currentRefPage, setCurrentRefPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Calculate all metrics
  const totalRegistrations = registrations.length;
  const totalReferrals = registrations.filter(reg => reg.referredBy).length;
  const uniqueReferrers = new Set(
    registrations
      .filter(reg => reg.referralCode)
      .map(reg => reg.referralCode)
  ).size;
  const referralRate = totalRegistrations > 0 
    ? Math.round((totalReferrals / totalRegistrations) * 100) 
    : 0;

  // Filter registrations if filter is applied
//   const filteredRegistrations = filter
//     ? registrations.filter(reg => 
//         filter === 'direct' ? !reg.referredBy : reg.referredBy
//       )
//     : registrations;



  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/');
      return;
    }

    const fetchData = () => {
      try {
        const data = JSON.parse(localStorage.getItem('conferenceRegistrations') || '[]');
        setRegistrations(data);
        
        const referrals = {};
        data.forEach(reg => {
          if (reg.referralCode) {
            if (!referrals[reg.referralCode]) {
              referrals[reg.referralCode] = {
                code: reg.referralCode,
                owner: `${reg.firstName} ${reg.lastName}`,
                count: 0,
                referredUsers: []
              };
            }
            referrals[reg.referralCode].count++;
          }
          
          if (reg.referredBy) {
            const referrerCode = data.find(r => 
              `${r.firstName} ${r.lastName}` === reg.referredBy
            )?.referralCode;
            
            if (referrerCode && referrals[referrerCode]) {
              referrals[referrerCode].referredUsers.push({
                name: `${reg.firstName} ${reg.lastName}`,
                email: reg.email,
                date: new Date(reg.registeredAt).toLocaleDateString()
              });
            }
          }
        });

        setReferralStats(Object.values(referrals));


      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);

  // Get current registrations
  const indexOfLastReg = currentRegPage * itemsPerPage;
  const indexOfFirstReg = indexOfLastReg - itemsPerPage;
  const currentRegistrations = registrations.slice(indexOfFirstReg, indexOfLastReg);
  const totalRegPages = Math.ceil(registrations.length / itemsPerPage);

  // Get current referrals
  const indexOfLastRef = currentRefPage * itemsPerPage;
  const indexOfFirstRef = indexOfLastRef - itemsPerPage;
  const currentReferrals = referralStats.slice(indexOfFirstRef, indexOfLastRef);
  const totalRefPages = Math.ceil(referralStats.length / itemsPerPage);

  // Change page
  const paginateReg = (pageNumber) => setCurrentRegPage(pageNumber);
  const paginateRef = (pageNumber) => setCurrentRefPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Referral Network</h2>

            {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Registrations */}
        <div 
          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => setFilter(null)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Registrations</p>
              <p className="text-3xl font-bold">{totalRegistrations}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          </div>

        {/* Total Referrals */}
        <div 
          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => setFilter('referred')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Referrals</p>
              <p className="text-3xl font-bold">{totalReferrals}</p>
              <p className="text-sm text-gray-500 mt-1">
                {referralRate}% referral rate
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

         {/* Direct Registrations */}
        <div 
          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => setFilter('direct')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Direct Registrations</p>
              <p className="text-3xl font-bold">{totalRegistrations - totalReferrals}</p>
              <p className="text-sm text-gray-500 mt-1">
                {100 - referralRate}% of total
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Unique Referrers */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Unique Referrers</p>
              <p className="text-3xl font-bold">{uniqueReferrers}</p>
              <p className="text-sm text-gray-500 mt-1">
                Avg. {uniqueReferrers > 0 ? Math.round(totalReferrals / uniqueReferrers) : 0} referrals each
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter indicator */}
      {filter && (
        <div className="mb-4 flex items-center">
          <span className="text-sm font-medium mr-2">Showing:</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
            {filter === 'direct' ? 'Direct Registrations' : 'Referral Registrations'}
            <button 
              onClick={() => setFilter(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      )}
      
      {/* Items per page selector */}
      <div className="mb-6 flex items-center">
        <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium text-gray-700">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentRegPage(1);
            setCurrentRefPage(1);
          }}
          className="px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
          

            {isLoading ? (
                <p>Loading...</p>
            ) : currentReferrals.length > 0 ? (
            <>
                <div className="text-sm text-gray-500 mb-2">
                 Showing {indexOfFirstRef + 1}-{Math.min(indexOfLastRef, referralStats.length)} of {referralStats.length} referral codes
                </div>
                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Code Owner</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Count</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referred Users</th> */}
                        </tr>
                    </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentReferrals.map((stat, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{stat.owner}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono">{stat.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{stat.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => paginateRef(Math.max(1, currentRefPage - 1))}
                disabled={currentRefPage === 1}
                className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex">
                {Array.from({ length: totalRefPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginateRef(number)}
                    className={`mx-1 px-3 py-1 rounded-md text-sm ${currentRefPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginateRef(Math.min(totalRefPages, currentRefPage + 1))}
                disabled={currentRefPage === totalRefPages}
                className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No referral data available yet.</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Registrations</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : currentRegistrations.length > 0 ? (
          <>
            <div className="text-sm text-gray-500 mb-2">
              Showing {indexOfFirstReg + 1}-{Math.min(indexOfLastReg, registrations.length)} of {registrations.length} registrations
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referred By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRegistrations.map((reg, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{reg.firstName} {reg.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{reg.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {reg.referredBy || 'Direct Registration'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => paginateReg(Math.max(1, currentRegPage - 1))}
                disabled={currentRegPage === 1}
                className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex">
                {Array.from({ length: totalRegPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginateReg(number)}
                    className={`mx-1 px-3 py-1 rounded-md text-sm ${currentRegPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginateReg(Math.min(totalRegPages, currentRegPage + 1))}
                disabled={currentRegPage === totalRegPages}
                className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No registration data available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;