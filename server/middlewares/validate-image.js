const { ContentSizeError, BadRequestError } = require('../utils/errors');

const validateImage = (req, res, next) => {
  const images = req.body.images;

  if (!images || images.length === 0) {
    throw BadRequestError('At least one image is required.');
  }

  const maxFileSize = 5 * 1024 * 1024;
  const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];

  for (const base64Image of images) {
    const matches = base64Image.match(/^([A-Za-z0-9+/]+={0,2})$/);
    if (!matches) {
      throw BadRequestError('Invalid image format.');
    }

    const buffer = Buffer.from(base64Image, 'base64');

    let mimeType;
    if (buffer.slice(0, 4).toString('hex') === 'ffd8ffe0') {
      mimeType = 'image/jpeg';
    } else if (buffer.slice(0, 4).toString('hex') === '89504e47') {
      mimeType = 'image/png';
    } else {
      throw BadRequestError('Only PNG, JPG, and JPEG images are allowed.');
    }

    if (!allowedFormats.includes(mimeType)) {
      throw BadRequestError('Only PNG, JPG, and JPEG images are allowed.');
    }

    if (buffer.length > maxFileSize) {
      throw ContentSizeError(
        `Image size exceeds the maximum (${maxFileSize / 1024} KB) allowed limit.`
      );
    }
  }

  next();
};

module.exports = { validateImage };
