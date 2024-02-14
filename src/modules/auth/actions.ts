'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/server-client';

interface SignInData {
  email: string;
  password: string;
}

export async function signIn(data: SignInData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error };
  }

  revalidatePath('/', 'layout');
  return null;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function signUp(data: SignUpData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { email, password, ...userDetails } = data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: userDetails },
  });

  if (error) {
    return { error };
  }

  revalidatePath('/', 'layout');
  return null;
}
