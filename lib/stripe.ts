import Stripe from 'stripe'; // Import the Stripe library

// Create a new instance of the Stripe object using the provided API key
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
	apiVersion: '2023-08-16', // Set the desired API version
	typescript: true, // Enable TypeScript support
});


