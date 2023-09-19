export const PositionData = () => {
    let objectCookies = localStorage.getItem("Position", "");
    if (objectCookies !== "" && objectCookies !== null && objectCookies !== undefined) {
        return JSON.parse(objectCookies);
    }
    else
        return undefined;
};