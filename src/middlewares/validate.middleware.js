const { z } = require('zod');

// const signupSchema = z.object({
//     body: z.object({
//         name: z.string().trim().min(1, 'Name is required'),
//         email: z.string().email('Invalid email format'),
//         password: z.string().min(6, 'Password must be at least 6 characters'),
//     }),
// });

// const loginSchema = z.object({
   
//         email: z.string().email('Invalid email format'),
//         password: z.string().min(1, 'Password is required'),
//     });

const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    name: z.string().min(1, { message: 'Name is required' }),
  
    role: z.enum(['member', 'admin']).optional()
})



module.exports = { userSchema};