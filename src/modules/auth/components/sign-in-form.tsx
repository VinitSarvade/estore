'use client';

import { useState } from 'react';

import { AuthError } from '@supabase/supabase-js';
import { useForm } from '@tanstack/react-form';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import { Loader2Icon } from 'lucide-react';
import { email, minLength, string, toTrimmed } from 'valibot';

import { cn } from '@/lib/utils/cn';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { signIn } from '../actions';
import ErrorBanner from './error-banner';

interface SignInFormProps {
  className?: string;
}

export default function SignInForm({ className }: SignInFormProps) {
  const [submissionError, setSubmissionError] = useState<AuthError>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const result = await signIn(value);
      if (result && result.error) {
        setSubmissionError(result.error);
      }
      setIsSubmitting(false);
    },
    validatorAdapter: valibotValidator,
  });

  return (
    <>
      <ErrorBanner error={submissionError?.message} />

      <form.Provider>
        <form
          className={cn(
            'grid items-start gap-4 animate-in fade-in duration-500',
            className,
          )}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            validators={{
              onChange: string([
                toTrimmed(),
                minLength(1, 'Email required'),
                email('Enter valid email address'),
              ]),
            }}
          >
            {({ name, state: { value, meta }, handleBlur, handleChange }) => (
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name={name}
                  type="email"
                  id="email"
                  value={value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <div className="text-sm text-destructive">
                  {meta.touchedErrors}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: string([
                toTrimmed(),
                minLength(6, 'Must be at least 6 characters'),
              ]),
            }}
          >
            {({ name, state: { value, meta }, handleBlur, handleChange }) => (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name={name}
                  id="password"
                  type="password"
                  value={value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <div className="text-sm text-destructive">
                  {meta.touchedErrors}
                </div>
              </div>
            )}
          </form.Field>

          <Button type="submit" className="mt-2" disabled={isSubmitting}>
            <span className="flex place-items-center gap-2">
              {isSubmitting && <Loader2Icon className="animate-spin" />}
              Sign In
            </span>
          </Button>
        </form>
      </form.Provider>
    </>
  );
}
