export const toggleLoadingCursor = (isLoading: boolean) => {
    if (isLoading) {
        document.body.style.cursor = 'progress';
    } else {
        document.body.style.cursor = 'auto';
    }
}