export function getChkBool(chkValue: number) {
    return (chkValue == 1);
}

export function getChkValue(chkBool: boolean) {
    return (chkBool ? 1 : 0);
}

export function createURL(url: string, prams?: { [key: string]: any; }) {
    let host: string = "";
    let opt: string = "";
    if (process.env.NODE_ENV === "production") {
        host = "";
    } else {
        host = "http://localhost:8000/";
    }
    if (prams != undefined) {
        for (const key in prams) {
            if (prams[key] != null) {
                opt += (opt == "" ? "?" : "&");
                opt += key + "=" + prams[key];
            }
        }
    }
    return host + url + opt
}

export function getext(version: string) {
    if (isEnptystr(version)) return "";
    let ret = "";
    const v = version.toLowerCase();
    if (v.indexOf('atom') != -1) {
        ret = "atom";
    } else {
        switch (v) {
            case 'rss20':
                ret = "rss2";
                break;
            default:
                ret = "rss1";
        }
    }
    return ret;
}

export function isEnptystr(str: string | null | undefined) {
    return (str == null || str == undefined || str == "")
}

export function isEnptynum(i: number | null | undefined) {
    return (i == null || i == undefined || i == 0)
}

