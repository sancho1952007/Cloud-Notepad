const compression = require('compression');
const favicon = require('serve-favicon');
const express = require('express');
const path = require('path');
const { Deta } = require('deta');
const crypto = require('crypto');
require('dotenv').config();

let app = express();
app.use(compression());
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'icon.png')))

const deta = Deta(process.env.DETA_BASE_KEY);
const Notes = deta.Base('Notes');

app.get('/', async (req, res) => {
    let ip = req.ip;
    ip = crypto.createHash('md5').update(ip).digest("hex");
    let GetNotes = await Notes.get(ip);
    if (GetNotes == null) {
        await Notes.put({
            key: ip,
            text: ''
        }, '', {
            expiresIn: 1.578e+8
        });

        res.render('notepad', {
            text: '',
            previouslyLoggedIn: false
        });
    }
    else {
        res.render('notepad', {
            text: GetNotes.text,
            previouslyLoggedIn: true
        });

        await Notes.put({
            key: ip,
            text: GetNotes.text
        }, '', {
            expiresIn: 1.578e+8
        });
    }
});

app.post('/save', async (req, res) => {
    let ip = req.ip;
    ip = crypto.createHash('md5').update(ip).digest("hex");
    let text = req.body.text;
    if (text != null) {
        await Notes.put({
            key: ip,
            text: text
        }, '', {
            expiresIn: 1.578e+8
        });
        res.send({ success: true });
    }
});

app.post('/delete', async (req, res) => {
    let ip = req.ip;
    ip = crypto.createHash('md5').update(ip).digest("hex");
    await Notes.delete(ip);
    res.send({ success: true });
});

// Delete The Blank Notes When Needed
// (async () => {
//     let docs = await Notes.fetch();
//     docs.items.forEach(async element => {
//         if (element.text.replaceAll(' ', '') == '') {
//             await Notes.delete(element.key);
//         }
//     });
//     console.log('Completed Deleting Blank Notes!');
// })();

app.listen(8000);