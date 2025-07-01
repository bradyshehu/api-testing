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

// LOGICA DELLA INDEX REST API, MOSTRA TUTTI I PRODOTTI NEL DB IN ORDINE DI ID, MOSTRANDO PER OGNI PRODOTTO A QUALE BRAND APPARTIENE, IL LOGO DEL BRAND E LO SCONTO APPLICATOGLI, SE C'É

const index = (req, res) => {
  const sql = `
    SELECT 
      products.*,      
      brands.name AS brand_name, 
      brands.logo AS brand_logo,
      discount_codes.amount AS discount_amount
    FROM products

    INNER JOIN brands 
    ON products.brand_id = brands.id

    LEFT JOIN discount_codes 
    ON discount_codes.id = products.discount_id

    ORDER BY products.id ASC

  `;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};
const indexBestSellers = (req, res) => {
  const sql = `
    SELECT 
      products.*,      
      brands.name AS brand_name, 
      brands.logo AS brand_logo,
      discount_codes.amount AS discount_amount
    FROM products

    INNER JOIN brands 
    ON products.brand_id = brands.id

    LEFT JOIN discount_codes 
    ON discount_codes.id = products.discount_id

    WHERE products.best_seller = 1
    ORDER BY products.id ASC
  `;

  connection.query(sql, (err, bestSellerResults) => {
    if (err) return res.status(500).json({ error: err });

    res.json(bestSellerResults);
  });
};

const indexRecent = (req, res) => {
  const sql = `
    SELECT 
      products.*,      
      brands.name AS brand_name, 
      brands.logo AS brand_logo,
      discount_codes.amount AS discount_amount
    FROM products

    INNER JOIN brands 
    ON products.brand_id = brands.id

    LEFT JOIN discount_codes 
    ON discount_codes.id = products.discount_id

    ORDER BY products.created_at DESC

  `;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};

// LOGICA DELLA SHOW REST API IN CUI VIENE MOSTRATO IL PRODOTTO CON LE RELATIVE INFO (PRECEDENTI + INGREDIENTI)

const show = (req, res) => {
  const id = req.params.id;
  const productSql = `
    SELECT 
      products.*,      
      brands.name AS brand_name, 
      brands.logo AS brand_logo,
      discount_codes.amount AS discount_amount

    FROM products

    INNER JOIN brands 
    ON products.brand_id = brands.id

    LEFT JOIN discount_codes 
    ON discount_codes.id = products.discount_id
    
    WHERE products.id = ?
  `;

  const ingredientSql = `
  SELECT ingredients.*, 
  ingredients_products.percentage AS percentage
  FROM ingredients

  INNER JOIN ingredients_products 
  ON ingredients_products.ingredient_id = ingredients.id

  WHERE ingredients_products.product_id = ?
  `;

  connection.query(productSql, [id], (err, productResult) => {
    if (err) return res.status(500).json({ error: err });
    if (productResult.length === 0)
      return res.status(500).json({ error: "Product not found" });
    const product = productResult[0];
    connection.query(ingredientSql, [id], (err, ingredientResult) => {
      if (err) return res.status(500).json({ error: err });
      product.ingredients = ingredientResult.map((i) => {
        return {
          name: i.name,
          percentage: i.percentage,
        };
      });
      res.json(product);
    });
  });
};

module.exports = { index, indexBestSellers, indexRecent, show };
