import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// automatically scroll to the top of the page whenever pathname changes
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}