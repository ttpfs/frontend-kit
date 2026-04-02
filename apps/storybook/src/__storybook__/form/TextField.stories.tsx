import { type Meta, type StoryObj } from "@storybook/react-vite";
import {
	FormProvider,
	FormSubmitButton,
	TextField,
	useForm,
} from "@ttpfs/form-react";
import z from "zod";

const schema = z.object({
	name: z.string().nonempty({
		error: "Name is required",
	}),
});

const meta = {
	component: TextField,
	decorators: [
		(Story, context) => {
			const form = useForm({
				options: {
					defaultValues: {
						name: "",
					},
				},
				schema,
			});

			const onSubmit = form.handleSubmit((values) => {
				console.log(values);
			});

			return (
				<FormProvider form={form} onSubmit={onSubmit}>
					<form.TextField control={form.control} label="Name" name="name" />
					<FormSubmitButton>Submit</FormSubmitButton>
				</FormProvider>
			);
		},
	],
	title: "form/TextField",
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Email",
		name: "name",
	},
};
