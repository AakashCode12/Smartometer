//we declared all the imports
const express = require("express");
const app = express();

const fs = require("fs");
const multer = require('multer');

const { TesseractWorker } = require('tesseract.js')
const worker = new TesseractWorker();

//storage part
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./uploads");
    },
    filename:(req,file,cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer ({storage: storage}).single("avatar");
app.set("view engine","ejs");

//routes
app.get('/',(req,res) =>{ 
    res.render('index');
});

app.post('/upload', (req,res) =>{
    upload(req,res, err =>{
      fs.readFile(`./uploads/${req.file.originalname}` ,(err,data) =>{
          if(err) return console.log('error on your side',err);

          worker
          .recognize(data,"eng",{tessjs_create_pdf: '1'})
          .progress(progress => {
            console.log(progress);
          })
          .then(result =>{
                res.send(result.text);
          })
          .finally(() => worker.terminate());
      });
    });
});


//startup server

const PORT =5000 || process.env.PORT;
app.listen(PORT ,() => console.log("hey i am running on port ${PORT}"));