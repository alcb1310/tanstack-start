import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormButton } from '@/components/forms/FormButton'
import { FormTextField } from '@/components/forms/FormTextField'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts()

export const { useAppForm } = createFormHook({
	fieldComponents: {
		FormTextField,
	},
	formComponents: {
		FormButton,
	},
	fieldContext,
	formContext,
})
