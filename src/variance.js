"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var tailwind_merge_1 = require("tailwind-merge");
var Variance = /** @class */ (function () {
    function Variance(always, createdVariants) {
        this.always = always;
        this.createdVariants = createdVariants;
    }
    Variance.prototype.getVariant = function (chosenVariants) {
        var _this = this;
        var chosenVariantKeys = Object.keys(chosenVariants);
        for (var _i = 0, chosenVariantKeys_1 = chosenVariantKeys; _i < chosenVariantKeys_1.length; _i++) {
            var chosenVariantType = chosenVariantKeys_1[_i];
            if (!(chosenVariantType in this.createdVariants)) {
                throw new Error("Error: chosen variant type \"".concat(chosenVariantType, "\" does not exist. File: variance.ts, Line: 31"));
            }
        }
        var result = __spreadArray([
            this.always
        ], Object.keys(this.createdVariants).map(function (variantType) {
            var variant = _this.createdVariants[variantType];
            if (variantType in chosenVariants) {
                var chosenVariantKey = chosenVariants[variantType];
                if (chosenVariantKey in variant) {
                    return variant[chosenVariantKey];
                }
                else {
                    throw new Error("Error: chosen variant key \"".concat(chosenVariantKey, "\" does not exist in variant type \"").concat(variantType, "\". File: variance.ts, Line: 50"));
                }
            }
            return variant.default;
        }), true);
        return (0, tailwind_merge_1.twMerge)(result.join(" "));
    };
    return Variance;
}());
