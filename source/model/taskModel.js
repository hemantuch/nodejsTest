const taskCreation = async (data) => {
    return new Promise((resolve, reject) => {
          const values = [data.title, data.description, data.dueDate];
          const insertQuery = 'INSERT INTO task (title, description, dueDate) VALUES (?, ?, ?)';
          connection.query(insertQuery, values, (error, result) => {
            if (error) {
              console.log("Error during query execution:", error);
              return reject(error);
            }
            if (result) {
              resolve(result);
            }
            else {
              const err = {};
              err.message = "Error in task creation";
              return reject(err);
            }
          });
        });
  };

const allTaskList = async (page = 1, limit = 10, offset = 0, sortBy = 'id', order = 'ASC', title = '') => {
  return new Promise((resolve, reject) => {
      // Sanitize inputs and set defaults
      const allowedSortBy = ['id', 'title', 'created_at']; // Allowed sortBy fields
      const allowedOrder = ['ASC', 'DESC']; // Allowed order values
      const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : 'id';
      const safeOrder = allowedOrder.includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';
      const safeTitle = `%${title}%`;
      const safeLimit = parseInt(limit) || 10; // Default to 10 items per page
      const safeOffset = (parseInt(page) - 1) * safeLimit; // Calculate offset based on page

      // Prepare the query
      const query = `
          SELECT * 
          FROM task 
          WHERE title LIKE ?
          ORDER BY ${safeSortBy} ${safeOrder}
          LIMIT ? OFFSET ?;
      `;

      console.log("Query Parameters:", { safeTitle, safeSortBy, safeOrder, safeLimit, safeOffset });

      // Execute the main query
      connection.query(query, [safeTitle, safeLimit, safeOffset], (error, results) => {
          if (error) {
              console.error("Error during query execution:", error);
              return reject(error);
          }

          // Get the total count of tasks
          connection.query('SELECT COUNT(*) AS total FROM task WHERE title LIKE ?', [safeTitle], (countError, countResults) => {
              if (countError) {
                  console.error("Error during count query execution:", countError);
                  return reject(countError);
              }

              const totalTasks = countResults[0].total;
              const totalPages = Math.ceil(totalTasks / safeLimit);

              resolve({
                  result: true,
                  data: results,
                  pagination: {
                      totalTasks,
                      totalPages,
                      currentPage: parseInt(page),
                      pageSize: safeLimit
                  }
              });
          });
      });
  });
};


 const taskModify = async (data) =>{
    return new Promise((resolve, reject) => {
        const values = [data.title, data.description, data.dueDate, data.id];     
        const insertQuery = 'UPDATE task SET title = ?, description = ?, dueDate = ? WHERE id = ?';
        connection.query(insertQuery, values, (error, result) => {
          if (error) {
            console.log("Error during query execution:", error);
            return reject(error);
          }
          if (result) {
            resolve(result);
          }
          else {
            const err = {};
            err.message = "Error in task modification";
            return reject(err);
          }
        });
      });
 }

 const taskDelete = async (data) =>{
    return new Promise((resolve, reject) => {
        const values = [data.id];     
        const insertQuery = 'DELETE FROM task WHERE id = ?';
        connection.query(insertQuery, values, (error, result) => {
          if (error) {
            console.log("Error during query execution:", error);
            return reject(error);
          }
          if (result) {
            resolve(result);
          }
          else {
            const err = {};
            err.message = "Error in task deletion";
            return reject(err);
          }
        });
      });
 }


 const userLogin = async (data) =>{
  console.log("data", data)
  return new Promise((resolve, reject) => {
      const values = [data.username, data.password];     
      const findUser = 'SELECT * FROM user WHERE username = ? AND password = ?';
      connection.query(findUser, values, (error, result) => {
        if (error) {
          console.log("Error during query execution:", error);
          return reject(error);
        }
        if (result) {
          resolve(result);
        }
        else {
          const err = {};
          err.message = "Error in user login";
          return reject(err);
        }
      });
    });
}
 const taskModel = { taskCreation, allTaskList, taskModify, taskDelete, userLogin };
 export default taskModel;