export default function RadioGroup({ label, options, register }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-xl m-0">{label}</p>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer min-h-11 text-lg">
            <input
              type="radio"
              value={option}
              {...register}
              className="size-5 accent-primary cursor-pointer m-0"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
