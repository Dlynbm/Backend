app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.get('/', (req, res) => {
    res.render('index', {
    list: 'DLyn'
});}