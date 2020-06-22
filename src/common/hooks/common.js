import {useState, useEffect} from "react";

export function useGetClientWidth(windowWidth, maxWidth=720) {
  const [clientWidth, setClientWidth] = useState(null);
  useEffect(() => {
    if(windowWidth > maxWidth) {
      setClientWidth(720);
    } else {
      setClientWidth(windowWidth);
    }
  } );

  return clientWidth;
}
