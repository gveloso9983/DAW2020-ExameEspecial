var mongoose = require('mongoose');

var alunoSchema = new mongoose.Schema({
    idAluno: String,
    nome: String,
    curso: String,
    tpc: [{
        tp: String,
        nota: Number,
    }],
    projeto: Number,
    exames: {
        normal: Number
    }
})

module.exports = mongoose.model('alunos', alunoSchema);