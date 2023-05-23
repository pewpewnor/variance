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

		const chosenVariantKeys = Object.keys(chosenVariants);
		for (const chosenVariantType of chosenVariantKeys) {
			if (!(chosenVariantType in this.createdVariants)) {
				throw new Error(
					`Error: chosen variant type "${chosenVariantType}" does not exist. File: variance.ts, Line: 31`
				);
			}
		}

		const result = [
			this.always,
			// Loop for each created variants

			...Object.keys(this.createdVariants).map((variantType) => {
				const variant = this.createdVariants[variantType];
				// If user specify this variant type

				if (variantType in chosenVariants) {
					const chosenVariantKey = chosenVariants[variantType];
					if (chosenVariantKey in variant) {
						return variant[chosenVariantKey];
					} else {
						throw new Error(
							`Error: chosen variant key "${chosenVariantKey}" does not exist in variant type "${variantType}". File: variance.ts, Line: 50`
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

// Creation process syntax:

/*
	const always = "class name"

	const variant1 = {
		default: "class name"
		variantKey1: "class name"
		variantKey2: "class name"
	}

	const variant2 = {
		default: "class name"
		variantKey1: "class name"
		variantKey2: "class name"
	}

	const createdVariants = {
		variantType1: variant1
		variantType2: variant2
	}

	const variance = new Variance(always, createdVariants);
*/

// Usage process syntax:

/*
	const chosenVariants = {
		chosenVariantType1: chosenVariantKey
	}

	const result = variance.getVariant({
		chosenVariants
	});
*/
