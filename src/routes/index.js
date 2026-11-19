//mapa das rotas da api

const { Router } = require("express");
const tutorController = require("../controllers/tutorController");
const animalController = require("../controllers/animalController");

const router = Router();

// ----- Tutores -----
router.get("/tutores", tutorController.listar); //            lista (aceita ?busca=)
router.post("/tutores", tutorController.criar); //            cria
router.get("/tutores/:id", tutorController.buscarPorId); //   detalhe
router.put("/tutores/:id", tutorController.atualizar); //     atualiza
router.delete("/tutores/:id", tutorController.excluir); //    exclui (bloqueia se houver animais)

router
  .route("/tutores/:tutorId/animais")
  .get(animalController.listar)
  .post(animalController.criar);

router
  .route("/tutores/:tutorId/animais/:id")
  .get(animalController.buscarPorId)
  .put(animalController.atualizar)
  .delete(animalController.excluir);

module.exports = router;
