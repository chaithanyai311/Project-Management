const express = require('express');
const app = express();
const cors = require('cors');

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

//load middleware
app.use(bodyParser.json());
app.use(cors());

let teammemberList = [];
let teamList = [];
let projectList = [];
let taskList = [];

const { TeammemberList } = require('./db/models/teammember.model');
const { TeamList } = require('./db/models/team.model');
const { ProjectList } = require('./db/models/project.model');
const { TaskList } = require('./db/models/task.model');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
  });


 /*************************  Team   *********************************************************** */

app.get('/teamList', (req, res) => {

    TeamList.find({}).then((teamList) => {
        res.send(teamList);
    });
})

app.post('/teamList', (req, res) => {
    let teamName = req.body.teamName;
    let totalMember = req.body.totalMember;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    let newTeamList = new TeamList({
        teamName,
        totalMember,
        startDate,
        endDate
    });
    newTeamList.save().then((teamlistDoc) => {
        res.send(teamlistDoc);
    })
});
 
app.patch('/teamList/:id', (req, res) => {
    const { teamName, totalMember, startDate, endDate } = req.body;
  
    TeamList.findByIdAndUpdate(req.params.id, {
      $set: {
        teamName: teamName,
        totalMember: totalMember,
        startDate: startDate,
        endDate: endDate
      }
    })
      .then(() => {
        res.send({ message: 'Updated successfully' });
      })
      .catch((error) => {
        console.log('Error updating team:', error);
        res.status(500).send('Error updating team');
      });
  });


  app.delete('/teamList/:id', (req, res) => {
    TeamList.findOneAndRemove({_id: req.params.id}).then((removedListDoc) => {
       res.send(removedListDoc);
    })
});


/*************************  Team members   *********************************************************** */

app.get('/teammemberList', (req, res) => {

    TeammemberList.find({}).then((teammemberList) => {
        res.send(teammemberList);
    });
})

app.post('/teammemberList', (req, res) => {
    let name = req.body.name;
    let designation = req.body.designation;

    let newTeammemberList = new TeammemberList({
        name,
        designation
    });
    newTeammemberList.save().then((teammemberlistDoc) => {
        res.send(teammemberlistDoc);
    })
});
 
app.patch('/teammemberList/:id', (req, res) => {
    const { name, designation } = req.body;
  
    TeammemberList.findByIdAndUpdate(req.params.id, {
      $set: {
        name: name,
        designation: designation
      }
    })
      .then(() => {
        res.send({ message: 'Updated successfully' });
      })
      .catch((error) => {
        console.log('Error updating team member:', error);
        res.status(500).send('Error updating team member');
      });
  });


  app.delete('/teammemberList/:id', (req, res) => {
    TeammemberList.findOneAndRemove({_id: req.params.id}).then((removedListDoc) => {
       res.send(removedListDoc);
    })
});


/*************************  project    ********************************************************* */

app.get('/teamList', (req, res) => {
  TeamList.find({}, 'teamName', (err, teamList) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.json(teamList);
    }
  });
});

app.get('/projectList', (req, res) => {
  ProjectList.find({}).then((projectList) => {
      res.send(projectList);
  });
})

app.post('/projectList', (req, res) => {
  let projectName = req.body.projectName;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let teamName = req.body.teamName;

  let newProjectList = new ProjectList({
      projectName,
      startDate,
      endDate,
      teamName
  });
  newProjectList.save().then((projectlistDoc) => {
      res.send(projectlistDoc);
  })
});

app.patch('/projectList/:id', (req, res) => {
  const { projectName, startDate, endDate, teamName } = req.body;

  ProjectList.findByIdAndUpdate(req.params.id, {
    $set: {
      projectName: projectName,
      startDate: startDate,
      endDate: endDate,
      teamName: teamName
    }
  })
    .then(() => {
      res.send({ message: 'Updated successfully' });
    })
    .catch((error) => {
      console.log('Error updating project:', error);
      res.status(500).send('Error updating project');
    });
});


app.delete('/projectList/:id', (req, res) => {
  ProjectList.findOneAndRemove({_id: req.params.id}).then((removedListDoc) => {
     res.send(removedListDoc);
  })
});




/*************************  task    ********************************************************* */

app.get('/projectList', (req, res) => {
  projectList.find({}, 'projectName', (err, projectList) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.json(projectList);
    }
  });
});

app.get('/taskList', (req, res) => {
  TaskList.find({}).then((taskList) => {
      res.send(taskList);
  });
})

app.post('/taskList', (req, res) => {
  let taskName = req.body.taskName;
  let projectName = req.body.projectName;
  let teamName = req.body.teamName;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  let newTaskList = new TaskList({
      taskName,
      projectName,
      teamName,
      startDate,
      endDate
  });
  newTaskList.save().then((tasklistDoc) => {
      res.send(tasklistDoc);
  })
});

app.patch('/taskList/:id', (req, res) => {
  const { taskName, projectName, teamName, startDate, endDate } = req.body;

  TaskList.findByIdAndUpdate(req.params.id, {
    $set: {
      taskName: taskName,
      projectName: projectName,
      teamName: teamName,
      startDate: startDate,
      endDate: endDate
    }
  })
    .then(() => {
      res.send({ message: 'Updated successfully' });
    })
    .catch((error) => {
      console.log('Error updating task:', error);
      res.status(500).send('Error updating task');
    });
});


app.delete('/taskList/:id', (req, res) => {
  TaskList.findOneAndRemove({_id: req.params.id}).then((removedListDoc) => {
     res.send(removedListDoc);
  })
});
















app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})