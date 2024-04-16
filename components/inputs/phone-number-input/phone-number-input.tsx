"use client";

import { getMaskedInput } from "@/lib/utils";

export default getMaskedInput({
	mask: "(##) #####-####",
	definitions: {
		"#": /[0-9]/,
	},
	unmask: true,
});
