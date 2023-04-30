import uploadImage from "@/modules/daybook/helpers/uploadImage"

import 'setimmediate';
import cloudinary from 'cloudinary';
import axios from "axios"

cloudinary.config({
  cloud_name: 'dlotddrpq',
  api_key: '847269419532759',
  api_secret: 'Wy3cAdVAiMaDIZ5hGEuGG8IDnEY',
})

describe('Pruebas en uploadImage', () => {

  test('debe de cargar un archivo y retornar el url', async() => {
    const { data } = await axios.get('https://res.cloudinary.com/dlotddrpq/image/upload/v1675658784/cld-sample-5.jpg', {
      responseType: 'arraybuffer'
    });

    const file = new File([ data ], 'foto.jpg');
    const url = await uploadImage(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    cloudinary.v2.api.delete_resources( imageId );
  })
})