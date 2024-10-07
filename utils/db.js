import hana from "@sap/hana-client";
/**
 *@type {null|import("@sap/hana-client").ConnectionPool}
 */
let pool;

/**
 *
 * @param {import("@sap/hana-client").ConnectionOptions} connOpts Connection options.
 * @param {import("@sap/hana-client").PoolOptions} poolOpts Pool options.
 */
function init(connOpts = {}, poolOpts = {}) {
  pool = hana.createPool(connOpts, poolOpts);
}
/**
 *
 * @returns {Promise<import("@sap/hana-client").Connection>}
 */
function getConnectionFromPool() {
  return new Promise((resolve, reject) => {
    try {
      const poolConnection = pool.getConnection();
      resolve(poolConnection);
    } catch (error) {
      reject(error);
    }
  });
}

function clearPool() {
  pool.clear();
}
export { init as default, init, getConnectionFromPool, clearPool };
