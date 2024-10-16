interface JobListCardProps {
  companyLogoUrl: string;
  companyName: string;
  jobTitle: string;
  country: string;
  state: string;
  city: string;
  createdAt: string;
  workMode: string;
}

export const JobListCard = ({
  companyLogoUrl,
  companyName,
  jobTitle,
  country,
  city,
  state,
  workMode,
}: JobListCardProps) => {
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 ">
          <div className="flex items-center px-2 rounded-md">
            <img
              className="h-[36px] w-[36px]"
              src={companyLogoUrl}
              alt={companyName}
            />
          </div>
          <div>
            <p className="text-xl font-semibold">{jobTitle}</p>
            <div className="flex gap-2 items-center text-sm">
              <p>Location: </p>
              <p>{country}</p>
              <p>{state}</p>
              <p className="text-sm">{city}</p>
            </div>
            <p className="text-sm">{workMode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
