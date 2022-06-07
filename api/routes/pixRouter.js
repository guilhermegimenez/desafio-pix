module.exports = app => {
    const controller = app.controllers.pixController;

    app.route('/api/pix/retry-transaction')
        .post(controller.retryTransactionHandle);
}