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
    // Throw error if any of the chosen variant type does not exist in created variants

    Object.keys(chosenVariants).forEach((chosenVariantType) => {
      if (!Object.hasOwn(this.createdVariants, chosenVariantType)) {
        throw new Error(
          `Chosen variant type "${chosenVariantType}" does not exist!`
        );
      }
    });

    const result = [
      this.always,
      // Loop for each created variants

      ...Object.entries(this.createdVariants).map(([variantType, variant]) => {
        // If user specify this variant type

        if (Object.hasOwn(chosenVariants, variantType)) {
          const chosenVariantKey = chosenVariants[variantType];
          if (Object.hasOwn(variant, chosenVariantKey)) {
            return variant[chosenVariantKey];
          } else {
            throw new Error(
              `Chosen variant "${chosenVariantKey}" does not exist in variant type "${variantType}"!`
            );
          }
        }
        // If user did not specify this variant type, use the default property value

        return variant.default;
      }),
    ];

    return twMerge(result.join(" "));
  }
}
