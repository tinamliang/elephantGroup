let config = require('./config');
const functions = require('firebase-functions');
const admin = require('firebase-admin')

// const {initializeApp} = require('firebase/app')
// initializeApp(config);

admin.initializeApp();
const db = admin.firestore();

const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors())

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


app.get('/textbooks/:course', (req, res) => {


    db.collection('textbooks').where('course', '==', req.params.course).orderBy('price').get()
    .then(data => {
        
        let textbooks = []
    
        data.forEach(textbook => {
            textbooks.push({
                id: textbook.id, 
                contact: textbook.data().contact, 
                price: textbook.data().price, 
                author: textbook.data().author, 
                title: textbook.data().title, 
                image: textbook.data().image, 
                course: textbook.data().course
            })
        })
     
        return res.json(textbooks)

    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })

})


app.delete('/sold/:id', (req, res) => {
    db.collection("textbooks").doc(req.params.id).delete()
    .then(() => {
        return res.json({ message: 'Listing successfully deleted'})
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({error: err.code})
    });
})


app.post('/list', (req, res) => {

    let contact= req.body.contact;
    let author = req.body.author;
    let course = req.body.course;
    let price = req.body.price;
    let title = req.body.title;
    let image = req.body.image
 
    db.collection("textbooks").add({
        image: image, 
        contact: contact, 
        title: title, 
        price: price, 
        author: author, 
        course: course                
    })
    .then((data)=> {

        return res.json({ id: data.id})
    })
    .catch((err)=> {
        console.error(err)
        return res.status(500).json({ error: err.code });
    })
})

app.post('/image', (req, res) => {


    // let id = req.params.id
    const Busboy = require('busboy');
    const path = require('path')
    const os = require('os')
    const fs = require('fs');

    const busboy =  Busboy({ headers: req.headers })
    let imageFileName;
    let imageToBeUploaded= {}

    busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
    
        encoding = filename.encoding
        mimeType= filename.mimeType
        filename = filename.filename
        // make sure user is not uploading text files, gifs...
        if (mimeType !== 'image/jpeg' && mimeType !== 'image/png'){
            return res.status(400).json({
                error: "Wrong file type submitted"
            })
        }
        // image.png :need to get the png or jpeg in some case
        const imageExtension = filename.split('.')[filename.split('.').length -1]
        // ex: 3435642145.png
        imageFileName = `${Math.round(Math.random() * 10000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);

        imageToBeUploaded = { filepath, mimeType }

        file.pipe(fs.createWriteStream(filepath))

    })

    busboy.on('finish', ()=> {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false, 
            metadata: {
                contentType: imageToBeUploaded.mimetype
            }
        })  
        .then(()=> {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
            console.log(imageUrl)
            return db.doc(`/textbooks/SJgWLXWH0jqJm9sEuhFh`).update({image: imageUrl})
        })
        .then(()=> {
            return res.json({ message: 'Listing added successfully'})
        })
        .catch((err)=> {
            console.error(err)
            return res.status(500).json({ error: err.code });
        })
    })
    busboy.end(req.rawBody)


})



exports.api = functions.https.onRequest(app)




