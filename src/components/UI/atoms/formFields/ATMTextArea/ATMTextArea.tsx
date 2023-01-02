import React from "react";

type Props = {
  label?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  minRows?:number
};

const ATMTextArea = ({ 
    label, 
    required = false, 
    value, 
    onChange ,
    className,
    placeholder,
    minRows = 1,
}: Props) => {
  return (
    <div className="relative flex flex-col">
      {label && (
        <label 
        className="text-slate-500"
        >
          {label} {required && <span className="text-red-500"> * </span>}
        </label>
      )}
      <textarea 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      rows={minRows}
      className={`w-full p-2 text-slate-700 border border-slate-400 outline-blue-400  ${label && 'mt-1'}  ${className}`}
      placeholder={placeholder}
      
      />
    </div>
  );
};

export default ATMTextArea;
