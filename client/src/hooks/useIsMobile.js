import { useEffect, useState } from 'react';

// UPI apps can only be opened from phones/tablets, so we adapt the payment layout.
const detect = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const touchTablet = navigator.maxTouchPoints > 1 && window.matchMedia('(pointer: coarse)').matches;
  return ua || touchTablet;
};

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => setIsMobile(detect()), []);
  return isMobile;
}
