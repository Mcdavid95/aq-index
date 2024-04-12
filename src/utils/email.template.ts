export const verifyAccount = (first_name, token) => {
  return `
  <body style="background-color: #000; font-family: sans-serif; color: #fff;">

<h1 style="text-align: center; color: #00ffff;">Welcome to Pluto AI!</h1>

<p> Hi ${first_name}

<p style="text-align: center;">Thanks for signing up! To complete your registration and unlock the full potential of your account, please verify your email address.</p>

<p style="text-align: center;">Your One-Time Password (OTP) is:</p>

<h2 style="text-align: center; color: #00ffff; font-size: 24px;">${token}</h2>

<p style="text-align: center;">Please enter this code on the verification page to confirm your email address.</p>

<p style="text-align: center;">For security reasons, this code will expire in 15 minutes.</p>

<p style="text-align: center; font-size: smaller;">If you are having trouble verifying your email, please contact our support team at Support Email Address: hello@plutoai.parallelscore.com.</p>

<br>

<p style="text-align: center; color: #aaa;">This email is auto-generated. Please do not reply.</p>

</body>
  `;
};
