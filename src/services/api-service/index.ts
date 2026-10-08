type GetToken = () => Promise<string | null>;

let tokenProvider: GetToken | null = null;

export const configureApi = (getToken: GetToken) => {
	tokenProvider = getToken;
};

// function esperar(ms: number): Promise<void> {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const apiFetch = async (
	input: RequestInfo | URL,
	init: RequestInit = {},
) => {
	const token = tokenProvider ? await tokenProvider() : null;

	const headers = new Headers(init.headers);

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	return fetch(input, {
		...init,
		headers,
	});
};
