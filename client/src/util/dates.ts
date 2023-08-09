export function dateRange(startDate: string, endDate: string): string {
	const startUTCDate = new Date(startDate);
	const endUTCDate = new Date(endDate);

	const startDateString = startUTCDate.toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});

	const endDateString = endUTCDate.toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});

	return `${startDateString} - ${endDateString}`;
}

export function formatEventStatus(startDateStr: string, endDateStr: string): string {
	const now = new Date();
	const startDate = new Date(startDateStr);
	const endDate = new Date(endDateStr);

	const startDifference = startDate.getTime() - now.getTime();
	const endDifference = endDate.getTime() - now.getTime();

	const startSeconds = Math.floor(Math.abs(startDifference) / 1000);
	const startMinutes = Math.floor(startSeconds / 60);
	const startHours = Math.floor(startMinutes / 60);
	const startDays = Math.floor(startHours / 24);

	const endSeconds = Math.floor(Math.abs(endDifference) / 1000);
	const endMinutes = Math.floor(endSeconds / 60);
	const endHours = Math.floor(endMinutes / 60);
	const endDays = Math.floor(endHours / 24);

	if (startDifference < 0) {
		if (endDays > 0) {
			return `Ending in ${endDays} days`;
		}
		if (endHours > 0) {
			return `Ending in ${endHours} hours`;
		}
		return 'Ending soon';
	}
	if (startDays > 0) {
		return `Starting in ${startDays} days`;
	}
	if (startHours > 0) {
		return `Starting in ${startHours} hours`;
	}
	return 'Starting soon';
}

export function isStarted(dateStr: string): boolean {
	const date = new Date(dateStr);
	const now = new Date();
	return date.getTime() < now.getTime();
}

export function lastUpdated(utcString: string): string {
	const currentTime = new Date();
	const lastSeenTime = new Date(utcString);
	const timeDifferenceMs = currentTime.getTime() - lastSeenTime.getTime();

	const secondsAgo = Math.floor(timeDifferenceMs / 1000);
	const minutesAgo = Math.floor(secondsAgo / 60);
	const hoursAgo = Math.floor(minutesAgo / 60);
	const daysAgo = Math.floor(hoursAgo / 24);

	let timeAgo = '';

	if (secondsAgo < 60) {
		return `just now`;
	}

	if (minutesAgo < 60) {
		timeAgo = `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'}`;
	} else if (hoursAgo < 24) {
		timeAgo = `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'}`;
	} else {
		timeAgo = `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'}`;
	}

	return `${timeAgo} ago`;
}

export function formatTimeAgo(utcDateString: string): string {
	const utcDate = new Date(utcDateString);
	const currentDate = new Date();
	const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - utcDate.getTime()) / 1000);

	if (timeDifferenceInSeconds < 60) {
		return `just now`;
	} else if (timeDifferenceInSeconds < 3600) {
		const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
		return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
	} else if (timeDifferenceInSeconds < 86400) {
		const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
		return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
	} else {
		const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
		return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
	}
}
