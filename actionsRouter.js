const express = require('express');

const Actions = require('./data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    Actions.get().then(action => {
        console.log(action);
        res.status(201).json(action);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Unable to retrieve actions" });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Actions.get(id).then(action => {
        res.status(201).json(action);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Unable to retrieve actions" })
    });
});

router.post("/", (req, res) => {
    console.log(req.body);
    Actions.insert(req.body).then((action) => {
        if (action) {
            res.status(201).json(action);
        } else {
            res.status(400).json({ message: "Error finding action" });
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error posting action" });
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;

    Actions.update(req.params.id, changes).then(update => {
        res.status(200).json(update)
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: "Error updating action" })
    })
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id).then(deleted => {
        res.sendStatus(200);
    })
    .catch(error => {
        res.status(500).json({ error: "Error deleting action" })
    })
})


module.exports = router;