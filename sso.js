const ssoConfig = {
    currentUserUrl: "https://backend.apsoprojects.org/auth/me",
    loginUrl: "https://sso.apsoprojects.org/auth/login",
    enabled: false,
};

async function loadCurrentUser() {
    document.body.style.visibility = "hidden";
    document.documentElement.style.overflow = "hidden";

    const authStatus = document.createElement("p");
    authStatus.textContent = "Checking your session…";
    authStatus.setAttribute("role", "status");
    authStatus.style.cssText = "position: fixed; inset: 0; display: grid; place-items: center; margin: 0; visibility: visible;";
    document.body.prepend(authStatus);

    try {
        const response = await fetch(ssoConfig.currentUserUrl, {
            credentials: "include",
        });

        if (response.status === 401) {
            window.location.replace(ssoConfig.loginUrl);
            return;
        }

        if (!response.ok) {
            throw new Error(`Unable to verify session (${response.status}).`);
        }

        window.currentUser = await response.json();
        authStatus.remove();
        document.body.style.removeProperty("visibility");
        document.documentElement.style.removeProperty("overflow");
    } catch (error) {
        authStatus.textContent = "Unable to verify your session. Please refresh and try again.";
        authStatus.setAttribute("role", "alert");
        console.error(error);
    }
}

if (ssoConfig.enabled) {
    loadCurrentUser();
}
