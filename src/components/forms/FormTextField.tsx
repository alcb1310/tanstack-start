import { useSelector } from '@tanstack/react-form'
import { useFieldContext } from '@/hooks/form-context'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type FormTextFieldProps = {
	label: string
	placeholder: string
}

export function FormTextField({
	label,
	placeholder,
}: Readonly<FormTextFieldProps>) {
	const field = useFieldContext()
	const errors = useSelector(field.store, (state) => state.meta.errors)

	return (
		<Field>
			<FieldLabel htmlFor={label}>{label}</FieldLabel>
			<Input
				name={label}
				autoComplete='off'
				placeholder={placeholder}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
			/>
			{errors.map((error: string) => {
				return <FieldError key={error}>Error: {error}</FieldError>
			})}
		</Field>
	)
}
