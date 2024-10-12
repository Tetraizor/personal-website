export function getDifferenceInDays(date1: Date, date2: Date): number {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

export function getDifferenceInDaysFormatted(date1: Date, date2: Date) {
  const diff = getDifferenceInDays(date1, date2);
  if (diff === 0) {
    return "Today";
  } else if (diff === 1) {
    return "Yesterday";
  } else if (diff < 0) {
    return `${Math.abs(diff)} days in the future`;
  } else if (diff > 365) {
    return `${diff / 365} years ago`;
  } else if (diff > 30) {
    const months = Math.floor(diff / 30);
    if (months === 1) {
      return "1 month ago";
    } else {
      return `${months} months ago`;
    }
  } else if (diff > 7) {
    return `${diff / 7} weeks ago`;
  } else {
    return `${diff} days ago`;
  }
}
