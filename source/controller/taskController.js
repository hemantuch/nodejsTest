import authToken from "../middleware/auth.js";
import taskModel from "../model/taskModel.js";

const login = async (req, res) => {
  const data = req.body;
  try {
    const response = await taskModel.userLogin(data);
    const token = authToken.generateToken({
      username: response.username,
    });
    res.json({
      result: true,
      message: "User login successfully",
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: "Error deleting task",
    });
  }
};

const taskCreation = async (req, res) => {
  const data = req.body;
  try {
    const response = await taskModel.taskCreation(data);
    res.json({
      result: true,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: error.message,
    });
  }
};

const taskList = async (req, res) => {
  try {
    const { page, limit, sortBy, order, title } = req.query;
    if (isNaN(page) || page <= 0) {
      return res.status(400).json({
        result: false,
        message: "Invalid page number",
      });
    }
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({
        result: false,
        message: "Invalid limit number",
      });
    }

    const offset = (page - 1) * limit;
    const response = await taskModel.allTaskList(
      page,
      limit,
      offset,
      sortBy,
      order,
      title
    );
    res.json({
      result: true,
      message: "Task list found successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: "Internal server error",
    });
  }
};

const taskModification = async (req, res) => {
  const data = req.body;
  try {
    const response = await taskModel.taskModify(data);
    res.json({
      result: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: error.message,
    });
  }
};

const taskDeletion = async (req, res) => {
  try {
    const { id } = req.params;
   const response = await taskModel.taskDelete(id);
    res.json({
      result: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      result: false,
      message: "Error deleting task",
    });
  }
};

const taskController = {
  taskCreation,
  taskList,
  taskModification,
  taskDeletion,
  login,
};
export default taskController;
