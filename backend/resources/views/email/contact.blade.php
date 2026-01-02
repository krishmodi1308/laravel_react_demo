<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Enquiry</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:6px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">

                <tr>
                    <td style="background-color:#1f2937; padding:20px;">
                        <h2 style="margin:0; color:#ffffff; font-size:20px; text-align:center;">
                            New Contact Enquiry
                        </h2>
                    </td>
                </tr>

                <tr>
                    <td style="padding:25px; color:#333333; font-size:14px; line-height:1.6;">
                        <p style="margin:0 0 15px;">
                            You have received a new enquiry with the following details:
                        </p>

                        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                            <tr>
                                <td style="padding:8px 0; font-weight:bold; width:120px;">Name:</td>
                                <td style="padding:8px 0;">{{ $mailData['name'] }}</td>
                            </tr>
                            <tr>
                                <td style="padding:8px 0; font-weight:bold;">Email:</td>
                                <td style="padding:8px 0;">{{ $mailData['email'] }}</td>
                            </tr>
                            <tr>
                                <td style="padding:8px 0; font-weight:bold;">Phone:</td>
                                <td style="padding:8px 0;">{{ $mailData['phone'] }}</td>
                            </tr>
                            <tr>
                                <td style="padding:8px 0; font-weight:bold;">Subject:</td>
                                <td style="padding:8px 0;">{{ $mailData['subject'] }}</td>
                            </tr>
                        </table>

                        <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;">

                        <p style="margin:0 0 8px; font-weight:bold;">Message:</p>
                        <p style="margin:0; white-space:pre-line;">
                            {{ $mailData['message'] }}
                        </p>
                    </td>
                </tr>

                <tr>
                    <td style="background-color:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
                        This email was sent from your website contact form.<br>
                        Please do not reply to this email directly.
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>
