"use server";

export interface SignupState {
  error?: string;
  success?: boolean;
}

export async function signup(_prevState: SignupState, formData: FormData) {
  const userName = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!userName || userName.length < 4 || userName.length > 6) {
    return { error: "Username must be between 4 and 6 characters long." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Please provide a valid email address." };
  }

  return { success: true };
}
