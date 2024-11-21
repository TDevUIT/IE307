/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  // Upload a file (image or video)
  uploadFile(file: Express.Multer.File, resourceType: 'image' | 'video' = 'image'): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  // Upload a video specifically
  uploadVideo(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return this.uploadFile(file, 'video');
  }

  // Delete a file (image or video)
  deleteFile(publicId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, { resource_type: 'video' }, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  }
}
