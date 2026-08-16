import { useSelector } from '@tanstack/react-form'
import type { ComponentProps } from 'react'
import { useFieldContext } from '@/hooks/form-context'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

interface FormTextFieldProps extends ComponentProps<'input'> {
	label: string
	placeholder: string
}

export function FormTextField({
	label,
	placeholder,
	...props
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
				{...props}
			/>
			{field.state.meta.isTouched && !field.state.meta.isValid && (
				<FieldError>{errors[0].message}</FieldError>
			)}
		</Field>
	)
}
