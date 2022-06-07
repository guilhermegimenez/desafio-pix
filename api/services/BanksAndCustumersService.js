class TransactionPendingService {

    // Import Mock API to find account and bank by customerID
    constructor() {
        this.banksAndCustumersAPI = require('../data/banksAndCustumers.json');
    }

    // Get customer bank account information by customerID in banksAndCustumersAPI
    get(customerID) {
        try {
            // Reduce array and search for customer by customerID
            const customer = this.banksAndCustumersAPI
                .reduce((prev, next) => prev.concat(next.customers), [])
                .find(customer => {
                    return customer.customerID === customerID;
                });

            // Return customer account if exist, if not exist return undefined (controller layer must handle if return undefined)
            return customer;
        } catch (error) {
            throw error;
        }
    };

}

module.exports = TransactionPendingService;