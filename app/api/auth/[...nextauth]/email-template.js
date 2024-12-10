export const createVerificationEmailHTML = (url) => `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #333; text-align: center;">Welcome to CABEN</h1>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${url}"
                style="background-color: #F7CE3E;
                       color: black;
                       padding: 12px 24px;
                       text-decoration: none;
                       border-radius: 5px;
                       font-weight: bold;
                       display: inline-block;">
                Login
            </a>
        </div>
        <p style="color: #666; text-align: center; margin-top: 20px;">
            This link is valid for 24 hours. If you didn't request this login, 
            you can ignore this email.
        </p>
    </div>
`; 