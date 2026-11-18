//mapa das rotas da api

const { Router } = require("express");
const tutorController = require("../controllers/tutorController");

const router = Router();

// ----- Tutores -----
router.get("/tutores", tutorController.listar); //            lista (aceita ?busca=)
router.post("/tutores", tutorController.criar); //            cria
router.get("/tutores/:id", tutorController.buscarPorId); //   detalhe
router.put("/tutores/:id", tutorController.atualizar); //     atualiza
router.delete("/tutores/:id", tutorController.excluir); //    exclui (bloqueia se houver animais)

module.exports = router;
