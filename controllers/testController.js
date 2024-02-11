require("dotenv").config();

const db = require("../config/dbConnection");

const TestQuery = async(req,res)=>{
    let conn;
    try {
        conn = await db.getConnection();
        const [products] = await conn.query(`SELECT id,productname,productdesc,image,
        (SELECT COUNT(id) FROM products) AS totalCounts  
        FROM products WHERE id > 1 ORDER BY id DESC LIMIT 2`);
        return res.status(200).json({
            products:products,
            countProd:products[0].totalCounts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error});
    }finally{
        if(conn){
            conn.release();
        }
    }
}

module.exports = {
    TestQuery
}


