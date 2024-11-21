import express from "express";
const router = express.Router();
import taskController from "../controller/taskController.js";
import authToken from "../middleware/auth.js"; 
import {loginValidation, validateTaskCreation,  validateTaskModify } from "../util/validate.js";

const validate = (validationFn) => (req, res, next) => {
    const { error } = validationFn(req.body);  // Use req.query for query parameters or req.params for URL params if needed
    if (error) {
      return res.status(400).json({ result:false,error: error.details[0].message });
    }
    next();
  };

// Login Route

/**
 * @openapi
 * '/api/login':
 *  post:
 *     tags:
 *     - Task Controller
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: hemant
 *              password:
 *                type: string
 *                default: 1234
 *     responses:
 *      200:
 *        description: Successful login
 *        content:
 *         application/json:
 *          schema:
 *            type: object
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */


router.post('/login',validate(loginValidation), taskController.login);

/**
 * @openapi
 * '/api/task-creation':
 *  post:
 *     tags:
 *     - Task Controller
 *     summary: Create a task
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - dueDate
 *            properties:
 *              title:
 *                type: string
 *                default: test 
 *              description:
 *                type: string
 *                default: test description
 *              dueDate:
 *                type: string
 *                default: 2024-11-21
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post('/task-creation',authToken.authenticateToken,validate(validateTaskCreation), taskController.taskCreation);

/** GET Methods */
/**
 * @openapi
 * '/api/task-list':
 *  get:
 *     tags:
 *     - Task Controller
 *     summary: Get a task
 *     parameters:
 *      - name: page
 *        in: query
 *        description: Number of page
 *        required: true
 *        schema:
 *          type: string
 *      - name: limit
 *        in: query
 *        description: Number of limit
 *        required: true
 *        schema:
 *          type: string
 *      - name: sortBy
 *        in: query
 *        example: "dueDate"
 *        description: Sort by field
 *        required: false
 *        schema:
 *          type: string
 *      - name: order
 *        in: query
 *        example: "ASC" 
 *        description: Order by field
 *        required: false
 *        schema:
 *          type: string
 *      - name: title
 *        in: query
 *        description: Task title
 *        required: false
 *        schema:
 *          type: string
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get('/task-list',authToken.authenticateToken, taskController.taskList);

/** PUT Methods */
    /**
     * @openapi
     * '/api/task-modify':
     *  put:
     *     tags:
     *     - Task Controller
     *     summary: Modify a task
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - id
     *              - title
     *              - description
     *              - dueDate
     *            properties:
     *              id:
     *                type: integer
     *                default: ''
     *              title:
     *                type: string
     *                default: ''
     *              description:
     *                type: string
     *                default: ''
     *              dueDate:
     *                type: string
     *                default: ''
     *                example: "2024-11-21"
     *     security:
     *      - bearerAuth: []
     *     responses:
     *      200:
     *        description: Modified
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.put('/task-modify',authToken.authenticateToken, validate(validateTaskModify), taskController.taskModification);
/* DELETE Methods /
    /**
     * @openapi
     * '/api/task-delete/{id}':
     *  delete:
     *     tags:
     *     - Task Controller
     *     summary: Delete task by Id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique Id of the task
     *        required: true
     *     security:
     *      - bearerAuth: []
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */    
router.delete('/task-delete/:id',authToken.authenticateToken, taskController.taskDeletion);






export default router;

