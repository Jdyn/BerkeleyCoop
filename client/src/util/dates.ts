export function dateRange(startDate: string, endDate: string): string {
  const startUTCDate = new Date(startDate);
  const endUTCDate = new Date(endDate);

  const startDateString = startUTCDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
  });

  const endDateString = endUTCDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
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
    } else if (endHours > 0) {
      return `Ending in ${endHours} hours`;
    } else {
      return "Ending soon";
    }
  } else {
    if (startDays > 0) {
      return `Starting in ${startDays} days`;
    } else if (startHours > 0) {
      return `Starting in ${startHours} hours`;
    } else {
      return "Starting soon";
    }
  }
}

export function isStarted(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return date.getTime() < now.getTime();
}

export function getLastSeen(epochNumber: number): string {
  const currentTime = new Date().getTime();
  const timeDifferenceInSeconds = Math.floor((currentTime - epochNumber) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `last seen just now`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `last seen ${minutes} minutes ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `last seen ${hours} hours ago`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `last seen ${days} days ago`;
  }
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
