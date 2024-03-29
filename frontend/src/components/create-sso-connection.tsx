import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { SAMLConnection } from "@stytch/vanilla-js";
import { useNavigate } from "react-router-dom";

const CreateSSOConnection = ({
  organization_slug,
}: {
  organization_slug: string;
}) => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Label htmlFor="saml-display-name">Create a new SSO Connection</Label>
      <div className="flex gap-2">
        <Input
          className="flex-1"
          id="saml-display-name"
          placeholder="SAML Display Name"
          value={displayName}
          onInput={(e) => setDisplayName(e.currentTarget.value)}
        />
        <Button
          disabled={loading || !displayName}
          onClick={async () => {
            setLoading(true);
            try {
              const response = await fetch("/api/sso-connections", {
                method: "POST",
                body: JSON.stringify({ display_name: displayName }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data: { connection: SAMLConnection } =
                await response.json();

              setLoading(false);
              navigate(
                `/${organization_slug}/dashboard/${data.connection.connection_id}`
              );
            } catch (error) {
              alert("Error creating SAML connection");
              setLoading(false);
            }
          }}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export { CreateSSOConnection };
