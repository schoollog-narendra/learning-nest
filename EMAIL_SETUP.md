# Email Setup Guide for SchoolLog

## Overview
This application now includes email notification functionality that sends a beautiful HTML email to `schoollog.narendra@gmail.com` whenever a new user is created.

## Features
- ✅ Automatic email notifications on user creation
- ✅ Beautiful HTML email template with user details
- ✅ Professional SchoolLog branding
- ✅ Responsive design for all devices
- ✅ Error handling (user creation won't fail if email fails)

## Setup Instructions

### 1. Install Dependencies
First, install the required email packages:
```bash
npm install @nestjs-modules/mailer nodemailer
```

### 2. Configure Email Settings
You need to set up Gmail SMTP for sending emails. Follow these steps:

#### Option A: Using Gmail App Password (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Update the email configuration in `src/config/email.config.ts`:
   ```typescript
   export const emailConfig = {
     host: 'smtp.gmail.com',
     secure: true,
     auth: {
       user: 'your-gmail@gmail.com', // Replace with your Gmail
       pass: 'your-app-password',    // Replace with the generated app password
     },
     defaults: {
       from: '"SchoolLog" <noreply@schoollog.com>',
     },
   };
   ```

#### Option B: Using Environment Variables (Recommended)
Create a `.env` file in the root directory:
```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password

# Database Configuration
MONGODB_URI=mongodb+srv://narendra1:narendra1@cluster0.fcwxv.mongodb.net/schoollog
```

**Important Notes:**
- Replace `your-gmail@gmail.com` with your actual Gmail address
- Replace `your-app-password` with the App Password generated from Google
- Make sure to enable 2-Factor Authentication on your Gmail account first
- The App Password is different from your regular Gmail password

### 3. Test the Email Functionality
1. Start the application: `npm run start:dev`
2. Create a new user via the API endpoint
3. Check the email at `schoollog.narendra@gmail.com`

## Email Template Features
The email template includes:
- 🏫 SchoolLog branding and logo
- 👤 User name and email address
- 📅 Registration date and time
- 📋 Next steps for admin
- 🎨 Professional styling with responsive design
- 📱 Mobile-friendly layout

## File Structure
```
src/
├── email/
│   ├── email.module.ts          # Email module configuration
│   └── email.service.ts         # Email service with inline HTML template
├── config/
│   └── email.config.ts          # Email configuration
└── users/
    └── users.service.ts         # Updated to send emails on user creation
```

## Troubleshooting

### Common Issues:
1. **Authentication Error**: Make sure you're using an App Password, not your regular Gmail password
2. **Missing Credentials**: Ensure EMAIL_USER and EMAIL_PASSWORD are set in your .env file
3. **Connection Error**: Check your internet connection and firewall settings
4. **2FA Not Enabled**: You must enable 2-Factor Authentication before generating an App Password

### Error Handling:
The application includes error handling for email failures:
- User creation will succeed even if email sending fails
- Email errors are logged to the console
- No impact on the main application functionality

## Security Notes
- Never commit email credentials to version control
- Use environment variables for sensitive data
- Consider using a dedicated email service for production (SendGrid, AWS SES, etc.) 