exports.verifyEmailTemplate = ({name, url}) => {
    return `
    <h1>Hello ${name}</h1>
    <p>Thank you for registering to BlinkIt. Please verify your Email address. To Verify your email, click on the button below.</p>
    <a href=${url} style="color:#071263; text-decoration: none;  margin-top:30px; padding: 20px;"> 
        Verify your Email
    </a>
    `
}