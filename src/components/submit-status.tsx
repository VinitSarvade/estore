'use client';

import { ReactElement, cloneElement } from 'react';
import { useFormStatus } from 'react-dom';

export default function SubmitStatus({ children }: { children: ReactElement }) {
  const status = useFormStatus();

  return cloneElement(children, { disabled: status.pending });
}
