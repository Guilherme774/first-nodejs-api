const router = require('express').Router();

const Person = require('../models/person');


// Adicionar pessoa
router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body;

    if(!name || !salary) {
        res.status(412).json({error: 'Todos os dados são obrigatórios'});
        return;
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person);
        
        res.status(201).json({message: 'Pessoa inserida com sucesso!'});
    } 
    catch (error) {
        res.status(500).json({error: error});
    }
});


// Obter pessoas
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        
        res.status(200).json(people);
    } 
    catch (error) {
        res.status(500).json({error: error});
    }
})


// Obter pessoa pelo ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const person = await Person.findOne({_id: id});

        if(!person) {
            res.status(404).json({message: 'Pessoa não encontrada!'});
            return;
        }

        res.status(200).json(person);
    }
    catch (error) {
        res.status(500).json({error: error});    
    }
})

// Editar pessoa
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {name, salary, approved} = req.body;

    const person = {
        name,
        salary,
        approved
    }
    
    try {
        const personToUpdate = await Person.updateOne({_id: id}, person);

        if(personToUpdate.matchedCount === 0) {
            res.status(404).json({message: 'Pessoa não encontrada'});
            return;
        }

        res.status(200).json({message: 'Pessoa alterada com sucesso!'});
    }
    catch (error) {
        res.status(500).json({error: error})    
    }
})

// Deletar pessoa
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    const personToDelete = await Person.findOne({_id: id});

    if(!personToDelete) {
        res.status(404).json({message: "Pessoa não encontrada!"});
        return;
    }

    try {
        await Person.deleteOne(personToDelete);

        res.status(200).json({message: "Pessoa deletada com sucesso!"});
    }
    catch (error) {
        res.status(500).json({error: error});
    }
})

module.exports = router;