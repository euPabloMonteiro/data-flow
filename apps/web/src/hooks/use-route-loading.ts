"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function useRouteLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const previousPath = useRef(pathname + searchParams.toString());

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();

    if (currentPath !== previousPath.current) {
      previousPath.current = currentPath;
      setIsLoading(false);
    }
  }, [pathname, searchParams]);

  const startLoading = () => setIsLoading(true);

  return { isLoading, startLoading };
}
