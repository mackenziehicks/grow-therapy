const Card = ({
  title,
  secondaryTitle,
  secondaryValue,
}: {
  title: string
  secondaryTitle: string
  secondaryValue: string | number
}) => {
  return (
    <div className="tw-shadow-md tw-shadow-slate-400 tw-border tw-border-solid tw-border-slate-200 tw-rounded-sm tw-w-full tw-flex tw-h-48 tw-p-6 tw-items-center tw-justify-between tw-space-x-4">
      <h2 className="tw-text-left">{title}</h2>
      <div className="tw-text-left">
        <h6>{secondaryTitle}</h6>
        <p>{secondaryValue}</p>
      </div>
    </div>
  )
}

export default Card
