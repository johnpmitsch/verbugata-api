"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVerbDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_verb_dto_1 = require("./create-verb.dto");
class UpdateVerbDto extends (0, mapped_types_1.PartialType)(create_verb_dto_1.CreateVerbDto) {
}
exports.UpdateVerbDto = UpdateVerbDto;
//# sourceMappingURL=update-verb.dto.js.map