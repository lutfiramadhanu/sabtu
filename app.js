const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

// view engine hbs
app.set('view egine', 'hbs');

//setting parser data dari mysql ke app.js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'lutfi',
    password: '0000',
    database: 'top_up'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

app.get('/', (req, res) => {
    koneksi.query('use top_up', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'top_up',
            data: hasil
        });
    });
});

app.get('/top_up', (req, res) => {
    koneksi.query('SELECT*FROM top_up', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'top_up',
            data: hasil
        });
    });
});

app.post('/top_up', (req, res) =>{
    var masukan_player_id = req.body.inputmasukan_player_id ;
    var Nominal_top_up = req.body.inputNominal_top_up;
    var Pilih_Pembayaran = req.body.inputPilih_Pembayaran;
    var Alamat_email= req.body.inputAlamat_email;
    var no_telepon = req.body.inputno_telepon;
    var alamat_ip = req.body.inputalamat_ip;
    var pajak = req.body.inputpajak;
    koneksi.query('INSERT INTO top_up(masukan_player_id, Nominal_top_up, Pilih_Pembayaran, Alamat_email, no_telepon, alamat_ip, pajak)values(?,?,?,?,?,?,?)',
    [masukan_player_id, Nominal_top_up, Pilih_Pembayaran, Alamat_email, no_telepon, alamat_ip, pajak],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/top_up');
    }
    )
});

app.get('/hapus-masukan_player_id/:masukan_player_id',(req, res) => {
    var masukan_player_id = req.params.masukan_player_id;
    koneksi.query("DELETE FROM pelanggan WHERE masukan_player_id=?",
         [masukan_player_id], (err, hasil) => {
             if(err) throw err;
             res.redirect('/top_up');
         }
    )
});



app.listen(port, () => {
    console.log(`app berjalan pada port ${port}`);
});