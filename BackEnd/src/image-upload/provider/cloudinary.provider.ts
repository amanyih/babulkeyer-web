import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dimegmbin',
      api_key: '195226726347719',
      api_secret: 'rcgzP_QlAUFRXZQ4kFJaHP7PqoY',
    });
  },
};
