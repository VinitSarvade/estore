'use client';

import { PropsWithChildren, useState } from 'react';

import { useMediaQuery } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import SignInForm from './sign-in-form';
import SignUpForm from './sign-up-form';
import SocialSignIn from './social';

enum FormType {
  SignIn,
  SignUp,
}

const FORM = {
  [FormType.SignIn]: {
    title: 'Sign In',
    Component: SignInForm,
    social: false,
    footerText: 'Not a member?',
    footerActionText: 'Sign up now!',
    footerActionClickValue: FormType.SignUp,
  },
  [FormType.SignUp]: {
    title: 'Sign Up',
    Component: SignUpForm,
    social: false,
    footerText: 'Already a member?',
    footerActionText: 'Sign in now!',
    footerActionClickValue: FormType.SignIn,
  },
};

interface AuthModalProps {
  triggerClass: string;
}

export function AuthModal({
  children,
  triggerClass,
}: PropsWithChildren<AuthModalProps>) {
  const [formType, setFormType] = useState(FormType.SignIn);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const {
    title,
    social,
    footerText,
    footerActionText,
    footerActionClickValue,
    Component,
  } = FORM[formType];

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger className={triggerClass}>{children}</DialogTrigger>

        <DialogContent className="md:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {social && <SocialSignIn />}

          <Component />

          <h3 className="text-center mt-3">
            {footerText}
            <Button
              variant="link"
              className="text-base text-secondary-foreground"
              onClick={() => setFormType(footerActionClickValue)}
            >
              {footerActionText}
            </Button>
          </h3>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger className={triggerClass}>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          {social && <SocialSignIn className="mb-6" />}

          <Component />

          <DrawerFooter className="pt-2 px-0">
            <h3 className="text-center mt-3">
              {footerText}
              <Button
                variant="link"
                className="text-base text-secondary-foreground"
                onClick={() => setFormType(footerActionClickValue)}
              >
                {footerActionText}
              </Button>
            </h3>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
