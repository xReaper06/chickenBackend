require("dotenv").config();

const db = require("../config/dbConnection");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const insertProduct = async(req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const {productname,productdesc,quantity,price} = req.body;
      const {image} = req.files;
      const {id} = req.user;
      const insertProd = await conn.query('INSERT INTO products(user_id,image,productname,productdesc,quantity,price,created)VALUES(?,?,?,?,?,?,now())',[
        id,`images/${image[0].originalname}`,productname,productdesc,quantity,price
      ]);
      if(!insertProd){
        return res.status(403).json({
          msg:'Product is failed to Insert'
        });
      }
      return res.status(201).json({
        msg:'Product is Inserted'
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }

  const getAllProductInserted = async(req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const [insertedProd] = await conn.query(`
      SELECT
                  prod.id,
                  prod.image,
                  prod.productname,
                  prod.productdesc,
                  prod.quantity,
                  prod.price,
                  prod.status
              FROM
                  products AS prod
              GROUP BY
                  prod.id,
                  prod.image,
                  prod.productname,
                  prod.productdesc,
                  prod.quantity,
                  prod.price,
                  prod.status
      `);
      if(insertedProd.length <= 0){
        return res.status(404).json({
          msg:'Product is empty'
        });
      }
      return res.status(200).json({
        insertedProd:insertedProd
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }
  const getAllItemsCheckedOut = async (req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const [allItemsCheckedOut] = await conn.query(`
      SELECT pc.*,
      CONCAT_WS(', ', addr.sitio, addr.baranggay, addr.city, addr.province) AS address, addr.zipcode, 
      CONCAT_WS(' ',info.fname,info.mname,info.lname) AS fullname, info.phone
       FROM order_checkout AS pc 
       LEFT OUTER JOIN user_address AS addr ON addr.user_id = pc.user_id 
       LEFT OUTER JOIN user_info AS info ON info.user_id = pc.user_id
       WHERE pc.status = 1
      `);
      return res.status(200).json({
        allItemsCheckedOut:allItemsCheckedOut
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release()
      }
    }
  }
  const getAllItemsAccepted = async (req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const [allItemsAccepted] = await conn.query(`
      SELECT pc.*,
      CONCAT_WS(', ', addr.sitio, addr.baranggay, addr.city, addr.province) AS address, addr.zipcode, CONCAT_WS(' ',info.fname,info.mname,info.lname) AS fullname, info.phone
       FROM order_checkout AS pc 
       LEFT OUTER JOIN user_address AS addr ON addr.user_id = pc.user_id 
       LEFT OUTER JOIN user_info AS info ON info.user_id = pc.user_id
       WHERE pc.status = 2
      `);
      return res.status(200).json({
        allItemsAccepted:allItemsAccepted
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release()
      }
    }
  }
  const getAllItemsPrepare = async (req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const [allItemsAccepted] = await conn.query(`
      SELECT pc.*,
      CONCAT_WS(', ', addr.sitio, addr.baranggay, addr.city, addr.province) AS address, addr.zipcode, CONCAT_WS(' ',info.fname,info.mname,info.lname) AS fullname, info.phone
       FROM order_checkout AS pc 
       LEFT OUTER JOIN user_address AS addr ON addr.user_id = pc.user_id 
       LEFT OUTER JOIN user_info AS info ON info.user_id = pc.user_id
       WHERE pc.status = 3
      `);
      return res.status(200).json({
        allItemsPrepare:allItemsAccepted
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release()
      }
    }
  }
  const getAllItemsShip = async (req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const [allItemsAccepted] = await conn.query(`
      SELECT pc.*,
      CONCAT_WS(', ', addr.sitio, addr.baranggay, addr.city, addr.province) AS address, addr.zipcode, CONCAT_WS(' ',info.fname,info.mname,info.lname) AS fullname, info.phone
       FROM order_checkout AS pc 
       LEFT OUTER JOIN user_address AS addr ON addr.user_id = pc.user_id 
       LEFT OUTER JOIN user_info AS info ON info.user_id = pc.user_id
       WHERE pc.status = 4
      `);
      return res.status(200).json({
        allItemsPrepare:allItemsAccepted
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release()
      }
    }
  }
  const getAllItemsDelivered = async (req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const [allItemsAccepted] = await conn.query(`
      SELECT pc.*,
      CONCAT_WS(', ', addr.sitio, addr.baranggay, addr.city, addr.province) AS address, addr.zipcode, CONCAT_WS(' ',info.fname,info.mname,info.lname) AS fullname, info.phone
       FROM order_checkout AS pc 
       LEFT OUTER JOIN user_address AS addr ON addr.user_id = pc.user_id 
       LEFT OUTER JOIN user_info AS info ON info.user_id = pc.user_id
       WHERE pc.status = 5
      `);
      return res.status(200).json({
        allItemsPrepare:allItemsAccepted
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release()
      }
    }
  }
  const itemProcess = async (req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const {order_id} = req.body;
      const itemProcess = await conn.query(`UPDATE order_checkout SET status = 2 WHERE order_id = ?`,[order_id]);
      if(!itemProcess){
        return res.status(404).json({
          msg:'Item Not Found'
        });
      }
      return res.status(200).json({
        msg:'Item Has been Proccess!!'
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }
  const itemPrepare = async (req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const {order_id} = req.body;
      const itemPrepare = await conn.query(`UPDATE order_checkout SET status = 3 WHERE order_id = ?`,[order_id]);
      if(!itemPrepare){
        return res.status(404).json({
          msg:'Item Not Found'
        });
      }
      return res.status(200).json({
        msg:'Item Has been Prepare!!'
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }
  const itemShip = async (req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const {order_id} = req.body;
      const itemShip = await conn.query(`UPDATE order_checkout SET status = 4 WHERE order_id = ?`,[order_id]);
      if(!itemShip){
        return res.status(404).json({
          msg:'Item Not Found'
        });
      }
      return res.status(200).json({
        msg:'Item Has been Ship!!'
      });
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }

  const UpdateProduct = async(req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const {prod_id,quantity,price} = req.body;
      const added = await conn.query(`UPDATE products SET quantity = ?,price = ?, status = 0, updated = now() WHERE id = ?`,[quantity,price,prod_id]);
      if(!added){
        return res.status(404).json({
          msg:"product Not Found"
        });
      }
      return res.status(200).json({
        msg:'Added Quantity Successfully'
      })
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }
  const UnavailableProduct = async(req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const {prod_id} = req.body;
      const added = await conn.query(`UPDATE products SET status = 2, updated = now() WHERE id = ?`,[prod_id]);
      if(!added){
        return res.status(404).json({
          msg:"product Not Found"
        });
      }
      return res.status(200).json({
        msg:'Updated Status Successfully'
      })
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }
  const AvailableProduct = async(req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const {prod_id} = req.body;
      const added = await conn.query(`UPDATE products SET status = 0, updated = now() WHERE id = ?`,[prod_id]);
      if(!added){
        return res.status(404).json({
          msg:"product Not Found"
        });
      }
      return res.status(200).json({
        msg:'Updated Status Successfully'
      })
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }
  const getRiders = async(req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const [rider] = await conn.query(`
      SELECT u.id,u.email,u.created,
      CONCAT_WS(' ',inf.fname,inf.mname,inf.lname) AS fullname, 
      CONCAT_WS(', ',addr.sitio,addr.baranggay,addr.city,addr.province) AS address, addr.zipcode
      FROM users AS u
      LEFT OUTER JOIN user_info AS inf ON inf.user_id = u.id
      LEFT OUTER JOIN user_address AS addr ON addr.user_id = u.id
      WHERE u.role = 3
      `);
      return res.status(200).json({
        rider:rider
      })
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }
  const riderRegistration = async(req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const {email,password,sitio,baranggay,city,province,zipcode,fname,lname,mname,phone} = req.body;
      const {image} = req.files;
      const [result] = await conn.query('SELECT email FROM users WHERE email = ?',[
        email
      ]);
      if(result.length > 0){
        return res.status(401).json({
          msg:'email is already Exist!!'
        });
      }
      const hashedPass = await bcrypt.hash(password,10);
      const res2 = await conn.query(`INSERT INTO users(email,password,role,status,created)VALUES(?,?,3,'new',now())`,[
        email,hashedPass
      ]);
      if(!res2){
        return res.status(400).json({
          msg:'ERROR REGISTRATION'
        })
      }
      await conn.query('INSERT INTO user_address(user_id,sitio,baranggay,city,province,zipcode,status,created)VALUES(?,?,?,?,?,?,1,now())',[
        res2[0].insertId,sitio,baranggay,city,province,zipcode
      ]);
      await conn.query('INSERT INTO user_info(user_id,fname,lname,mname,phone,status,created)VALUES(?,?,?,?,?,1,now())',[
        res2[0].insertId,fname,lname,mname,phone
      ])
      await conn.query('INSERT INTO user_profile (user_id,image,created)VALUES(?,?,now())',[
        res2[0].insertId,`images/${image[0].originalname}`
      ])
      return res.status(201).json({
        msg:'User is Registered Successfully'
      });
    } catch (error) {
      console.log(error)
    }finally{
      if(conn){
        conn.release();
      }
    }
  }
  const getAllSummary = async(req,res)=>{
    let conn;
    try {
      conn = await db.getConnection();
      const [totalSales] = await conn.query(`SELECT SUM(price) AS totalSales FROM product_cart WHERE status = 2`);
      const [totalProducts] = await conn.query(`SELECT COUNT(*) AS totalProducts FROM products WHERE status = 0` );
      const [OutofStocks] = await conn.query(`SELECT COUNT(id) AS OutofStocks FROM products WHERE status = 1` )
      const [registeredUsers] = await conn.query(`SELECT COUNT(id) AS registeredUsers FROM users WHERE role = 1 `);
      const [products] = await conn.query(`SELECT price,updated FROM product_cart WHERE status = 2`);
      return res.status(200).json({
        totalSales:totalSales[0],
        totalProducts:totalProducts[0],
        OutofStocks:OutofStocks[0],
        registeredUsers:registeredUsers[0],
        products:products
      })
    } catch (error) {
      console.log(error);
    }finally{
      if(conn){
        conn.release();
      }
    }
  }

  module.exports={
    insertProduct,
    getAllProductInserted,
    getAllItemsCheckedOut,
    itemProcess,
    getAllItemsAccepted,
    itemPrepare,
    getAllItemsPrepare,
    getAllItemsShip,
    itemShip,
    UpdateProduct,
    UnavailableProduct,
    AvailableProduct,
    getRiders,
    riderRegistration,
    getAllItemsDelivered,
    getAllSummary
  }