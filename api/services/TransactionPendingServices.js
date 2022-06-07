const { cpf } = require('cpf-cnpj-validator');

class TransactionPendingService {

    // Import Mock API with transaction pending to verify
    constructor(pix) {
        this.transactionPendingAPI = require('../data/transactionPending.json');
        this.pix = pix;
    }

    // Get Transaction Pending in transactionPendingAPI
    get() {        
        /*
            Verify type of key pix to execute correct search format in transactionPendingAPI
            ----------------------
            1 = CPF
            2 = Email
            3 = Phone number
        */
        if (this.pix.keyType._id === 1) {
            try {
                // Format CPF with . and -
                const key = cpf.format(this.pix.key);
                // Search for transaction pending in Mock "API" 
                const transactionPending = this.transactionPendingAPI.find(tp => tp.key === key);
                // Return transaction pending if exist, if not exist return undefined (controller layer must handle if return undefined)
                return transactionPending;
            } catch (error) {
                throw error;
            }
        }
    };

}

module.exports = TransactionPendingService;