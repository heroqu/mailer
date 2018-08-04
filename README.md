# Mailer

Little server, exposing an HTTP API for sending email messages.

Designed as a light weight backend to help sending emails from a frontend, e.g. site's contact form. It takes care of dispatching and effectively hides authentication credentials from the client.

Based on Express and [Nodemailer](https://www.npmjs.com/package/nodemailer) and have a simple API: it listens for POST requests at `/send` route.

## Transports supported

Two transport options are available:
- Gmail
  - sends SMTP requests to specified Gmail account.
- [Mailgun](https://www.mailgun.com/)
  - sends HTTP requests to the MAIL API of this provider.

## How it works

To deliver a message, client has to make a POST request with `{ name, email, subject, message }` parameters in the body. When a new request arrives, server does the following:

- Extracts { name, email, subject, message } params from the request body
- Performs validations:
  - Validates that no parameter is blank
  - Validates that email parameter look like a valid email,
  - If any of these validations fail, sends an HTTP response with 400 status and appropriate message
- Sanitizes each parameter by removing possible html tags
- Creates an email message object
- Choose the transport (Mailgun or Gmail) and try to send the message through it with [Nodemailer](https://www.npmjs.com/package/nodemailer)
- If Nodemailer fails to dispatch the email, returns Nodemailer's error to the client.

## CORS policy

Because this http server runs separately from main http server of the site, it listens at a different address, so the CORS policy is applied (with [cors](https://www.npmjs.com/package/cors) Express middleware) to avoid blocking cross origin requests by browser. CORS is configured with a whitelist of where the server can accept requests from.

## Configuration

All the configuration settings, including CORS whitelist, auth credentials, transport type and server port, are read from environment variables and an be set either directly or through one of .env files (which are then parsed and applied by [dotenv](https://www.npmjs.com/package/dotenv) utility).

## Dockerization

A sample Dockerfile is provided to run this server inside Docker container.

Both base image (node:alpine) and the PORT can be set as environment variables (see `ARG` and `ENV` statements), but if not, the default values are used.
