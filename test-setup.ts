import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, mock } from 'bun:test';

GlobalRegistrator.register({ url: 'http://localhost:8080' });

afterEach(() => {
  cleanup();
});
