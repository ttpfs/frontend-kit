import { Alert as BaseAlert } from "@heroui/react";

const Alert = Object.assign(BaseAlert, {
	Content: BaseAlert.Content,
	Description: BaseAlert.Description,
	Icon: BaseAlert.Indicator,
	Title: BaseAlert.Title,
});

export { Alert };
