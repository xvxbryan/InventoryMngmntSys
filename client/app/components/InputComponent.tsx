import React from "react";

interface InputProps {
    value: string;
    change: Function;
    placeholder: string;
    label: string;
    type: string;
}

const InputComponent: React.FC<InputProps> = ({
    value,
    change,
    placeholder,
    label,
    type,
}) => {
    return (
        <div className="flex flex-col">
            {
                label.length > 0 ? <label htmlFor="name">{label}</label> : null
            }

            <div className="w-full max-w-sm min-w-[200px]">
                <input
                    required
                    value={value}
                    onChange={(e) => change(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    type={type}
                />
            </div>
        </div>
    );
};

export default InputComponent;
