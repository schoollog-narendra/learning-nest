
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use Gmail App Password
    },
  });

  async sendMail(userData:{name: string, email: string}) {
    const registrationDate = new Date().toLocaleDateString();
    const mailOptions = {
      to:"narendra011670@gmail.com",
      subject:"New User Registration - SchoolLog",
      html:`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User Registration - SchoolLog</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #ffffff;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #e3f2fd;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #1976d2;
                margin-bottom: 10px;
            }
            .subtitle {
                color: #666;
                font-size: 16px;
            }
            .content {
                margin-bottom: 30px;
            }
            .user-info {
                background-color: #f8f9fa;
                border-left: 4px solid #1976d2;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding: 8px 0;
                border-bottom: 1px solid #e9ecef;
            }
            .info-row:last-child {
                border-bottom: none;
            }
            .label {
                font-weight: bold;
                color: #495057;
            }
            .value {
                color: #6c757d;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e3f2fd;
                color: #666;
                font-size: 14px;
            }
            .highlight {
                background-color: #e3f2fd;
                color: #1976d2;
                padding: 2px 6px;
                border-radius: 3px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🏫 SchoolLog</div>
                <div class="subtitle">Educational Management System</div>
            </div>
            
            <div class="content">
                <h2 style="color: #1976d2; margin-bottom: 20px;">🎉 New User Registration</h2>
                
                <p>Hello Admin,</p>
                
                <p>A new user has successfully registered on the SchoolLog platform. Here are the details:</p>
                
                <div class="user-info">
                    <div class="info-row">
                        <span class="label">👤 User Name:</span>
                        <span class="value highlight">${userData.name}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">📧 Email Address:</span>
                        <span class="value highlight">${userData.email}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">📅 Registration Date:</span>
                        <span class="value">${registrationDate}</span>
                    </div>
                </div>
                
                <p>The user account has been created successfully and is now active in the system.</p>
                
                <p style="margin-top: 25px;">
                    <strong>Next Steps:</strong>
                </p>
                <ul style="color: #666; line-height: 1.8;">
                    <li>Review the user's profile information</li>
                    <li>Assign appropriate roles and permissions if needed</li>
                    <li>Welcome the user to the platform</li>
                </ul>
            </div>
            
            <div class="footer">
                <p>This is an automated notification from SchoolLog</p>
                <p>© 2024 SchoolLog. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `, // Optional
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Mail sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending mail:', error);
      throw error;
    }
  }
}
 