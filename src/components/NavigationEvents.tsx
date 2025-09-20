
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loader from '@/components/Loader';

export function NavigationEvents() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setLoading(true);

    const addLinkEventListeners = (node: Document | Element) => {
      const links = node.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('/')) {
            handleStart();
          }
        });
      });
    };

    addLinkEventListeners(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              addLinkEventListeners(node as Element);
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  return (
    <>
      {loading && <Loader />}
    </>
  );
}
