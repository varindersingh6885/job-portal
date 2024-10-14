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
  createdAt,
  workMode,
}: JobListCardProps) => {
  return (
    <div className="px-4 py-2 hover:bg-ui-background-primary-highlight rounded-sm hover:cursor-pointer">
      <div className="flex justify-between">
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
        <div className="flex flex-col items-end gap-1">
          <p className="text-xs">Created at</p>
          {createdAt}
        </div>
      </div>
    </div>
  );
};
