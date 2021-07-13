var Aluno = require('../models/alunos')

module.exports.listar = () => {
    return Aluno
        .find({},{idAluno:1,nome:1,curso:1})
        .sort({nome:1})
        .exec()
}

module.exports.consultar = (id)=>{
    return Aluno
        .find({idAluno:id})
        .exec()
}

module.exports.listarCurso = (curso)=>{
    return Aluno
        .find({curso:{$regex:curso}})
        .sort({nome:1})
        .exec()
}

module.exports.listarTpcs = ()=>{
    return Aluno 
    .aggregate(
        [
            [
                {
                  $group: {
                    idAluno:  "$idAluno" ,
                    conteudo: {
                        $addToSet: "$tpc"
                    },
                    totalTpcs: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        idAluno: 1,
                        
                        totalTpcs: 1,
                    }
                }
            ] 
        ]
    );
} 

module.exports.byCurso=()=>{
    return Aluno
        .aggregate([
            { $unwind: "$curso" },
            { $group: {
                idAluno: "$curso",
                alunos: { $push: { alunos: "$nome" } }
            } }
        ])
    .sort({ idAluno: 1 })
    .exec();
};