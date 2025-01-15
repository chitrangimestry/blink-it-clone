require("dotenv").config();

const { Resend } = require("resend");

if (!process.env.RESEND_API) {
  console.log("Provide RESEND_API in the .env File.");
}

const resend = new Resend(process.env.RESEND_API);

exports.sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "BlinkIt <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });

    if (error) {
      return console.error({ error });
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
