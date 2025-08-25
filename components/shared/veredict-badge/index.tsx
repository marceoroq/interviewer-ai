export const VeredictBadge = ({ totalScore }: { totalScore: number }) => {
  if (totalScore < 50)
    return (
      <span className="text-red-400 bg-slate-700 py-1 px-4 rounded-full">Not Recommended</span>
    );

  if (totalScore < 70)
    return (
      <span className="text-yellow-400 bg-slate-700 py-1 px-4 rounded-full">
        Consider with Reservations
      </span>
    );

  return <span className="text-green-400 bg-slate-700 py-1 px-4 rounded-full">Recommended</span>;
};
