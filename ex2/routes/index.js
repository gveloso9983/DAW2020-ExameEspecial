var express = require('express');
var router = express.Router();
var axios = require('axios')

var apikey = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ0YmQwMTY0NDdkMDAxOWQzODAyZSIsImlhdCI6MTYyNjE2NDE3NiwiZXhwIjoxNjI4NzU2MTc2fQ.EAccXEkb8PnuNSlZvCeAxk_5pltOFlALIVCp5gsmWqNWtHvSgDxl7lP9yE5sHljRoMfxyW1yYZnaAmmR8s5lhZQqMH5Fvh37SMCfJke2nnvYgMR7gofdlqmJrhWjLKDzvBQH7qF5ma11xcmegxoVJaYTo8EAvO_p6F2PWIPNtkNLBP3Sk_6PDUk5bBH_SQGRJVfe1yPAxfi2cKUVjgCdceEjyAd6WxyXz08SQI4W-0DmYDtr31gUx7AcMA16U-iwFrGiz3iyCouY8bcAHLO974cereZpfrPNGFZ8To54FQ8ajXTjQ-3DLM9qOAAiguPuWr0yQ3LQk4f9YUb9IbpadQ'
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',function(req, res){
  axios.get('http://clav-api.dglab.gov.pt/v2/legislacao?apikey='+apikey)
          .then(dados=>{            
              console.log(dados.data)
              res.render('index', { diplomas:dados.data});
            })
            .catch(e=>{
                console.log("Erro: nao consegui obter os dados! " + e)
            })
})

router.get('/diplomas/:id',function(req, res){
  axios.get('https://clav-api.dglab.gov.pt/v2/legislacao/'+ req.params.id+'?apikey='+apikey)
          .then(dados=>{   
              axios.get('https://clav-api.dglab.gov.pt/v2/legislacao/'+ req.params.id+'/processos?apikey='+apikey)
              .then(regulados =>{
                res.render('diploma', { diploma:dados.data,regulados:regulados.data});
              })        
            })
            .catch(e=>{
                console.log("Erro: nao consegui obter os dados! " + e)
            })
})


module.exports = router;
