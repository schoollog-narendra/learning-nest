# Upload Module Setup Instructions

## Prerequisites

Make sure you have the following dependencies installed:


## Setup Steps

1. **Create uploads directory:**
   ```bash
   mkdir uploads
   ```

2. **Start the application:**
   ```bash
   npm run start:dev
   ```

3. **Test the upload functionality:**
   - Open `test-upload.html` in your browser
   - Get a JWT token by logging in through your auth endpoints
   - Use the test page to upload images

## API Endpoints Available

- `POST /upload/single` - Upload a single image
- `GET /upload/my-upload` - Get user's upload info
- `GET /upload/my-upload/file` - Get the actual image file
- `DELETE /upload/my-upload` - Delete user's upload

## Features Implemented

✅ **Single image upload** (up to 5MB)
✅ **Multiple image formats** (jpg, jpeg, png, gif, bmp, webp)
✅ **Authentication required** (JWT token)
✅ **One image per user** (updates existing image)
✅ **Automatic file cleanup** when updating

## File Structure

```
src/upload/
├── upload.module.ts      # Main module configuration
├── upload.controller.ts  # API endpoints
├── upload.service.ts     # Business logic
└── schemas/
    └── upload.schema.ts  # MongoDB schema
```

## Security Features

- JWT authentication required for all endpoints
- File type validation (images only)
- File size limit (5MB)
- Unique filenames to prevent conflicts
- Automatic cleanup of old files

## Testing

Use the provided `test-upload.html` file to test all functionality:

1. Enter your JWT token
2. Select an image file
3. Upload the image
4. View upload information
5. Download the image
6. Delete the upload

## Error Handling

The API includes comprehensive error handling for:
- Unauthorized access
- Invalid file types
- File size limits
- Missing files
- Database errors 