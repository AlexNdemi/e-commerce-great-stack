type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButton = ({ id, name, value, label, checked, onChange }: RadioButtonProps) => (
  <div 
    className={`flex items-center gap-3 border rounded-lg px-6 py-3 transition-colors cursor-pointer ${
      checked 
        ? 'border-[hsl(169,82%,27%)] bg-[hsl(148,38%,91%)]' 
        : 'border-[hsl(186,15%,59%)] hover:border-[hsl(169,82%,27%)]'
    }`}
    onClick={() => {
      // Create a synthetic event that matches what onChange expects
      const syntheticEvent = {
        target: { name, value, type: 'radio', checked: true }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }}
  >
    <div className="flex items-center justify-center w-5 h-5 border-2 border-[hsl(186,15%,59%)] rounded-full transition-colors">
      {checked && (
        <div className="w-2.5 h-2.5 bg-[hsl(169,82%,27%)] rounded-full"></div>
      )}
    </div>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      required
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <label htmlFor={id} className="text-[hsl(187,24%,22%)] cursor-pointer flex-1">
      {label}
    </label>
  </div>
);