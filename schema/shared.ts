export type ActionResult =
  | { success: true; message?: string; redirectUrl?: string }
  | { success: false; message: string; redirectUrl?: string };
