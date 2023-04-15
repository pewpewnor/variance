import { twMerge } from "tailwind-merge";

interface Variant {
  default: string;
  [key: string]: string;
}

interface CreatedVariants {
  [key: string]: Variant;
}

interface ChosenVariants {
  [key: string]: string;
}

class Variance {
  private always: string;
  private createdVariants: CreatedVariants;

  constructor(always: string, createdVariants: CreatedVariants) {
    this.always = always;
    this.createdVariants = createdVariants;
  }

  public getVariant(chosenVariants: ChosenVariants) {
    const chosenVariantKeys = Object.keys(chosenVariants);
    for (const chosenVariantType of chosenVariantKeys) {
      if (!(chosenVariantType in this.createdVariants)) {
        throw new Error(
          `Chosen variant type "${chosenVariantType}" does not exist!`
        );
      }
    }

    const result = [
      this.always,
      ...Object.entries(this.createdVariants).map(([variantType, variant]) => {
        if (variantType in chosenVariants) {
          const chosenVariantKey = chosenVariants[variantType];
          if (chosenVariantKey in variant) {
            return variant[chosenVariantKey];
          } else {
            throw new Error(
              `Chosen variant "${chosenVariantKey}" does not exist in variant type "${variantType}"!`
            );
          }
        }
        return variant.default;
      }),
    ];

    return twMerge(result.join(" "));
  }
}
