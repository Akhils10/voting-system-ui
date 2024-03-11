export function timeSince(date: number | string | Date): string {
	if (!date) {
		return "N/A";
	}

	let timestamp: number;

	if (typeof date === "number") {
		// Assume it's already a timestamp (epoch)
		timestamp = date;
	} else if (typeof date === "string") {
		// Try to parse the date string to obtain a timestamp
		timestamp = Date.parse(date);

		if (isNaN(timestamp)) {
			// If parsing fails, return "Invalid Date"
			return "Invalid Date";
		}
	} else if (date instanceof Date) {
		timestamp = date.getTime();
	} else {
		// If the input is not a number, string, or Date, return "Invalid Input"
		return "Invalid Input";
	}

	const seconds: number = Math.floor((new Date().getTime() - timestamp) / 1000);

	const intervals: Record<string, number> = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	let counter: number;
	for (const interval in intervals) {
		counter = Math.floor(seconds / intervals[interval]);
		if (counter > 0) {
			if (counter === 1) {
				return `${counter} ${interval} ago`;
			} else {
				return `${counter} ${interval}s ago`;
			}
		}
	}
	return `just now`;
}
