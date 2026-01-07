export type UserRole = 'C' | 'M' | string;

export interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Ù„ÛŒØ³Øª Ù†Ù‚Ø´â€ŒÙ‡Ø§ÛŒ Ù…Ø¬Ø§Ø² â€” Ø§Ú¯Ø± Ù…Ø´Ø®Øµ Ù†Ø´Ø¯ØŒ Ù‡Ø± Ú©Ø§Ø±Ø¨Ø± Ù„Ø§Ú¯ÛŒÙ†â€ŒØ´Ø¯Ù‡ (Ø¨Ø§ Ù‡Ø± Ù†Ù‚Ø´ÛŒ) Ø¯Ø³ØªØ±Ø³ÛŒ Ø¯Ø§Ø±Ø¯
   * 
   * Ù…Ø«Ø§Ù„:
   *   allowedRoles={['M']} â†’ ÙÙ‚Ø· Ø¨Ø±Ù†Ø¯Ù‡Ø§
   *   allowedRoles={['C']} â†’ ÙÙ‚Ø· Ú©Ø§Ø±Ø¨Ø±Ø§Ù† Ø¹Ø§Ø¯ÛŒ
   *   allowedRoles={['admin']} â†’ ÙÙ‚Ø· Ø§Ø¯Ù…ÛŒÙ†â€ŒÙ‡Ø§
   *   allowedRoles={['C', 'M']} â†’ Ù‡Ù…Ù‡ Ù„Ø§Ú¯ÛŒÙ†â€ŒØ´Ø¯Ù‡â€ŒÙ‡Ø§
   *   allowedRoles={[]} ÛŒØ§ undefined â†’ Ù‡Ù…Ù‡ Ù„Ø§Ú¯ÛŒÙ†â€ŒØ´Ø¯Ù‡â€ŒÙ‡Ø§ (Ù¾ÛŒØ´â€ŒÙØ±Ø¶)
   */
  allowedRoles?: UserRole[];
}