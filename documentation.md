## Syntax for Variance Creation

```js
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
```

## Syntax for Variance Usage

```js
const chosenVariants = {
	chosenVariantType1: chosenVariantKey,
};

const result = variance.getVariant(chosenVariants);
```
