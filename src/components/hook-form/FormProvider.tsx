import { ReactNode } from 'react'
// hook form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

// ----------------------------------------------------------------------

type FormProviderProps = {
    children: ReactNode;
    methods: UseFormReturn<any>;
    onSubmit?: VoidFunction;
}


export default function FormProvider({children, methods, onSubmit}: FormProviderProps) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    )
}
