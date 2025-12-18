/**
 * Helper to get the correct asset path for Vite
 * Works for both local development and GitHub Pages
 */
export const getAssetPath = (path: string): string => {
    // Get the base URL (e.g., '/CNBible/' or '/')
    const baseUrl = import.meta.env.BASE_URL;

    // Combine them and remove any double slashes "//"
    return `${baseUrl}/${path}`.replace(/\/+/g, '/');
};