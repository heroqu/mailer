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

## Local setup

### 1. Clone the repo.

``` shell
# go to some directory, run:
git clone git@github.com:heroqu/mailer.git
# go to that dir
cd mailer
```

### 2. Install dependencies

``` shell
npm install -save    

# OR     

yarn
```

### 3. Make configuration

Now you have to create .env file and fill it with valid configuration values. You can start by copying example:

``` shell
cp .env.sample .env
```

In this file you should specify:

- desired port, default is 3020
- TO: address - the receiving email where all the messages should end up (should be one of your own probably, we don't spam, do we).
- transport: 'mailgun' or 'gmail'
- credentials for either mailgun or gmail

### 4. Run

When you are set, you can run it:

``` shell
npm start    

# OR   

yarn start
```

Alternatively, if you want to see more info on screen you can run in debug mode:

``` shell
npm run dev    

# OR    

yarn dev
```

### 5. Check health in web browser

open http://localhost:3020 (if your port is still 3020)

and see the hello message:

"The mailer is here, use POST at __/send__ to sumbit a message"

### 6. Test send with curl

or, you can send a real message with curl:

```
curl -H "Content-Type: application/json" -X POST -d '{"name":"John","email":"doe@gmail.com" ,"subject":"❗✍ from curl","message":"Can you see this?!"}' http://localhost:3020/send
```

if the email address is really yours, you are online and the transport credentials and everything is OK, you should receive a new letter in your inbox by now.
