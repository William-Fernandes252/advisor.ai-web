import validator from "validator";
import { object, string } from "zod";

export const signInSchema = object({
	email: string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email"),
	password: string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(128, "Password must be less than 32 characters"),
});

export const signUpSchema = signInSchema.extend({
	name: string({ required_error: "Name is required" })
		.min(1, "Name is required")
		.max(128, "Name must be less than 128 characters"),
	phone_number: string({ required_error: "Phone number is required" })
		.min(1, "Phone number is required")
		.max(16, "Phone number must be less than 16 characters")
		.refine(validator.isMobilePhone),
});
