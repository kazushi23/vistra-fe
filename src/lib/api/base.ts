
export async function apiFetch(input: RequestInfo | URL, init?: RequestInit, json = true):Promise<Response> {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
        ...(json ? {"Content-Type": "application/json"} : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
    };
    const response = await fetch(input, {
        ...init,
        headers
    })

    if (response.status === 401 || response.status === 403) {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            window.location.href = "/login"; // redirects user immediately
        }
    }
    return response;
}