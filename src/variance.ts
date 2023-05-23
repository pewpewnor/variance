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
					`Error: chosen variant type "${chosenVariantType}" does not exist. File: variance.ts, Line: 31`
				);
			}
		}

		const result = [
			this.always,
			...Object.keys(this.createdVariants).map((variantType) => {
				const variant = this.createdVariants[variantType];
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
				return variant.default;
			}),
		];

		return twMerge(result.join(" "));
	}
}
