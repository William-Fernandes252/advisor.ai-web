export function getShortName(fullName: string) {
	const nameParts = fullName.split(" ");
	const firstNameInitial = nameParts[0].charAt(0);
	const shortName = `${firstNameInitial}. ${nameParts[nameParts.length - 1]}`;
	return shortName;
}
