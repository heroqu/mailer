# Mailer

Little server, exposing an HTTP API for sending email messages.

Designed as a light weight backend to help sending emails from a frontend, e.g. site's contact form. It takes care of dispatching and effectively hides authentication credentials from the client.

Based on Express and [Nodemailer](https://www.npmjs.com/package/nodemailer) and have a simple API: it listens for POST requests at `/send` route.

## Delivery methods

Several mail transport options are supported:

- SMTP
- Gmail
  - sends SMTP requests to specified Gmail account.
- Dedicated HTTP Mail API providers:
  - [Mailgun](https://mailgun.com)
  - [Sendinblue](https://https://sendinblue.com)

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

The server support CORS. The local cors route is based on Express middleware from [cors npm module](https://www.npmjs.com/package/cors) and implements the following logic:

One can specify the list of allowed origins in environment variable (**.env** and **.env.production** files are supported too):

```shell
MAILER_WHITELIST=http://example.com,http://www.example.com
```

with comma separated list of URLs. This list is then **_url-parsed_** and turned into hostnames only:

```js
const whitelist = ['example.com', 'www.example.com']
```

When CORS request is received, the origin under examination is turned into a hostname before the whitelist checking.

E.g, let the origin URL be `http://subdomain.example.com/some/page`. Then its hostname is `subdomain.example.com`, which is checked against `['example.com', 'www.example.com']` - which makes the CORS check fail, as there is no match.

The algorithm is protocol agnostic, so both http and https origin are treated equally.

## Dockerization

A sample Dockerfile is provided to run this server inside Docker container.

Both base image (node:alpine) and the PORT can be set as environment variables (see `ARG` and `ENV` statements), but if not, the default values are used.

## Local setup

### 1. Clone the repo.

```shell
# go to some directory, run:
git clone git@github.com:heroqu/mailer.git
# go to that dir
cd mailer
```

### 2. Install dependencies

```shell
npm install -save

# OR

yarn
```

### 3. Configuration

Configuration settings, including CORS whitelist, transport type, transport credentials and server port - all are read from environment variables and can be set either directly or through **.env** or **.env.production** files, which are parsed by [dotenv](https://www.npmjs.com/package/dotenv) (Look in the **.env.sample** file for details).

### 4. Run

When vars are ready, one cat run the mailer:

```shell
npm start

# OR

yarn start
```

Alternatively, if you want to see more info on screen you can run in debug mode:

```shell
npm run dev

# OR

yarn dev
```

### 5. Health check in web browser

open http://localhost:3020 (if your port is still 3020)

and see the hello message:

"The mailer is here"

### 6. Try to send with curl

Then one can also try to send a real message with curl:

```
curl -H "Content-Type: application/json" -X POST -d '{"name":"Donald","email":"marshall@gmail.com" ,"subject":"❗✍ from curl","message":"Can you see this?!"}' http://localhost:3020/send
```

if the email address is really yours, you are online and the transport credentials and everything is OK, you should receive a new letter in your inbox by now.
