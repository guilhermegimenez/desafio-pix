var validate = require('jsonschema').validate;
const PixSchema = require('../schemas/PixSchema');
var transactionPendingServices = require('../services/TransactionPendingServices');
var banksAndCustumersService = require('../services/BanksAndCustumersService');
var balanceService = require('../services/BalanceService')
  
module.exports = () => {

    const pixController = {};
    const pixSchema = new PixSchema();


    pixController.retryTransactionHandle = (req, res) => {
        const pix = req.body;

        //  Validate Schema
        const result = validate(pix, pixSchema.schema)
        if (result.valid === false) {
            res.status(400).json({ errors: result.errors });
            return;
        }

        try {
            // Initialize Services Class
            transactionPendingServices = new transactionPendingServices(pix);
            banksAndCustumersService = new banksAndCustumersService();
            balanceService = new balanceService();

            // Find for Transaction Pending
            const transactionPending = transactionPendingServices.get();

            // Verify if exist Transaction Pending
            if (transactionPending === undefined) {
                // If not exist return 404 
                res.status(404)
                .json({ message: "This key pix does not match with a valid transaction pending" });
                return;
            }

            // Find for account custumer by customerID
            const custumerAccount = banksAndCustumersService.get(transactionPending.customerID)
            
            // Get balance by agency and account
            const balance = balanceService.get(custumerAccount.agency, custumerAccount.account);

            if (balance === undefined) {
                // If service have some problem return status code 500 
                res.status(500)
                .json({ message: "Sorry, for some reason the service can not return balance" });
                return;
            }

            // Verify if transactionPending.value is less or equal to balance
            // if have funds realize transaction
            // if does not have fund return status code 401 : Transanction unauthorized by insufficient funds
            if (balance >= transactionPending.value) {
                res.status(200)
                .json({ message: "Transaction done with success" });
                return;
            } else {
                res.status(401)
                .json({ message: "Transanction unauthorized by insufficient funds" });
                return;
            }

            console.log(custumerAccount)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Sorry, something unexpected happened" });
        }

        res.status(200).json({ "handle": "ok" });
    };

    return pixController;
}