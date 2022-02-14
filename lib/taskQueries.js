const { response } = require("express");
const db = require("./db");

const getProjectTasks = (projectId) => {
  return db
    .query(`SELECT * FROM tasks WHERE project_id = $1`, [projectId])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const addTask = (
  seq,
  name,
  start,
  end,
  type,
  progress,
  dependencies,
  barChildren,
  hideChildren,
  project,
  projectId,
  cat,
) => {
  console.log("db gets",  seq,
  name,
  start,
  end,
  type,
  progress,
  dependencies,
  barChildren,
  hideChildren,
  project,
  projectId,
  cat, )
  return db
    .query(
      `INSERT INTO tasks (seq, name, start, "end", type, progress, dependencies, barChildren, hideChildren, project, project_id, category)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`,
      [
        seq,
        name,
        start,
        end,
        type,
        progress,
        dependencies,
        barChildren,
        hideChildren,
        project,
        projectId,
        cat,
      ]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const updateTaskHider = (itemId, hide) => {
  return db
    .query(`UPDATE tasks SET hideChildren = $1 WHERE id= $2 RETURNING *;`, [
      hide,
      itemId,
    ])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const updateTask = (
  seq,
  name,
  type,
  start,
  end,
  progress,
  dependencies,
  barChildren,
  project,
  itemId
) => {
  console.log("update?",  seq,
  name,
  type,
  start,
  end,
  progress,
  dependencies,
  barChildren,
  project,
  itemId)
  return db
    .query(
      `UPDATE tasks SET name = $1, type = $2, start = $3, "end" = $4, progress = $5, dependencies = $6, barChildren = $7, project = $8, seq = $9 WHERE id= $10 RETURNING *;`,
      [
        name,
        type,
        start,
        end,
        progress,
        dependencies,
        barChildren,
        project,
        seq,
        itemId,
      ]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getTaskByName = (name, projectId) => {
  return db
    .query(`SELECT * FROM tasks WHERE name = $1 AND project_id = $2`, [
      name,
      projectId,
    ])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getMaxTaskEnd = (projectName, id) => {
  // console.log("db gets", projectName)

  return db
    .query(`SELECT MAX("end") as "ender" FROM tasks WHERE project = $1 AND project_id = $2 `, [
      projectName, id
    ])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const get2MaxTaskEnd = (projectName, id) => {
  // console.log("db gets", projectName)

  return db
    .query(
      `SELECT MAX("end") as "ender" FROM tasks WHERE project = $1 AND project_id = $2 AND "end" < (SELECT MAX("end") as "ender" FROM tasks WHERE project = $1 AND project_id = $2)`,
      [projectName, id]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getMinTaskStart = (projectName, id) => {

  return db
    .query(`SELECT MIN(start) as "starter" FROM tasks WHERE project = $1 AND project_id = $2`, [
      projectName, id
    ])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const get2MinTaskStart = (projectName, id) => {

  return db
    .query(
      `SELECT MIN(start) as "starter" FROM tasks WHERE project = $1 AND project_id = $2 AND start > (SELECT MIN(start) as "starter" FROM tasks WHERE project = $1 AND project_id = $2)`,
      [projectName, id]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getProjectTaskProject = (projId) => {
  return db
    .query(
      `SELECT DISTINCT name FROM tasks WHERE type = 'project' AND project_id =$1`,
      [projId]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getAvgProgress = (parent, projectId) => {

  // console.log("db gets", parent, projectId)
  return db
    .query(`SELECT name, progress FROM tasks WHERE project = $1 AND project_id = $2`, [
      parent,
      projectId,
    ])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getTaskTypes = () => {

  return db.query('SELECT DISTINCT name FROM taskTypes')
  .then((response) => {
      return response.rows;
  })
  .catch((error) => {
      console.log("unable to query db got error:", error);
  })
}

const getTaskNames = () => {

  return db.query('SELECT DISTINCT name FROM taskNames')
  .then((response) => {
      return response.rows;
  })
  .catch((error) => {
      console.log("unable to query db got error:", error);
  })
}

const updateParentOnDelete = (projId, project) => {
  console.log('db gets', projId, project)
  return db
    .query(`UPDATE tasks SET project = '' WHERE project_id= $1 AND project = $2 RETURNING *;`, [projId, project])
    .then((response) => {
      console.log(response.rows)
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getTaskDependenciesContaining = (projId, text) => {

  return db.query(`SELECT * FROM tasks WHERE $1=ANY(dependencies) AND project_id = $2;`, [text, projId])
  .then((response) => {
      return response.rows;
  })
  .catch((error) => {
      console.log("unable to query db got error:", error);
  })
}

const updateDependencyArray = (taskId, depArray) => {

  return db
    .query(`UPDATE tasks SET dependencies = $1 WHERE id = $2 RETURNING *;`, [depArray, taskId])
    .then((response) => {
      console.log(response.rows)
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const deleteTask = (taskId) => {

    return db.query(`DELETE FROM tasks WHERE id= $1 RETURNING *;`, [taskId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getProjectTaskByCategory = (category, projectId) => {
  return db
    .query(`SELECT * FROM tasks WHERE category = $1 AND project_id = $2`, [category, projectId])
    .then((response) => {
      console.log("db resp", response.rows)
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getMaxSeq = (id) => {
  // console.log("db gets", projectName)

  return db
    .query(`SELECT MAX(seq) as "maxSeq" FROM tasks WHERE project_id = $1 `, [ id ])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};
module.exports = {
  getProjectTasks,
  updateTaskHider,
  updateTask,
  getTaskByName,
  getMinTaskStart,
  get2MinTaskStart,
  getMaxTaskEnd,
  get2MaxTaskEnd,
  getProjectTaskProject,
  getAvgProgress,
  getTaskTypes,
  getTaskNames,
  updateParentOnDelete,
  getTaskDependenciesContaining,
  updateDependencyArray,
  deleteTask,
  addTask,
  getProjectTaskByCategory,
  getMaxSeq,
};
