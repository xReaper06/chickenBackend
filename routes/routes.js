const express = require('express');
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); // Adjust the destination folder as needed
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });
  //Middleware
  const {verifyToken} = require('../middleware');

  const authController = require('../controllers/authController');
  const adminController = require('../controllers/adminController')
  const userController = require('../controllers/userController')
  const riderController = require('../controllers/riderController')

  //auth
  router.get('/getAllInformation',verifyToken,authController.getAllInformation);
  router.get('/getMyInfo',verifyToken,authController.getMyInfo);
  router.post('/login',authController.login);
  router.post('/userRegistration',upload.fields([{name:'image',maxCount:1}]),authController.userRegistration);
  router.post('/Token',authController.Token);
  router.post('/logout',verifyToken,authController.logout);

  //admin
  router.get('/getAllProductInserted',verifyToken,adminController.getAllProductInserted);
  router.get('/getAllItemsCheckedOut',verifyToken,adminController.getAllItemsCheckedOut);
  router.get('/getAllItemsAccepted',verifyToken,adminController.getAllItemsAccepted);
  router.get('/getAllSummary',verifyToken,adminController.getAllSummary);
  router.get('/getAllItemsPrepare',verifyToken,adminController.getAllItemsPrepare);
  router.get('/getAllItemsDelivered',verifyToken,adminController.getAllItemsDelivered);
  router.get('/getRiders',verifyToken,adminController.getRiders);
  router.get('/getAllItemsShip',verifyToken,adminController.getAllItemsShip);
  router.post('/insertProduct',upload.fields([{name:'image',maxCount:1}]),verifyToken,adminController.insertProduct);
  router.post('/itemProcess',verifyToken,adminController.itemProcess);
  router.post('/itemPrepare',verifyToken,adminController.itemPrepare);
  router.post('/itemShip',verifyToken,adminController.itemShip);
  router.post('/UpdateProduct',verifyToken,adminController.UpdateProduct);
  router.post('/UnavailableProduct',verifyToken,adminController.UnavailableProduct);
  router.post('/AvailableProduct',verifyToken,adminController.AvailableProduct);
  router.post('/riderRegistration',upload.fields([{name:'image',maxCount:1}]),adminController.riderRegistration);


  //user
  router.get('/getAllProduct',userController.getAllProduct);
  router.get('/getUsersInfo',verifyToken,userController.getUsersInfo);
  router.get('/getMyProductCart',verifyToken,userController.getMyProductCart);
  router.get('/getAllFavorites',verifyToken,userController.getAllFavorites);
  router.get('/myOrderDelivered',verifyToken,userController.myOrderDelivered)
  router.post('/addToCart',verifyToken,userController.addToCart)
  router.post('/getProduct',verifyToken,userController.getProduct)
  router.post('/checkout',verifyToken,userController.checkout)
  router.post('/editCart',verifyToken,userController.editCart)
  router.post('/removeFromCart',verifyToken,userController.removeFromCart)
  router.post('/UpdateQuantity',verifyToken,userController.UpdateQuantity)
  router.post('/trackMyorder',verifyToken,userController.trackMyorder)
  router.post('/addtoFavorites',verifyToken,userController.addtoFavorites)
  router.post('/removeFromFavorites',verifyToken,userController.removeFromFavorites)

  //rider
  router.post('/deliverOrder',verifyToken,riderController.deliverOrder)

  module.exports = router;