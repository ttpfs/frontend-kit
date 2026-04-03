import type React from "react";

export interface NotificationConfig {
	description?: string;
	timeout?: number;
	onClose?: () => void;
	icon?: React.ReactNode;
}

export interface INotification {
	clear(): void;
	close(id: string): void;
	success(message?: string, config?: NotificationConfig): string;
	error(message?: string, config?: NotificationConfig): string;
	info(message?: string, config?: NotificationConfig): string;
	warning(message?: string, config?: NotificationConfig): string;
}
