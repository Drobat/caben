export const createVerificationEmailHTML = (url) => `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #333; text-align: center; margin-bottom: 30px;">Welcome to CABEN!<br>Your Course Access is Ready</h1>
        
        <p style="margin-bottom: 20px;">Dear Student,</p>
        
        <p style="margin-bottom: 20px;">
            Congratulations and welcome to CABEN! We're thrilled to have you join us on your journey to mastering Academic 
            and Business English. Your course is now active, and your learning experience begins here.
        </p>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h2 style="color: #F7CE3E; margin-bottom: 15px;">Here's how to get started:</h2>
            
            <h3 style="color: #444; margin-bottom: 10px;">Access Your Live Zoom Class:</h3>
            <p style="margin-bottom: 20px;">
                Your Zoom class link will be available in your course dashboard once you complete your account setup.
                This link will remain active for the entire duration of your course.
            </p>

            <h3 style="color: #444; margin-bottom: 10px;">Complete Your Account Setup:</h3>
            <p style="margin-bottom: 20px;">Click the button below to access your account:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${url}"
                    style="background-color: #F7CE3E;
                           color: black;
                           padding: 12px 24px;
                           text-decoration: none;
                           border-radius: 5px;
                           font-weight: bold;
                           display: inline-block;">
                    Access My Account
                </a>
            </div>
        </div>

        <div style="margin: 30px 0;">
            <h3 style="color: #444; margin-bottom: 10px;">Payment Receipt:</h3>
            <p style="margin-bottom: 20px;">
                Your payment receipt is available in your course account and will also be sent to you directly via Stripe.
            </p>

            <h3 style="color: #444; margin-bottom: 10px;">Need Help?</h3>
            <p style="margin-bottom: 20px;">
                If you have any questions or run into any issues, our support team is ready to assist at 
                <a href="mailto:support@caben.com" style="color: #F7CE3E;">support@caben.com</a>
            </p>
        </div>

        <p style="margin-bottom: 20px;">
            We're excited to see your progress and can't wait to support you on this learning adventure.
        </p>

        <p style="margin-bottom: 20px;">
            Best regards,<br>
            The CABEN Team
        </p>

        <p style="color: #666; text-align: center; margin-top: 40px; font-size: 0.9em;">
            This link is valid for 24 hours. If you didn't request this login, you can ignore this email.
        </p>
    </div>
`; 