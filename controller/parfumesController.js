const connection = require("../data/db");
// require("dotenv").config();
// const APP_PORT = process.env.APP_PORT;
// const APP_URL = process.env.APP_URL;

// INDEX TEST

// const index = (req, res) => {
//   const productsSql = "SELECT * FROM products";
//   const brandsSql = "SELECT * FROM brands";

//   //  PRIMA QUERY PER FETCHARE I PRODOTTI

//   connection.query(productsSql, (err, productsResults) => {
//     if (err) return res.status(500).json({ error: "Internal server error" });
//     productsList = productsResults;

//     //  SECONDA QUERY PER I BRAND

//     connection.query(brandsSql, (err, brandsResults) => {
//       if (err) return res.status(500).json({ error: "Internal server error" });

//       //  MAP DELL'ARRAY DEI PRODOTTI PER AGGIUNGERE IL BRAND E INFO RIGUARDANTI

//       productsList.map((product) => {
//         //  CICLO PER INDIVIDUARE IL BRAND CORRETTO DEL PRODOTTO (MIGLIORABILE MA PRIMA IDEA CHE MI É VENUTA IN MENTE PERDONATEMI)

//         productsList.forEach((product) => {
//           const brand = brandsResults.find((b) => b.id === product.brand_id);
//           if (brand) product.brand = brand;
//         });

//         // for (i = 0; i < brandsResults.length; i++) {
//         //   if (product.brand_id === brandsResults[i].id)
//         //     product.brand = brandsResults[i];
//         // }
//       });
//       res.json(productsList);
//     });
//   });
// };

const index = (req, res) => {
  const sql = `
    SELECT 
      products.*,      
      brands.name AS brand_name, 
      brands.logo AS brand_logo,
      discounts.discount_amount AS discount_amount
    FROM products

    INNER JOIN brands 
    ON products.brand_id = brands.id

    LEFT JOIN discounts
    ON products.discount_id = discounts.id

  `;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};

// NOTE PER SUCCESSIVE REST API, SOPRATUTTO LA SHOW, TUTTO QUESTO NON SERVIRÁ, CON UNA INNER JOIN SI PUÓ RISALIRE ALLE INFO CORRELATE AL PRODOTTO,
//  AVREMO ALTRI PARAMETRI A CUI APPOGGIARCI PER FARLO, NON SARÁ(CREDO) NECESSARIA TUTTA QUESTA LOGICA (CHE SICURAMENTE É OTTIMIZZABILE)

const show = (req, res) => {
  const id = req.params.id;
};

module.exports = { index };
