const connection = require("../data/db");
// require("dotenv").config();
// const APP_PORT = process.env.APP_PORT;
// const APP_URL = process.env.APP_URL;

// INDEX TEST

// const index = (req, res) => {
//   const productsSql = "SELECT * FROM products";
//   const brandsSql = "SELECT * FROM brands WHERE brands.id = ?";

//   //  PRIMA QUERY PER FETCHARE I PRODOTTI

//   connection.query(productsSql, (err, productsResults) => {
//     if (err) return res.status(500).json({ error: "Internal server error" });
//     productsList = productsResults;

//     const mappatura = productsList.map((product) => {
//       console.log(product.brand_id);

//       connection.query(brandsSql, [product.brand_id], (err, brandsResults) => {
//         if (err)
//           return res.status(500).json({ error: "Internal server error" });
//         product.brand = brandsResults;
//         console.log(brandsResults[0]);
//       });
//     });
//     res.json(mappatura);
//     console.log(mappatura);
//   });
// };
//  ALTRO TEST

const indexTest = (req, res) => {
  const sql = `
    SELECT 
      products.*, 
      brands.name AS brand_name, 
      brands.logo AS brand_logo
      brands.description AS brand_description
    FROM products
    INNER JOIN brands ON products.brand_id = brands.id
  `;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal server error" });

    // Se vuoi un oggetto brand completo nidificato, puoi fare un map extra
    const products = results.map((product) => {
      const { brand_name, brand_logo, brand_description } = product;
      return {
        product,
        brand: {
          name: brand_name,
          logo: brand_logo,
          description: brand_description,
        },
      };
    });

    res.json(products);
  });
};

module.exports = { indexTest };
