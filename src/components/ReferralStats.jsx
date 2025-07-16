const ReferralStats = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 font-medium">
        <div>Rank</div>
        <div>Referral Code</div>
        <div className="text-right">Count</div>
      </div>
      {data.map((item, index) => (
        <div key={item.code} className="grid grid-cols-3 gap-4 items-center">
          <div className="font-medium">#{index + 1}</div>
          <div className="font-mono bg-gray-100 px-2 py-1 rounded inline-block">{item.code}</div>
          <div className="text-right font-bold">{item.count}</div>
        </div>
      ))}
    </div>
  );
};

export default ReferralStats;