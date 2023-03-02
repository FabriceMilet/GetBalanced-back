const express = require("express");
const categoryController = require ("../controller/categoryController");
const plannerController = require ("../controller/plannerController");
const taskController = require("../controller/taskController");
const userController = require ("../controller/userController");

// middlewares
const {isLogged, checkToken} = require("../middleware/middlewareLogin");



const router = express.Router();


/** ROUTES USER  */
router.get("/user/:id", isLogged, checkToken, userController.getUser); // récupère le profil d'un user
router.post("/user/login", userController.loginUser ); // router pour logguer un utilisateur
router.get("user/logout", isLogged, checkToken, userController.logOut); // route pour déconnecter l'utilisateur
router.post("/user", userController.addUser); // Ajoute un utilisateur en bdd
router.patch("/user/:id", isLogged, checkToken, userController.updateUser); // modifier un utilisateur en bdd
router.delete("/user/:id", isLogged, checkToken, userController.deleteUser ); //supprime un utilisateur

/** ROUTES PLANNER */
router.get("/planner/user/:id", isLogged, checkToken,plannerController.getUserPlanners); // récupère tous les tableaux d'un user
router.get ("/planner/:id", isLogged, checkToken, plannerController.getPlanner) ;//récupère un tableau via son id avec ses données liées 
router.put("/planner/:id", isLogged, checkToken, plannerController.updatePlanner); // modifie un tableau
router.post("/planner/user/:id", isLogged, checkToken, plannerController.createPlanner);// ajoute un tableau
router.delete("/planner/:id", isLogged, checkToken, plannerController.deletePlanner); // supprime un tableau

/** ROUTES TASK */
router.get("/task/planner/:id", isLogged, checkToken, taskController.getPlannerTasks); // récupère les tâches d'un user dans un tableau
router.post("/task/planner/:id", isLogged, checkToken, taskController.addTaskInPlanner); // ajoute un tâche dans un tableau
router.put("/task/:idTask/planner/:idPlanner", isLogged, checkToken, taskController.updateTask); // modifie une tâche dans un tableau
router.delete("/task/:id", isLogged, checkToken, taskController.deleteTask); // supprime une tâche dans un tableau
router.get("/category/:idCat/planner/:idPlan/task/", isLogged, checkToken, plannerController.getCategoryTasks); //récupère les tâches d’une catégorie dans un planner

/** ROUTES CATEGORIES */
router.get("/category/", isLogged, checkToken, categoryController.getAllCategories); // récupère toutes les catégories


module.exports = router;
