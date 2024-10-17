export const ResultsNotFound = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center p-5 text-2xl font-semibold">
      {message}
    </div>
  );
};
