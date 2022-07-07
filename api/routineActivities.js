const express = require('express');
const routineActivitiesRouter = express.Router();

const {
    getRoutineActivityById,
    destroyRoutineActivity,
    updateRoutineActivity,
    getRoutineById
} = require('../db');


// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch("/:routineActivityId/",  async (req, res, next) => {
    const { count, duration } = req.body;
    const id = req.params.routineActivityId;
    try {
      const oldRoutine = await getRoutineActivityById(id);
      const newRoutine = await getRoutineById(oldRoutine.routineId)
      if(req.user.id != newRoutine.creatorId) {
        res.status(500).send(err)
      } else {
      const newRoutineActivity = await updateRoutineActivity({ id, count, duration });
      res.send(newRoutineActivity);
      }

    } catch (error) {
      next(error);
    }
});


// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete("/:routineActivityId/",  async (req, res, next) => {
  const id = req.params.routineActivityId;
  try {
    const oldRoutine = await getRoutineActivityById(id);
    const newRoutine = await getRoutineById(oldRoutine.routineId)
    if(req.user.id != newRoutine.creatorId) {
      res.status(500).send(err)
    }
    const newRoutineActivity = await destroyRoutineActivity(id);
    res.send(newRoutineActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = routineActivitiesRouter;
