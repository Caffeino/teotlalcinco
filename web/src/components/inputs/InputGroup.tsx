import { Eye, EyeOff } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';

interface InputGroupProps {
	name: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	error?: string;
	type?: string;
	isTextArea?: boolean;
	rows?: number;
	className?: string;
	placeholder?: string;
}

const InputGroup = ({
	name,
	label,
	value,
	onChange,
	error,
	type = 'text',
	isTextArea = false,
	rows = 3,
	className = '',
	placeholder = ''
}: InputGroupProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const InputType = isTextArea ? 'textarea' : 'input';

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={className}>
			<label
				htmlFor={name}
				className={`text-[0.813rem] ${error ? 'text-red-400' : 'text-slate-600'}`}
			>
				{label}
			</label>
			<div
				className={`input-box ${error ? 'bg-red-50/50 border-red-300 focus-within:border-red-400' : 'border-dashed border-gray-200 inset-shadow-sm inset-shadow-sky-200/50 focus-within:border-sky-200 focus-within:border-solid'}`}
			>
				<InputType
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					rows={isTextArea ? rows : undefined}
					type={isTextArea ? undefined : type}
					className={`w-full bg-transparent outline-none`}
					autoComplete='off'
					placeholder={placeholder}
				/>

				{type === 'password' && (
					<>
						{showPassword ? (
							<Eye
								size={22}
								onClick={() => toggleShowPassword()}
								className='text-primary cursor-pointer'
							/>
						) : (
							<EyeOff
								size={22}
								onClick={() => toggleShowPassword()}
								className='text-slate-400 cursor-pointer'
							/>
						)}
					</>
				)}
			</div>
			{error && <p className='-mt-4 text-[0.813rem] text-red-400'>{error}</p>}
		</div>
	);
};

export default InputGroup;
