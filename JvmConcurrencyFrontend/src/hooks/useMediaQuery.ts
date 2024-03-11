import React from "react";

function useMediaQuery(mediaQuery: string) {
  const mediaQueryObj = window.matchMedia(mediaQuery);
  const [matches, setMatches] = React.useState(mediaQueryObj.matches);

  React.useEffect(() => {
    function doesMatch(this: MediaQueryList): any {
      setMatches(this.matches);
    }

    mediaQueryObj.addEventListener("change", doesMatch);

    return mediaQueryObj.removeEventListener("change", doesMatch);
  }, []);

  return matches;
}

export default useMediaQuery;
