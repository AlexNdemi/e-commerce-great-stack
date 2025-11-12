import type { ControllerRenderProps } from "react-hook-form";

/* ----------------------- CHECKBOX ----------------------- */
type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
} & Pick<ControllerRenderProps, "name" | "onChange">;

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
}) => {
  const handleToggle = () => onChange(!checked);

  return (
    <div className="flex items-start gap-3 md:col-span-2 cursor-pointer select-none">
      {/* Checkbox visual */}
      <div
        onClick={handleToggle}
        className={`flex items-center justify-center w-5 h-5 border-2 rounded transition-colors mt-0.5 ${
          checked
            ? "border-[hsl(169,82%,27%)] bg-[hsl(148,38%,91%)]"
            : "border-[hsl(186,15%,59%)] hover:border-[hsl(169,82%,27%)]"
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-[hsl(169,82%,27%)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      {/* Hidden input for accessibility */}
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />

      {/* Label */}
      <label
        htmlFor={id}
        onClick={handleToggle}
        className="text-[hsl(187,24%,22%)] cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};