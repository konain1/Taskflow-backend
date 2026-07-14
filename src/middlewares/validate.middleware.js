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
});

const projectSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters long" }),
    description: z.string().min(3, { message: "Description must be at least 3 characters long" }),
});

const taskSchema = z.object({
    title: z.string().min(2, { message: "Task title must be at least 2 characters long" }),
    description: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'done']).optional(),
    assignee: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid assignee ID format" }).optional(),
    project: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid project ID format" }),
    dueDate: z.string().datetime({ message: "Invalid date format" }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format (YYYY-MM-DD)" }).optional()),
    priority: z.enum(['low', 'medium', 'high']).optional(),
});

const taskQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    status: z.enum(['todo', 'in-progress', 'done']).optional(),
    assignee: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid assignee ID format" }).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    search: z.string().optional(),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid startDate format (YYYY-MM-DD)" }).optional(),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid endDate format (YYYY-MM-DD)" }).optional(),
});

module.exports = { 
    userSchema,
    projectSchema,
    taskSchema,
    taskQuerySchema,
};