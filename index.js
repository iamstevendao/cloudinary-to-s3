import rp from 'request-promise';
import { upload } from './src/upload';

rp({
  uri: 'https://www.bluecross.org.uk/sites/default/files/assets/images/118809lpr.jpg',
  encoding: null,
})
  .then(async (response) => {
    try {
      const res = await upload({
        file: response,
        fileName: '118809lpr.jpg',
      });
      console.log(res);
    } catch (err) {
      console.log('err: ', err);
    }
  })
  .catch(error => {
    console.log('error: ', error)
  });
