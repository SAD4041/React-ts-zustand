export const PROVINCES_QUERY_KEY = ["provinces"];

export const citiesQueryKey = (provinceNumber: number) => [
	"cities",
	provinceNumber,
];
