# Gmailer

Simple HTTP server to send emails through Gmail SMTP.

## The purpose

Designed as a light weight backend to help sending emails from a frontend, e.g. some contact form on a website.


## How it works

It is implemented as an **Express** server that listens for POST requests at `/send` URL.

The algorithm is the following:

- Extracts `{ name, email, subject, message }` params from the request body
- Performs validations:
  - Validates that no parameter is blank
  - Validates that `email` parameter look like a valid email,
  - If any of these validations fail, sends an HTTP response with 400 status and appropriate message
- Sanitizes each parameter by removing possible html tags
- Creates an email message object and tries to send it with Nodemailer package through Gmail SMTP
- If Nodemailer fails to dispatch the email, responds to the client with the error, reported by Nodemailer.

## CORS policy

Because the client using this server can be a frontend, and because such a frontend can be running on a different port and/or domain, then a CORS policy is applied (with Express middleware) to avoid blocking cross origin requests by browser.

CORS options use the *whitelist* of where the server can accept the send mail requests from.

## Configuration

Both CORS whitelist and SMTP credentials for Nodemailer are taken from environment variables.

See `.envrc.sample` file, which is an example of setting all the required ENV VARS.

## Dockerization

A sample Dockerfile is provided to run this server inside Docker container.

Both base image (node:alpine) and the PORT can be set as environment variables (see `ARG` and `ENV` statements), but if not, the default values are used.
