// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
*/

/**
* @type {FunctionRunResult}
*/

// The configured entrypoint for the 'purchase.product-discount.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  // Flatten the array of arrays to get all the handles
  const deliveryGroupHandles = input.cart.deliveryGroups.flatMap(group => group.deliveryOptions.map(option => option.handle));

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    discounts: [
      {
        // Apply the discount to the collected targets
        targets: deliveryGroupHandles.map(optionHandle => ({ deliveryOption: { handle: optionHandle } })),
        // Define a percentage-based discount
        value: {
          percentage: {
            value: "10.0"
          }
        }
      }
    ]
  };
};