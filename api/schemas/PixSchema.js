var Validator = require('jsonschema').Validator;
const { cpf } = require('cpf-cnpj-validator');
var email = require('email-validator');

class PixSchema {
  constructor() {
    Validator.prototype.customFormats.pixKey = (pix) => {
      // If pix.keyType is undefined return false (schema error)
      if (pix.keyType === undefined)
        return false;
        
      //  Validate Key Mask
      if (pix.keyType._id == 1) {
        // CPF
        return cpf.isValid(pix.key);
      } else if (pix.keyType._id == 2) {
        // EMAIL
        return email.validate(pix.key)
      } else if (pix.keyType._id == 3) {
        // PHONE NUMBER
      }

      return false;
    };

    this.schema = {
      "id": "/api/pix",
      "type": "object",
      "format": "pixKey",
      "message": "Please verify Pix Key",
      "properties": {
        "keyType": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "integer"
            },
            "value": {
              "type": "string"
            }
          },
          "required": [
            "_id"
          ]
        },
        "key": {
          "type": "string"
        }
      },
      "required": [
        "keyType",
        "key"
      ]
    };
  }
}

module.exports = PixSchema;