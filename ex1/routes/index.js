var express = require('express');
var router = express.Router();
var Alunos = require('../controllers/alunos')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/alunos/tpc', function(req, res) {
  Alunos.listarTpcs()
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/api/alunos', function(req, res) {
  if(req.query.curso)
  {
    Alunos.listarCurso(req.query.curso)
      .then(dados => res.status(200).jsonp(dados) )
      .catch(e => res.status(500).jsonp({error: e}))
  }
  if(req.query.groupBy=='curso')
  {
    Alunos.byCurso(req.params.id)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
  }
  else{
    Alunos.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
  }
});

router.get('/api/alunos/:id', function(req, res) {
  Alunos.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});




module.exports = router;
