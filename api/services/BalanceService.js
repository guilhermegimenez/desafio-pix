class BalanceService {

    // Import Mock API to find account and bank by customerID
    constructor() {
        this.balanceAPI = require('../data/balance.json');
    }

    // Get customer bank account information by customerID in banksAndCustumersAPI
    get(agency, account) {
        try {
            if (agency === '7961' && account === '52850-6') {
                return this.balanceAPI.balance;
            } else {
                return undefined;
            }
        } catch (error) {
            throw error;
        }
    };

}

module.exports = BalanceService;