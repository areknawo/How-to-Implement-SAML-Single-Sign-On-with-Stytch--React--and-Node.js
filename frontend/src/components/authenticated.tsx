import {
  useStytchB2BClient,
  useStytchMember,
  useStytchMemberSession,
} from "@stytch/react/b2b";
import { ReactNode, useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Authenticated = ({ children }: { children: ReactNode }) => {
  const { member } = useStytchMember();
  const { session } = useStytchMemberSession();
  const stytch = useStytchB2BClient();
  const navigate = useNavigate();
  const authenticated = Boolean(member && session);
  const logout = async () => {
    await stytch.session.revoke();
    navigate(`/${import.meta.env.VITE_STYTCH_ORGANIZATION_SLUG}/login`);
  };

  useEffect(() => {
    if (!authenticated) {
      navigate(`/${import.meta.env.VITE_STYTCH_ORGANIZATION_SLUG}/login`);
    }
  }, [authenticated]);

  return authenticated ? (
    <>
      {children}
      <Button variant="ghost" onClick={logout} size="sm" className="mt-4">
        Logout
      </Button>
    </>
  ) : null;
};

export { Authenticated };
