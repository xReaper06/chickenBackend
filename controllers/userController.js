require("dotenv").config();

const db = require("../config/dbConnection");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const getUsersInfo = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {id} = req.user;
        const [user_info] = await conn.query(`
                SELECT 
            users.id,users.email,
            CONCAT_WS(' ', user_info.fname, user_info.mname, user_info.lname) AS fullname,
            user_info.phone,
            CONCAT_WS(', ', user_add.sitio, user_add.baranggay, user_add.city, user_add.province) AS address,
            profile.image AS profile_picture
        FROM users
        LEFT OUTER JOIN 
            user_info ON user_info.user_id = users.id
        LEFT OUTER JOIN 
            user_address AS user_add ON user_add.user_id = users.id
        LEFT OUTER JOIN 
            user_profile AS profile ON profile.user_id = users.id
        WHERE users.id = ?`,[id]);
        if(user_info.length <=0){
            return res.status(404).json({
                msg:'User info not found'
            });
        }
        return res.status(200).json({
            user_info:user_info[0]
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release()
        }
    }
}

const getAllProduct = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const [allProduct] = await conn.query(`
        SELECT
                id,
                image,
                productname,
                productdesc,
                quantity,
                price,
                status
            FROM
                products
            `);
            allProduct.forEach(async(data)=>{
                if(data.quantity == 0){
                    await conn.query('UPDATE products  SET status = 1, updated = now() WHERE id = ?',[data.id]);
                }
            })
            return res.status(200).json({
                allProduct:allProduct
            })
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const getProduct = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {prod_id} = req.body;
        const [product] = await conn.query(`
        SELECT
                id,
                image,
                productname,
                productdesc,
                quantity,
                price,
                status
            FROM
                products
                WHERE id = ?
            `,[prod_id]);
            return res.status(200).json({
                product:product
            })
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}

const addToCart = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {prod_id,quantity,totalPrice}=req.body;
        const {id} = req.user;
        const [condition] = await conn.query('SELECT quantity FROM products WHERE id = ?',[prod_id]);
        const [condition2] = await conn.query('SELECT * FROM product_cart WHERE product_id = ? AND user_id = ? AND status = 1',[prod_id,id]);
        if(condition.length <=0){
            return res.status(403).json({
                msg:'item not Found'
            });
        }
        if(condition[0].quantity < quantity){
            return res.status(401).json({
                msg:'Stocks is not fit to your expected Quantity Order'
            })
        }
        if(condition2.length > 0 ){
            return res.status(403).json({
                msg:'This item is already in your Cart'
            });
        }
        const result = await conn.query('INSERT INTO product_cart(user_id,product_id,quantity,price,status,created)VALUES(?,?,?,?,1,now())',[
           id,prod_id,quantity,totalPrice
        ]);
        if(!result){
            return res.status(404).json({
                msg:'Item not Found'
            })
        }
        return res.status(201).json({
            msg:'Item Added to Cart'
        });
    } catch (error) {
        console.log(error)
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const getMyProductCart = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {id} = req.user;
        const [myProductCart] = await conn.query(`
        SELECT cart.id,cart.product_id,cart.quantity,cart.status,cart.created,prod.image,prod.productname,prod.quantity AS prod_quantity,prod.price
        FROM product_cart AS cart 
        LEFT OUTER JOIN products AS prod ON prod.id = cart.product_id 
        WHERE cart.user_id = ? AND cart.status = 1
        `,[id]);
        return res.status(200).json({
            myProductCart:myProductCart
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const checkout = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {prod_id,selectedItems,cart_id,totalPrice} = req.body;
        const {id} = req.user
        const query1 = 'SELECT quantity,productname FROM products WHERE id = ?'
        const query = 'SELECT quantity,price FROM product_cart WHERE product_id = ? AND user_id = ? AND status = 1'
        let original_prod;
        let cart_prod;
        let orderID = crypto.randomBytes(5).toString('hex');
            for (let i = 0; i < prod_id.length; i++) {
                [original_prod] = await conn.query(query1,[prod_id[i]]);
                [cart_prod] = await conn.query(query,[prod_id[i],id]);


                if(original_prod[0].quantity < cart_prod[0].quantity || original_prod[0].quantity == 0){
                    await conn.query('UPDATE products  SET status = 1, updated = now() WHERE id = ?',[prod_id[i]]);
                    return res.status(403).json({
                        msg:`Item ${original_prod[0].productname} is not Available at the moment`
                    })
                }else{
                    let new_stocks = original_prod[0].quantity - cart_prod[0].quantity;
                    await conn.query('UPDATE products SET quantity = ? WHERE id = ?',[new_stocks,prod_id[i]]);
                }
            }
            for (let i = 0; i < cart_id.length; i++) {
                await conn.query('UPDATE product_cart SET status = 2,updated = now() WHERE id = ?',[cart_id[i]])
            }
  
            const checkoutThis = await conn.query(`INSERT INTO order_checkout(order_id,user_id,totalprice,products,paymentType,status,created)VALUES(?,?,?,?,1,1,now())`,[
                orderID,id,totalPrice,JSON.stringify(selectedItems)
            ])
            if(!checkoutThis){
                return res.status.json({
                    msg:'Error Checkout'
                })
            }
            return res.status(200).json({
                msg:`Items is Check Outed Goto your the Tracking Order`
            });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}

const removeFromCart = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {cart_id} = req.body;
        const removeProdCart = await conn.query('DELETE FROM product_cart WHERE id=?',[cart_id]);
        if(!removeProdCart){
            return res.status(404).json({
                msg:'Product Failed to remove!!'
            });
        }
        return res.status(200).json({
            msg:'Product Remove from Cart!!'
        })
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const UpdateQuantity = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {cart_id,quantity} = req.body;
        const [selectCart] = await conn.query(`
        SELECT cart.id,prod.quantity,prod.price
        FROM product_cart AS cart
        LEFT JOIN products AS prod ON prod.id = cart.product_id
        WHERE cart.id = ?
        `,[cart_id]);
        if(selectCart[0].quantity < quantity){
            return res.status(403).json({
                msg:'The Quantity is Higher than the Available Stocks'
            });
        }
        let updatedPrice; 
        updatedPrice = selectCart[0].price * quantity
        const updateProd = await conn.query('UPDATE product_cart SET quantity = ?, price = ? WHERE id = ?',[
            quantity,updatedPrice,cart_id
        ]);
        if(!updateProd){
            return res.status(404).json({
                msg:'Failed to Update This Product in your Cart!!'
            });
        }
        console.log(updatedPrice);
        return res.status(200).json({
            msg:'Updated SuccessFully'
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}

const editCart = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {cart_id,quantity} = req.body;
        const [selectCart] = await conn.query(`
        SELECT cart.id,prod.quantity,prod.price
        FROM product_cart AS cart
        LEFT JOIN products AS prod ON prod.id = cart.product_id
        WHERE cart.id = ?
        `,[cart_id]);
        if(selectCart[0].quantity < quantity){
            return res.status(403).json({
                msg:'The Quantity is Higher than the Available Stocks'
            });
        }
        let updatedPrice; 
        updatedPrice = selectCart[0].price * quantity
        const updateProd = await conn.query('UPDATE product_cart SET quantity = ?, price = ? WHERE id = ?',[
            quantity,updatedPrice,cart_id
        ]);
        if(!updateProd){
            return res.status(404).json({
                msg:'Failed to Update This Product in your Cart!!'
            });
        }
        console.log(updatedPrice);
        return res.status(200).json({
            msg:'Updated SuccessFully'
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const trackMyorder = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {id} = req.user;
        const [orderTrack] = await conn.query(`
        SELECT pc.*,
       CONCAT_WS(', ', addr.sitio, addr.baranggay, addr.city, addr.province) AS address, addr.zipcode
        FROM order_checkout AS pc 
        LEFT OUTER JOIN user_address AS addr ON addr.user_id = pc.user_id 
        WHERE pc.user_id = ? AND pc.status BETWEEN 1 AND 4
        `,[id]);
        return res.status(200).json({
            orderTrack:orderTrack
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const myOrderDelivered = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {id} = req.user;
        const [orderTrack] = await conn.query(`
        SELECT pc.*,
       CONCAT_WS(', ', addr.sitio, addr.baranggay, addr.city, addr.province) AS address, addr.zipcode
        FROM order_checkout AS pc 
        LEFT OUTER JOIN user_address AS addr ON addr.user_id = pc.user_id 
        WHERE pc.user_id = ? AND pc.status = 5
        `,[id]);
        return res.status(200).json({
            orderTrack:orderTrack
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const addtoFavorites = async (req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {prod_id} = req.body;
        const {id} = req.user;
        const [favorites] = await conn.query(`SELECT product_id FROM product_favorites WHERE user_id = ? AND product_id = ?`,[
            id,prod_id
        ]);
        if(favorites.length > 0){
            return res.status(404).json({
                msg:"This product is already in your list!!"
            });
        }
        const response = await conn.query(`INSERT INTO product_favorites(user_id,product_id,created)VALUES(?,?,now())`,[
            id,prod_id
        ]);
        if(!response){
            return res.status(404).json({
                msg:'FAILED ADD TO FAVORITES'
            });
        }
        return res.status(201).json({
            msg:'Product ADDED TO FAVORITES'
        });
    } catch (error) {
        console.log(error)
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const changePassword = async (req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {newPassword} = req.body;
        const {id} = req.user;
        const [user] = await conn.query('SELECT password FROM users WHERE id = ?',[id]);
        const hashPass = await bcrypt.hash(newPassword,10);
        const verifyPass = await bcrypt.compare(hashPass,user[0].password);
        if(verifyPass){
            return res.status(403).json({
                msg:'Password is Already Exist Try to Change Another Password'
            });
        }
        const updatedPass = await conn.query('UPDATE users SET password = ? WHERE id = ?',[hashPass,id]);
        if(!updatedPass){
            return res.status(404).json({
                msg:'User is not Authorized'
            });
        }
        return res.status(201).json({
            msg:'Password Change SuccessFully!!'
        })
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const changeProfilePic = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {image} = req.files;
        const {id} = req.user;
        const changepic = await conn.query('UPDATE user_profile SET image = ?,updated = now() WHERE user_id = ?',[`images/${image[0].originalname}`,id]);
        if(changepic.affectedRows <=0){
            return res.status(404).json({
                msg:'image is not found'
            });
        }
        return res.status(200).json({
            msg:'Profile is Successfully Changed!!'
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const changeAddress = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {sitio,baranggay,city,province,zipcode} = req.body;
        const {id} = req.user;
        const changeAdd = await conn.query('UPDATE user_address SET sitio = ?, baranggay = ?, city = ?, province = ?, zipcode = ?, status = 2, updated = now() WHERE user_id = ?',[
            sitio,baranggay,city,province,zipcode,id
        ]);
        if(changeAdd.affectedRows <= 0){
            return res.status(404).json({
                msg:'Error Changing Address'
            });
        }
        return res.status(201).json({
            msg:'Successfully Changing Address!!'
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const changeInfo = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {fname,lname,mname,phone} = req.body;
        const {id} = req.user;
        const changeAdd = await conn.query('UPDATE user_info SET fname=?,lname = ?, mname = ?,  phone = ? WHERE user_id = ?',[
            fname,lname,mname,phone,id
        ]);
        if(changeAdd.affectedRows <= 0){
            return res.status(404).json({
                msg:'Error Changing Info'
            });
        }
        return res.status(201).json({
            msg:'Successfully Changing Info!!'
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const getAllFavorites = async (req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {id} = req.user;
        const [favorites] = await conn.query(`
        SELECT fav.id,fav.product_id,prod.productname,prod.productdesc,prod.quantity,prod.price,prod.image
        FROM product_favorites AS fav
        LEFT OUTER JOIN products AS prod ON prod.id = fav.product_id
        WHERE fav.user_id = ?
        `,[id]);
        return res.status(200).json({
            favorites:favorites
        })
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
const removeFromFavorites = async (req,res)=>{
    let conn;
    try {
        conn = await db.getConnection()
        const {fav_id} = req.body;
        const removed = await conn.query(`DELETE FROM product_favorites WHERE id = ?`,[fav_id]);
        if(!removed){
            return res.status(404).json({
                msg:'Failed to removed'
            });
        }
        return res.status(200).json({
            msg:'Product Removed!!'
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}
module.exports = {
    getAllProduct,
    getUsersInfo,
    addToCart,
    getProduct,
    getMyProductCart,
    checkout,
    editCart,
    removeFromCart,
    UpdateQuantity,
    trackMyorder,
    addtoFavorites,
    getAllFavorites,
    removeFromFavorites,
    myOrderDelivered,
    changeAddress,
    changeInfo,
    changePassword,
    changeProfilePic
}