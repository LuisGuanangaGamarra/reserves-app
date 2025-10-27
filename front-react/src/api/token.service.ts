import axios from "axios";

const tokenUrl = import.meta.env.VITE_API_TOKEN_URL as string;

export async function getToken(): Promise<string | null> {
    try {
        const { data } = await axios.get(tokenUrl, {
            withCredentials: true,
        });

        return data.token as string;
    } catch {
        return null;
    }
}