const { z } = require('zod');

const addInventorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Ingredient name is required'),
    category: z.string().optional(),
    quantity: z.number().min(0, 'Quantity cannot be negative').optional(),
    unit: z.string().optional(),
    location: z.enum(['fridge', 'pantry', 'freezer']).optional(),
    expiryDate: z.string().optional(),
    notes: z.string().optional(),
  }),
});

module.exports = {
  addInventorySchema,
};
