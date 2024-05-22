# Variance Determinator For Tailwind Classes

This is a utility class that can help Tailwind CSS users to create multiple variants of styles in order to make reusable components

## How to use:

### Step 0: Install the "tailwind-merge" package from package manager such as npm

### Step 1: Create a new variance, usually in it's own file

```js
const buttonVariance = new Variance("flex justify-between", {
  size: {
    default: "h-2 w-2 bg-red-400",
    sm: "h-0 w-0 bg-red-100",
    lg: "h-4 w-4 bg-red-500",
  },
  height: {
    default: "h-8",
    short: "h-1",
  },
});
```
<a href="#documentation">You can take a much closer look at the syntax / template here</a>

### Step 2: Import the variant from that file and use it

Example of usage in a React component:

```js
<button className={buttonVariance.getVariant({ height: "short" })}>
  Click me pls!
</button>
```

Based on this example, the button's className value would be: `"flex justify-between h-2 w-2 bg-red-400 h-1"`. However, because of tailwind-merge, the conflict between `h-2` and `h-1` would be resolved, and the actual string result would be: `"flex justify-between w-2 bg-red-400 h-1"`, since `h-1` is assumed to override the value of `h-2`.

As you can see, the result includes `flex justify-between` from the first parameter, which is always included in the result. It also has `h-2 w-2 bg-red-400`. This is because we didn't specify the variant for the variant type 'size', so it takes the default property value for the variant type 'size'. Finally, the `h-1` comes from the 'height' variant type with the variant 'tall', since we specified `height: "tall"` in the argument.

# Documentation

## Syntax for Variance Creation
<a name="documentation"></a>
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

**If you find this helpful, thanks.**
