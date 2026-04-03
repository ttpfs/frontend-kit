import { toast } from "@heroui/react";
import { type INotification, type NotificationConfig } from "@/types";

export class Notification implements INotification {
	close(id: string): void {
		toast.close(id);
	}
	clear(): void {
		toast.clear();
	}
	success(message?: string, config?: NotificationConfig): string {
		return toast.success(message, config);
	}
	error(message?: string, config?: NotificationConfig): string {
		return toast.danger(message, config);
	}
	info(message?: string, config?: NotificationConfig): string {
		return toast.info(message, config);
	}
	warning(message?: string, config?: NotificationConfig): string {
		return toast.warning(message, config);
	}
}
