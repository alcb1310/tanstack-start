import type { ComponentProps } from 'react'
import { useFormContext } from '@/hooks/form-context'
import { Button } from '../ui/button'

interface FormButtonProps extends ComponentProps<typeof Button> {
	label?: string
}

export function FormButton({
	label = 'Submit',
	...props
}: Readonly<FormButtonProps>) {
	const form = useFormContext()

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					type='submit'
					variant='default'
					disabled={isSubmitting}
					{...props}
				>
					{label}
				</Button>
			)}
		</form.Subscribe>
	)
}
