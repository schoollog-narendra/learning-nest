# File Upload API Documentation

This API provides file upload functionality for authenticated users with the following features:

## Features
- ✅ Single image upload (up to 5MB)
- ✅ Multiple image formats supported (jpg, jpeg, png, gif, bmp, webp)
- ✅ Authentication required (JWT token)
- ✅ One image per user (updates existing image)
- ✅ Automatic file cleanup when updating

## Endpoints

### 1. Upload Single Image
**POST** `/upload/single`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `file`: Image file (max 5MB)

**Response:**
```json
{
  "message": "File uploaded successfully",
  "data": {
    "id": "upload_id",
    "filename": "generated_filename.jpg",
    "originalName": "original_filename.jpg",
    "mimetype": "image/jpeg",
    "size": 1024000,
    "uploadedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Get User's Upload
**GET** `/upload/my-upload`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Upload found",
  "data": {
    "id": "upload_id",
    "filename": "generated_filename.jpg",
    "originalName": "original_filename.jpg",
    "mimetype": "image/jpeg",
    "size": 1024000,
    "uploadedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Get Uploaded File
**GET** `/upload/my-upload/file`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:** Returns the actual image file

### 4. Delete User's Upload
**DELETE** `/upload/my-upload`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Upload deleted successfully"
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

### 400 Bad Request
```json
{
  "message": "No file uploaded"
}
```

### 413 Payload Too Large
```json
{
  "message": "File too large"
}
```

### 415 Unsupported Media Type
```json
{
  "message": "Only image files are allowed!"
}
```

## Usage Examples

### Using cURL
```bash
# Upload an image
curl -X POST http://localhost:3000/upload/single \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@image.jpg"

# Get user's upload info
curl -X GET http://localhost:3000/upload/my-upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get the actual image file
curl -X GET http://localhost:3000/upload/my-upload/file \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  --output downloaded_image.jpg

# Delete user's upload
curl -X DELETE http://localhost:3000/upload/my-upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using JavaScript/Fetch
```javascript
// Upload image
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/upload/single', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + jwtToken
  },
  body: formData
});

const result = await response.json();
console.log(result);
```

## File Storage
- Files are stored in the `./uploads` directory
- Original filenames are preserved in the database
- Old files are automatically deleted when updating

## Security Features
- JWT authentication required for all endpoints
- File type validation (images only)
- File size limit (5MB)
- Unique filenames to prevent conflicts
- Automatic cleanup of old files 