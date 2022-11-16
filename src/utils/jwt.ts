import { is } from "immer/dist/internal";
import jwtDecode from "jwt-decode";
import { PATH_AUTH } from "src/routes/paths";

import axios from "./axios";

const isValidToken = (accessToken: string) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode<{ exp: number }>(accessToken);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

const decodeJWTUser = (accessToken: string) => {
    if (!accessToken) {
        return null;
    }

    const decoded = jwtDecode<Record<string, any>>(accessToken);
    console.log(decoded);

    return decoded.data;
}

const handleTokenExpired = (exp: number) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
        alert("Token expired");

        localStorage.removeItem("accessToken");

        window.location.href = PATH_AUTH.login;
    }, timeLeft);
};

const setSession = (accessToken: string | null) => {
    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // This function below will handle when token is expired
        const { exp } = jwtDecode<{ exp: number }>(accessToken); // ~3 days by minimals server
        handleTokenExpired(exp);
    } else {
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common.Authorization;
    }
};

export { isValidToken, setSession, decodeJWTUser };
