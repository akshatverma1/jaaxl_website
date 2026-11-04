'use client';

import { MotionConfig } from 'framer-motion';

/** Makes every Framer Motion animation honour the OS "reduce motion" setting. */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
