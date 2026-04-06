import { type Meta, type StoryObj } from "@storybook/react-vite";
import {
	FormProvider,
	FormSubmitButton,
	SelectField,
	useForm,
} from "@ttpfs/form-react";
import { Fieldset } from "@ttpfs/ui-react";
import z from "zod";

const countries = [
	{
		id: "vietnamese",
		label: "Việt Nam",
	},
	{
		id: "korean",
		label: "Hàn Quốc",
	},
	{
		id: "argentina",
		label: "Argentina",
	},
	{
		id: "venezuela",
		label: "Venezuela",
	},
	{
		id: "japan",
		label: "Japan",
	},
	{
		id: "france",
		label: "France",
	},
	{
		id: "thailand",
		label: "Thailand",
	},
	{
		id: "italy",
		label: "Italy",
	},
	{
		id: "new-zealand",
		label: "New Zealand",
	},
];

const meta = {
	component: SelectField,
	parameters: {
		layout: "padded",
	},
	title: "form/SelectField",
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultSchema = z.object({
	country: z.string(),
});

export const Default: Story = {
	args: {
		label: "Country",
		name: "country",
		options: countries,
	},
	decorators: [
		(Story) => {
			const form = useForm({
				options: {
					defaultValues: {
						country: "vietnamese",
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
							<Story />
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
	country: z.string().nonempty({ error: "Country is required" }),
});

export const Require: Story = {
	args: {
		label: "Country",
		name: "country",
		options: countries,
		required: true,
	},
	decorators: [
		(Story) => {
			const form = useForm({
				options: {
					defaultValues: {
						country: "",
					},
				},
				schema: requireSchema,
			});

			const onSubmit = form.handleSubmit((values) => {
				console.log(values);
			});

			return (
				<FormProvider form={form} onSubmit={onSubmit}>
					<Story />
					<FormSubmitButton>Submit</FormSubmitButton>
				</FormProvider>
			);
		},
	],
};
