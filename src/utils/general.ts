export function toFirstUpperCase(str: string) {
	return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function equalsIgnoreCase(str1?: string | readonly string[] | number, str2?: string | readonly string[] | number) {
	return String(str1 ?? '').toLowerCase() === String(str2 ?? '').toLowerCase();
}