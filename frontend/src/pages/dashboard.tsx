import { Authenticated } from "@/components/authenticated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreateSSOConnection } from "@/components/create-sso-connection";
import { Link, useParams } from "react-router-dom";
import {
  useStytchB2BClient,
  useStytchMember,
  useStytchOrganization,
} from "@stytch/react/b2b";
import { useEffect, useState } from "react";
import { SAMLConnection } from "@stytch/vanilla-js";

declare module "@stytch/vanilla-js/b2b" {
  export interface Member {
    is_admin?: boolean;
  }
}

const DashboardPage = () => {
  const [connections, setConnections] = useState<SAMLConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const client = useStytchB2BClient();
  const { member } = useStytchMember();
  const { organization } = useStytchOrganization();

  useEffect(() => {
    fetch("/api/sso-connections")
      .then((response) => {
        return response.json().then((value) => {
          setConnections(value.saml_connections);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [client]);

  return (
    <Authenticated>
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-4">
          <CardTitle>SAML SSO Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="pb-2">
            {connections.map((connection) => {
              return (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  key={connection.connection_id}
                  asChild
                >
                  <Link
                    to={`/${params.slug}/dashboard/${connection.connection_id}/`}
                  >
                    {connection.display_name} ({connection.status})
                  </Link>
                </Button>
              );
            })}
            {connections.length === 0 ||
              (loading && (
                <span className="text-gray-500 w-full text-center flex justify-center items-center py-2">
                  {loading ? "Loading..." : "No connections configured"}
                </span>
              ))}
          </div>
          <Separator className="mb-4" />
          {member?.is_admin && (
            <CreateSSOConnection organization_slug={params.slug || ""} />
          )}
        </CardContent>
      </Card>
      <div className="flex flex-col text-sm w-full max-w-sm p-2">
        <div>
          <span className="font-semibold">Organization name: </span>
          <span className="font-mono text-gray-700">
            {organization?.organization_name}
          </span>
        </div>
        <div>
          <span className="font-semibold">Organization slug: </span>
          <span className="font-mono text-gray-700">
            {organization?.organization_slug}
          </span>
        </div>
        <div>
          <span className="font-semibold">User: </span>
          <span className="font-mono text-gray-700">
            {member?.email_address} {member?.is_admin ? "(admin)" : "(member)"}
          </span>
        </div>
      </div>
    </Authenticated>
  );
};

export { DashboardPage };
