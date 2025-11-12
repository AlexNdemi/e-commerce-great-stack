import type { ControllerRenderProps } from "react-hook-form";
type RadioButtonProps = {
  id: string;
  label: string;
  value: string;
  checked: boolean;
} & Pick<ControllerRenderProps, "name" | "onChange">;

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 border rounded-lg px-6 py-3 cursor-pointer transition-colors ${
        checked
          ? "border-[hsl(169,82%,27%)] bg-[hsl(148,38%,91%)]"
          : "border-[hsl(186,15%,59%)] hover:border-[hsl(169,82%,27%)]"
      }`}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)} // Send value to RHF
        className="hidden"
      />
      <div className="flex items-center justify-center w-5 h-5 border-2 border-[hsl(186,15%,59%)] rounded-full transition-colors">
        {checked && (
          <div className="w-2.5 h-2.5 bg-[hsl(169,82%,27%)] rounded-full" />
        )}
      </div>
      <span className="text-[hsl(187,24%,22%)]">{label}</span>
    </label>
  );
};