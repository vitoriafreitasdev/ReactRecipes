
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const siteController = require("../controllers/siteController");
const upload = require("../helpers/upload");
require("dotenv").config();

const secret = process.env.SECRET;

const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({msg: "Acesso negado!"});
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: "Token inválido."});
    }
};

// Rotas públicas
router.route("/cadastro").post(siteController.register);
router.route("/login").post(siteController.login);
router.route("/receitas").get(siteController.getRecipes);
router.route("/receitas/:id").get(siteController.getRecipe);
router.route("/receitas/addlike/:id").patch(siteController.addLike);
router.route("/receitas/addcomment/:id").patch(siteController.addComents);
router.route("/users").get(siteController.getUser);

// Rotas protegidas (com autenticação)
router.route("/user/:id").get(checkToken, siteController.userRoute);

// Criar receita (obriga imagem)
router.route("/user/addRecipes")
  .post(
    checkToken, 
    upload.single("image"), 
    (req, res, next) => {
      // MODIFICADO: Verifica se recebeu imagem
      if(!req.file) {
        return res.status(400).json({msg: "Por favor, envie uma imagem."});
      }
      next();
    }, 
    siteController.addRecipes
  );

// Deletar receita
router.route("/receitas/delete/:id")
  .delete(checkToken, siteController.deleteRecipe);

// Atualizar receita (imagem OPCIONAL)
router.route("/user/editrecipes/:id")
  .patch(
    checkToken, 
    upload.single("image"), // Ainda usa multer, mas aceita sem arquivo
    siteController.uptadeRecipe // O controller já lida com imagem opcional
  );

module.exports = router;