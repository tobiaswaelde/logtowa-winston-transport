export const noUndefined = <T>(arr: (T | undefined)[]): T[] => {
	return arr.filter((x) => x) as T[];
};
