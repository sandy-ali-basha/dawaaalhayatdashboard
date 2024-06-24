export function loadHtmlFile(path: string) {
    return require(`./${path}`).default;
}