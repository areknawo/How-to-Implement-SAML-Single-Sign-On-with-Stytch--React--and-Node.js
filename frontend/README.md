# How to Implement SAML Single Sign On with Stytch, React and Node.js

This project that demonstrates how to implement SAML SSO with [Vite](https://vitejs.dev)-powered React frontend, Express.js backend and [Stytch](https://stytch.com/) SDK.

## Development

### Frontend

Navigate to the `frontend` directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Copy the `.env.example` file to `.env` and fill in the values:

```bash
VITE_STYTCH_PUBLIC_TOKEN=
VITE_STYTCH_ORGANIZATION_SLUG=
```

Run the development server:

```bash
npm run dev
```

### Backend

Navigate to the `backend` directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Copy the `.env.example` file to `.env` and fill in the values:

```bash
STYTCH_SECRET=
STYTCH_PROJECT_ID=
STYTCH_ORGANIZATION_SLUG=
```

Start the Node.js server:

```bash
npm run start
```

Go to the organization login portal (`http://localhost:3000/{{slug}}/login`, where `{{slug}}` is the slug assigned to your Stytch Organization) to test the login flow.
