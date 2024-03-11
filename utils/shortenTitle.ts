export const shortenTitle = (title: string, length: number = 10) => {
	if (!title) return;
	if (title.length > length) {
		return `${title.substring(0, length + 1)}...`;
	}
	return title;
};
