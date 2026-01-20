// Admin Access Control
// Configure admin email via environment variable or add directly here
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const ALLOWED_ADMIN_EMAILS = ADMIN_EMAIL
  ? [ADMIN_EMAIL.toLowerCase()]
  : [
      // Add your email address(es) here if not using environment variable
      // Example: "your.email@gmail.com"
    ];

/**
 * Check if a user's email is authorized to access admin panel
 */
export function isAuthorizedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;

  // If no emails are configured, allow anyone (development mode)
  if (ALLOWED_ADMIN_EMAILS.length === 0) {
    console.warn(
      "⚠️ SECURITY WARNING: No admin emails configured. Anyone can access admin panel!",
    );
    return true;
  }

  // Check if user's email is in the allowed list
  return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Get the list of allowed admin emails (for display purposes)
 */
export function getAllowedEmails(): string[] {
  return ALLOWED_ADMIN_EMAILS;
}
