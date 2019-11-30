/******************
 * This project is recreated from the following source:
 * 
 * Title: Node Express Image Upload And Resize Tutorial Example
 * Author: Krunal Lathiya
 * Availability: https://appdividend.com/2019/02/14/
 *  node-express-image-upload-and-resize-tutorial-example/
 */

const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();
const upload = require('./uploadMiddleware');
const Resize = require('./Resize');

router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/post', upload.single('image'), async function (req, res) {
  // await console.log('post');
  const imagePath = path.join(__dirname, '/public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  
  return res.status(200).json({ title: req.body.title, name: filename });
});

module.exports = router;