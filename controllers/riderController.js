require("dotenv").config();

const db = require("../config/dbConnection");

const deliverOrder = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const {order_id} = req.body;
        const delivered = await conn.query(`UPDATE order_checkout SET status = 5 WHERE order_id = ?`,[order_id]);
        if(!delivered){
            return res.status(404).json({
                msg:'order Not Found'
            });
        }
        return res.status(200).json({
            msg:'Order has been Delivered'
        });
    } catch (error) {
        console.log(error);
    }finally{
        if(conn){
            conn.release();
        }
    }
}

module.exports={
    deliverOrder
}