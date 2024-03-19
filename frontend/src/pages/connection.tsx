import { Authenticated } from "@/components/authenticated";
import { SSOConnectionForm } from "@/components/sso-connection-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStytchB2BClient, useStytchMember } from "@stytch/react/b2b";
import { SAMLConnection } from "@stytch/vanilla-js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

declare module "@stytch/vanilla-js/b2b" {
  export interface Member {
    is_admin?: boolean;
  }
}

const ConnectionPage = () => {
  const [connection, setConnection] = useState<SAMLConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const client = useStytchB2BClient();
  const { member } = useStytchMember();

  useEffect(() => {
    fetch("/api/sso-connections")
      .then((response) => {
        return response.json().then((value) => {
          const connection =
            value.saml_connections.find((connection: SAMLConnection) => {
              return connection.connection_id === params.connection_id;
            }) || null;
          setConnection(connection);
          if (!connection) navigate(`/${params.slug}/dashboard`);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [client, navigate, params.connection_id, params.slug]);

  return (
    <Authenticated>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Edit SAML SSO Connection</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <span className="text-gray-500 w-full text-center flex justify-center items-center py-2">
              Loading...
            </span>
          )}
          {connection && (
            <SSOConnectionForm
              canEdit={Boolean(member?.is_admin)}
              connection={connection}
              backLink={`/${params.slug}/dashboard`}
            />
          )}
        </CardContent>
      </Card>
    </Authenticated>
  );
};

export { ConnectionPage };
