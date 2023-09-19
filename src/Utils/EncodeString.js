
export const EncodeString = (string) => {
    if (string !== null && string !== undefined && string !== "") {
        if (string.trim() !== "") {
            return btoa(encodeURIComponent(string));
        }
    } else
        return '';
};