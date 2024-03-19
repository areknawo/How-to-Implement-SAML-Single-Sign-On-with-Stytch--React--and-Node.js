import { StytchB2BProvider } from "@stytch/react/b2b";
import { StytchB2BUIClient } from "@stytch/vanilla-js/b2b";
import React from "react";

const stytchClient = new StytchB2BUIClient(
  import.meta.env.VITE_STYTCH_PUBLIC_TOKEN || ""
);
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StytchB2BProvider stytch={stytchClient}>{children}</StytchB2BProvider>
  );
};

export { Provider };
