"use client";

import type * as React from "react";
import { useThemeSwitch } from "@/lib/use-theme-switch";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

interface ThemeSyncStatusProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Whether to show a refresh button
	 */
	showRefresh?: boolean;

	/**
	 * Whether to show the sync settings status
	 */
	showSettings?: boolean;
}

export function ThemeSyncStatus({
	className,
	showRefresh = true,
	showSettings = false,
	...props
}: ThemeSyncStatusProps) {
	const { syncStatus, syncThemes, presets } = useThemeSwitch();
	const {
		isSyncing,
		lastSyncTime,
		syncEnabled = true,
		syncInterval = 24,
	} = syncStatus;

	const formatTime = (date: Date | null) => {
		if (!date) return "Never";

		// Format as relative time if less than 24 hours ago
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const hours = Math.floor(diff / (1000 * 60 * 60));

		if (hours < 24) {
			if (hours === 0) {
				const minutes = Math.floor(diff / (1000 * 60));
				return minutes <= 0 ? "Just now" : `${minutes}m ago`;
			}
			return `${hours}h ago`;
		}

		return date.toLocaleDateString();
	};

	// Format the interval for display
	const formatInterval = (hours: number) => {
		if (hours < 1) return "Less than hourly";
		if (hours === 1) return "Every hour";
		if (hours === 24) return "Daily";
		if (hours === 168) return "Weekly";
		if (hours >= 720) return "Monthly";
		return `Every ${hours} hours`;
	};

	return (
		<div
			className={cn(
				"flex items-center gap-2 text-xs text-muted-foreground",
				className,
			)}
			{...props}
		>
			<div className="flex-1">
				<span className="mr-1">{presets.length} themes</span>
				{lastSyncTime && <span>• Last sync: {formatTime(lastSyncTime)}</span>}
				{showSettings && (
					<>
						<span>• {syncEnabled ? "Auto sync " : "Manual sync only"}</span>
						{syncEnabled && syncInterval && (
							<span>• {formatInterval(syncInterval)}</span>
						)}
					</>
				)}
			</div>

			{showRefresh && (
				<Button
					variant="ghost"
					size="icon"
					className="h-6 w-6"
					disabled={isSyncing}
					onClick={() => syncThemes()}
					title="Sync themes with tweakcn"
				>
					<RefreshCw className={cn("h-3 w-3", isSyncing && "animate-spin")} />
				</Button>
			)}
		</div>
	);
}
