import { useFormContext } from '@/hooks/form-context'
import { Button } from '../ui/button'

type FormButtonProps = {
	label?: string
}

export function FormButton({ label }: Readonly<FormButtonProps>) {
	const form = useFormContext()

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type='submit' variant='default' disabled={isSubmitting}>
					{label ? label : 'Submit'}
				</Button>
			)}
		</form.Subscribe>
	)
}
