import { type Meta, type StoryObj } from "@storybook/react-vite";
import {
	FormProvider,
	FormSubmitButton,
	TextField,
	useForm,
} from "@ttpfs/form-react";
import { Fieldset } from "@ttpfs/ui-react";
import z from "zod";

const meta = {
	component: TextField,
	title: "form/TextField",
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultSchema = z.object({
	name: z.string(),
});

export const Default: Story = {
	args: {
		label: "Name",
		name: "name",
	},
	decorators: [
		(_, { args }) => {
			const form = useForm({
				options: {
					defaultValues: {
						name: "Trần Thanh Phong",
					},
				},
				schema: defaultSchema,
			});

			const onSubmit = form.handleSubmit((values) => {
				console.log(values);
			});

			return (
				<FormProvider form={form} onSubmit={onSubmit}>
					<Fieldset>
						<Fieldset.Group>
							<form.TextField {...args} />
						</Fieldset.Group>
						<Fieldset.Actions>
							<FormSubmitButton>Submit</FormSubmitButton>
						</Fieldset.Actions>
					</Fieldset>
				</FormProvider>
			);
		},
	],
};

const requireSchema = z.object({
	name: z.string().nonempty({ error: "Name is required" }),
});

export const Require: Story = {
	args: {
		label: "Name",
		name: "name",
	},
	decorators: [
		(_, { args }) => {
			const form = useForm({
				options: {
					defaultValues: {
						name: "",
					},
				},
				schema: requireSchema,
			});

			const onSubmit = form.handleSubmit((values) => {
				console.log(values);
			});

			return (
				<FormProvider form={form} onSubmit={onSubmit}>
					<Fieldset className="min-w-60">
						<Fieldset.Group>
							<form.TextField {...args} />
						</Fieldset.Group>
						<Fieldset.Actions>
							<FormSubmitButton>Submit</FormSubmitButton>
						</Fieldset.Actions>
					</Fieldset>
				</FormProvider>
			);
		},
	],
};
