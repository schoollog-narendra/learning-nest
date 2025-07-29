export const getEmailConfig = () => {
  console.log(process.env.EMAIL_USER,"-----EMAIL_USER");
  console.log(process.env.EMAIL_PASSWORD,"-----EMAIL_PASSWORD");
  return {    
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  defaults: {
    from: '"SchoolLog" <noreply@schoollog.com>',
  },
}
};


// Validate email configuration
export const validateEmailConfig = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️  Email credentials not found in environment variables!');
    console.warn('Please set EMAIL_USER and EMAIL_PASSWORD in your .env file');
    console.warn('Email functionality will be disabled until credentials are provided.');
    return false;
  }
  return true;
}; 