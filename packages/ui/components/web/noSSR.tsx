import { FC, useState, useEffect } from "react";

const NoSSR: FC = ({ ...props }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  return <>
    { mounted ? props : null }
  </>
}

export default NoSSR;
