/**
 * An array of public route that are accessible to the public without authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/signup"
];

/**
 * An array of public routes for authentication
 * @type {string[]}
 */
export const authRoute = [
    "/signin",
]

/**
 * the prefix for api authentication route
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * the prefix for api authentication route
 * @type {string}
 */
export const DEFAULT_REDIRECT = "/"