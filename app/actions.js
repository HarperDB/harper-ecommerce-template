'use server';
// import { tables } from 'harperdb';
// const { Product } = tables;
import { initAlgolia, initOpenai } from '../lib/utils';

let productdata = [
	{
    "id": "11",
    "name": "Portable Laptop Stand",
    "category": "Accessories",
    "price": 39.99,
    "image": "https://images.unsplash.com/photo-1623251606108-512c7c4a3507?auto=format&fit=crop&q=80&w=800",
    "description": "Compact laptop stand with adjustable height",
    "features": [
      "Ergonomic design",
      "Adjustable height",
      "Lightweight and portable",
      "Non-slip surface",
      "Aluminum construction"
    ],
    "specs": {
      "Material": "Aluminum",
      "Weight": "1.2 lbs",
      "Dimensions": "10\" x 9\" x 2\"",
      "Warranty": "1 year"
    }
	}
];
export async function listProducts() {
	return productdata;
}

export async function getProduct(id) {
	return productdata.find(data => data.id === id);
}

// Harper DB Server Actions
// export async function listProducts(conditions = {}) {
// 	const products = [];
//   const results = Product.search(conditions);
// 	for await (const product of results) {
// 		products.push(product);
// 	}
// 	return products;
// }

// export async function getProduct(id) {
// 	return tables.Product.get(id);
// }

// export async function getUserTraits(id = "1") {
// 	return tables.Traits.get(id).traits;
// }

// export async function updateUserTraits(id = "1", traits) {
// 	await tables.Traits.put({ id, traits });
// 	return 'successfully updated Traits table';
// }

// OpenAI Server Actions
const openaiClient = initOpenai();
export async function customizeProductDescription(userTraits = [], productDescription) {
	if (openaiClient) {
		const prompt = `Given that a person has the following traits: ${userTraits.join(', ')} 
			can you rewrite the following product description passage for someone like this: ${productDescription} without using exclamation points?
			Only return the product description, no other text.
			Keep the description to a 300 character length maximum.
		`;
		const response = await openaiClient.chat.completions.create({
			messages: [{ role: 'user', content: prompt }],
			model: 'gpt-4o-mini',
		});
		return response.choices[0].message.content;		
	}
	return null;
}

// Algolia Search Server Actions
const algoliaClient = initAlgolia();
export async function searchProducts(searchTerm = ''){
	if (algoliaClient) {
		return await algoliaClient.searchSingleIndex({
			indexName: 'productdata',
			searchParams: { query: searchTerm },
		});		
	}
	// TODO: return harperdb graphql query
	return [];
}
