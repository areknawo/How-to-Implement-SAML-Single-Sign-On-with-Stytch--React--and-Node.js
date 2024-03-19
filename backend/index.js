const express = require("express");
const cookieParser = require("cookie-parser");
const stytch = require("stytch");

require("dotenv").config();
require("express-async-errors");

const app = express();
const client = new stytch.B2BClient({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
});
const authenticate = async (req, res) => {
  try {
    const jwt = req.cookies.stytch_session_jwt || "";
    const { organization, member } = await client.sessions.authenticate({
      session_jwt: jwt,
    });

    return { organization, member, jwt };
  } catch (err) {
    res.redirect(
      `http://localhost:5173/${process.env.STYTCH_ORGANIZATION_SLUG}/login`
    );
  }
};

app.use(express.json(), cookieParser());
app.get("/api/sso-connections", async (req, res) => {
  const { organization, jwt } = await authenticate(req, res);
  const connections = await client.sso.getConnections(
    {
      organization_id: organization.organization_id,
    },
    {
      authorization: { session_jwt: jwt },
    }
  );

  return res.json(connections);
});
app.post("/api/sso-connections", async (req, res) => {
  const { body } = req;
  const { organization, jwt } = await authenticate(req, res);
  const { connection } = await client.sso.saml.createConnection(
    {
      organization_id: organization.organization_id,
      display_name: body.display_name,
    },
    {
      authorization: { session_jwt: jwt },
    }
  );

  if (connection) {
    await client.organizations.update(
      {
        organization_id: organization.organization_id,
        sso_jit_provisioning: "RESTRICTED",
        sso_default_connection_id: connection.connection_id,
        sso_jit_provisioning_allowed_connections: [
          ...organization.sso_jit_provisioning_allowed_connections,
          connection.connection_id,
        ],
      },
      {
        authorization: { session_jwt: jwt },
      }
    );

    return res.json({ connection });
  }
  return res.status(500).send("Server Error");
});
app.put("/api/sso-connections", async (req, res) => {
  const { body } = req;
  const { organization, jwt } = await authenticate(req, res);
  const { connection } = await client.sso.saml.updateConnection(
    {
      organization_id: organization.organization_id,
      ...body,
    },
    {
      authorization: { session_jwt: jwt },
    }
  );

  return res.json({ connection });
});
app.listen(8080);
