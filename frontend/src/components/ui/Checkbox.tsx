type CheckboxProps = {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ id, name, checked, label, onChange }: CheckboxProps) => (
  <div className="flex items-start gap-3 md:col-span-2">
    <div 
      className="flex items-center justify-center w-5 h-5 border-2 border-[hsl(186,15%,59%)] rounded mt-0.5 transition-colors cursor-pointer hover:border-[hsl(169,82%,27%)]"
      onClick={() => {
        const syntheticEvent = {
          target: { name, checked: !checked, type: 'checkbox' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }}
    >
      {checked && (
        <svg className="w-3 h-3 text-[hsl(169,82%,27%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <input
      type="checkbox"
      id={id}
      name={name}
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