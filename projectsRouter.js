const express = require('express');

const Projects = require('./data/helpers/projectModel');
const Actions = require('./data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get().then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error getting projects" })
    })
});

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then((resource) => {
      console.log(resource);
      res.status(201).json(resource);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to insert" });
    });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id).then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: "Unable to find by id" })
        }
    })
})

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(action => {
            if(action) {
                res.status(200).json(action)
            } else {
                res.status(400).json({ message: "Error getting project actions" })
            }
        })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Project has been removed" })
            } else {
                res.status(404).json({ message: "Project could not be found" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Unable to delete project" })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    Projects.update(id, req.body)
        .then(user => {
            if (user) {
                res.status(201).json({...req.body, id: id })
            } else {
                res.status(404).json({ message: "Error finding project" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error updating project" })
        })
})

router.post("/:id/actions", (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      console.log(action);
      res.status(201).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to get actions" });
    });
});



module.exports = router;