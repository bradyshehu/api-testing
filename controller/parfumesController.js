const connection = require("../data/db");

const indexTest = (req, res) => {
  const sql = `
    SELECT 
      products.*, 
      brands.name AS brand_name, 
      brands.logo AS brand_logo,
      brands.description AS brand_description

    FROM products
    INNER JOIN brands ON products.brand_id = brands.id
  `;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

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

// NOTE PER SUCCESSIVE REST API, SOPRATUTTO LA SHOW, TUTTO QUESTO NON SERVIRÁ, CON UNA INNER JOIN SI PUÓ RISALIRE ALLE INFO CORRELATE AL PRODOTTO,
//  AVREMO ALTRI PARAMETRI A CUI APPOGGIARCI PER FARLO, NON SARÁ(CREDO) NECESSARIA TUTTA QUESTA LOGICA (CHE SICURAMENTE É OTTIMIZZABILE)

module.exports = { indexTest };
