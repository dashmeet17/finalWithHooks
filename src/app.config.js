var config = {
  dev: {
      ENDPOINT : {
        CUSTOMER_TRANSACTIONS : 'http://localhost:8080/customer-transactions',
        ADD_TRANSACTION : 'http://localhost:8080/add-transaction'
      }
  },
  prod: {
      ENDPOINT : {
        CUSTOMER_TRANSACTIONS : 'http://localhost:8080/customer-transactions',
        ADD_TRANSACTION : 'http://localhost:8080/add-transaction'
      }
  }
};

module.exports = config;
