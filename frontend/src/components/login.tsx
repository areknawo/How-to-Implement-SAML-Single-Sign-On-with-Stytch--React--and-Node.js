import { useEffect, useState } from "react";
import {
  StytchB2B,
  useStytchMember,
  useStytchMemberSession,
} from "@stytch/react/b2b";
import {
  AuthFlowType,
  B2BAuthenticateResponse,
  B2BAuthenticateResponseWithMFA,
  B2BProducts,
  Callbacks,
  Organization,
  StyleConfig,
  StytchB2BUIConfig,
  StytchEventType,
} from "@stytch/vanilla-js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [config, setConfig] = useState<StytchB2BUIConfig | null>();
  const [authenticated, setAuthenticated] = useState(false);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const { member } = useStytchMember();
  const { session } = useStytchMemberSession();
  const navigate = useNavigate();
  const style: StyleConfig = {
    fontFamily: "Arial",
  };
  const callbacks: Callbacks = {
    onEvent: async ({ type, data }) => {
      if (
        [
          StytchEventType.B2BMagicLinkAuthenticate,
          StytchEventType.B2BSSOAuthenticate,
        ].includes(type)
      ) {
        const organization = (
          data as B2BAuthenticateResponseWithMFA | B2BAuthenticateResponse
        ).organization;
        setAuthenticated(true);
        setOrganization(organization);
        navigate(`/${organization.organization_slug}/dashboard`);
      }
    },
  };

  useEffect(() => {
    setConfig({
      authFlowType: AuthFlowType.Organization,
      products: [B2BProducts.sso],
      sessionOptions: {
        sessionDurationMinutes: 60,
      },
    });
  }, []);
  useEffect(() => {
    setAuthenticated(Boolean(member && session));
  }, [member, session]);
  useEffect(() => {
    if (authenticated && organization) {
      navigate(`/${organization.organization_slug}/dashboard`);
    }
  }, [navigate, authenticated, organization]);

  return config ? (
    <StytchB2B config={config} styles={style} callbacks={callbacks} />
  ) : null;
};

export { Login };
