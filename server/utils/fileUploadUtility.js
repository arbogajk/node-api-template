const multer = require('multer');
const config = require('../../configs/config');
const _ = require('lodash');
const mimeTypes = ['image/jpeg', 'image/png','application/pdf'];
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file ,cb){
        cb(null, config.tmpMediaDir);
    },
    filename: function(req,file,cb){
        req.filename = req.id + '_' + file.originalname.replace(' ', '_');
        cb(null, req.id + '_' + file.originalname.replace(' ', '_')) //file.originalname
    }
});

const fileFilter = (req, file, cb) => {
    if(mimeTypes.filter(f => file.mimetype === f)) {
        cb(null,true);//store
    }
    else {
        //reject a file
        cb(null,false);
    }
}

const upload = multer(
{
    storage: storage, 
    limits:{
        fileSize: 1024 *1024*5
    },
    fileFilter: fileFilter
});

const deleteFileFromTemp = function(filename){
    try {
        fs.unlinkSync(config.tmpMediaDir +'/'+ filename);
        console.log('successfully deleted ' + config.tmpMediaDir + '/' + filename);
      } catch (err) {
       console.log("file deleted: " + err)
      }
}



module.exports = {upload, deleteFileFromTemp};
