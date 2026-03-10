// Cookie Consent Manager
(function () {
    "use strict";

    const COOKIE_NAME = "cookie_consent";
    const COOKIE_EXPIRY_DAYS = 365; // 12 miesięcy (365 dni)

    const DEFAULT_CONSENT = {
        essential: true,
        functional: false,
        analytical: false,
        marketing: false,
    };

    // Funkcja do ustawiania cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        const stringifiedValue =
            typeof value === "object" ? JSON.stringify(value) : value;
        document.cookie = name + "=" + stringifiedValue + ";" + expires + ";path=/";
    }

    // Funkcja do odczytu cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Sprawdzenie czy użytkownik już wyraził zgodę
    function hasConsent() {
        return getCookie(COOKIE_NAME) !== null;
    }

    // Zapisz zgodę
    function saveConsent(consentData) {
        setCookie(COOKIE_NAME, consentData, COOKIE_EXPIRY_DAYS);
        hideBanner();
        hideModal();
    }

    // Pokaż banner
    function showBanner() {
        const banner = document.getElementById("cookie-banner");
        if (banner) {
            banner.style.display = "block";
            // Dodaj klasę dla animacji
            setTimeout(() => {
                banner.classList.add("show");
            }, 10);
        }
    }

    // Ukryj banner
    function hideBanner() {
        const banner = document.getElementById("cookie-banner");
        if (banner) {
            banner.classList.remove("show");
            setTimeout(() => {
                banner.style.display = "none";
            }, 300);
        }
    }

    // Pokaż modal preferencji
    function showModal() {
        const modal = document.getElementById("cookie-modal-overlay");
        if (modal) {
            modal.style.display = "flex";
            // Pobierz aktualne zgody jeśli istnieją
            const currentConsent = getCookie(COOKIE_NAME);
            if (currentConsent) {
                try {
                    const data = JSON.parse(currentConsent);
                    if (document.getElementById("cookie-functional"))
                        document.getElementById("cookie-functional").checked =
                            !!data.functional;
                    if (document.getElementById("cookie-analytical"))
                        document.getElementById("cookie-analytical").checked =
                            !!data.analytical;
                    if (document.getElementById("cookie-marketing"))
                        document.getElementById("cookie-marketing").checked =
                            !!data.marketing;
                } catch (e) {
                    console.error("Error parsing cookie consent", e);
                }
            }
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        }
    }

    // Ukryj modal preferencji
    function hideModal() {
        const modal = document.getElementById("cookie-modal-overlay");
        if (modal) {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        }
    }

    // Inicjalizacja po załadowaniu DOM
    function init() {
        // Sprawdź czy użytkownik już wyraził zgodę
        if (!hasConsent()) {
            showBanner();
        }

        // Obsługa przycisków na bannerze
        const acceptAllBtn = document.getElementById("cookie-accept-all");
        const acceptEssentialBtn = document.getElementById(
            "cookie-accept-essential"
        );
        const settingsBtn = document.getElementById("cookie-settings");

        if (acceptAllBtn) {
            acceptAllBtn.addEventListener("click", function (e) {
                e.preventDefault();
                saveConsent({
                    essential: true,
                    functional: true,
                    analytical: true,
                    marketing: true,
                });
            });
        }

        if (acceptEssentialBtn) {
            acceptEssentialBtn.addEventListener("click", function (e) {
                e.preventDefault();
                saveConsent({
                    essential: true,
                    functional: false,
                    analytical: false,
                    marketing: false,
                });
            });
        }

        if (settingsBtn) {
            settingsBtn.addEventListener("click", function (e) {
                e.preventDefault();
                showModal();
            });
        }

        // Obsługa modala
        const closeModalBtn = document.getElementById("cookie-modal-close");
        const saveSettingsBtn = document.getElementById("cookie-save-settings");
        const modalOverlay = document.getElementById("cookie-modal-overlay");

        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", hideModal);
        }

        if (modalOverlay) {
            modalOverlay.addEventListener("click", function (e) {
                if (e.target === modalOverlay) {
                    hideModal();
                }
            });
        }

        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener("click", function (e) {
                e.preventDefault();
                const consentData = {
                    essential: true,
                    functional: document.getElementById("cookie-functional").checked,
                    analytical: document.getElementById("cookie-analytical").checked,
                    marketing: document.getElementById("cookie-marketing").checked,
                };
                saveConsent(consentData);
            });
        }
    }

    // Uruchom po załadowaniu DOM
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    // Eksport funkcji dla użycia w innych skryptach
    window.CookieConsent = {
        hasConsent: hasConsent,
        getCookie: getCookie,
        setCookie: setCookie,
    };
})();
