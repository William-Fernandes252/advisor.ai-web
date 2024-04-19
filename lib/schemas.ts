import validator from "validator";
import { z } from "zod";

export const signInSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
			description: "User email",
		})
		.min(1, "Email is required")
		.email("Invalid email"),
	password: z.string({
		required_error: "Password is required",
		description: "User password",
	}),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema
	.extend({
		name: z
			.string({
				required_error: "Name is required",
				description: "Name of the user",
			})
			.min(1, "Name is required")
			.max(128, "Name must be less than 128 characters"),
		phone_number: z
			.string({
				required_error: "Phone number is required",
				description: "User phone number",
			})
			.min(1, "Phone number is required")
			.refine(validator.isMobilePhone, "Phone number is invalid"),
		password: z
			.string({
				required_error: "Password is required",
				description: "User password",
			})
			.min(8, "Password must be more than 8 characters")
			.max(128, "Password must be less than 32 characters")
			.superRefine((value, context) => {
				const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
				const containsLowercase = (ch: string) => /[a-z]/.test(ch);
				const containsSpecialChar = (ch: string) =>
					/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

				let countOfUpperCase = 0;
				let countOfLowerCase = 0;
				let countOfNumbers = 0;
				let countOfSpecialChar = 0;
				for (let i = 0; i < value.length; i++) {
					const ch = value.charAt(i);
					if (!Number.isNaN(+ch)) countOfNumbers++;
					else if (containsUppercase(ch)) countOfUpperCase++;
					else if (containsLowercase(ch)) countOfLowerCase++;
					else if (containsSpecialChar(ch)) countOfSpecialChar++;
				}

				if (countOfUpperCase < 1) {
					context.addIssue({
						message: "Password must contain at least one uppercase letter.",
						code: "custom",
					});
				} else if (countOfLowerCase < 1) {
					context.addIssue({
						message: "Password must contain at least one lowercase letter.",
						code: "custom",
					});
				} else if (countOfNumbers < 1) {
					context.addIssue({
						message: "Password must contain at least one number.",
						code: "custom",
					});
				} else if (countOfSpecialChar < 1) {
					context.addIssue({
						message: "Password must contain at least one special character.",
						code: "custom",
					});
				}
			}),
		confirmPassword: z.string({
			required_error: "Password confirmation is required",
			description: "User password confirmation",
		}),
	})
	.superRefine(({ password, confirmPassword }, context) => {
		if (password !== confirmPassword) {
			context.addIssue({
				message: "Passwords do not match",
				code: "custom",
			});
		}
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const reviewCreateSchema = z.object({
	value: z
		.number({
			required_error: "Value is required",
			description: "Review value",
		})
		.min(1, "Value is required")
		.max(5, "Value must be less than 5"),
	comment: z.string({
		description: "Review comment",
	}),
});

export type ReviewCreateSchema = z.infer<typeof reviewCreateSchema>;
