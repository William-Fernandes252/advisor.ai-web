import { forwardRef } from "react";
import {
	IMaskInput,
	type IMaskMixinProps,
	type ReactMaskProps,
} from "react-imask";

type MaskedInputRefProps = {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
} & Omit<ReactMaskProps<HTMLInputElement>, "definitions" | "mask">;

export function getMaskedInput({
	mask,
	unmask,
	definitions,
}: Pick<IMaskMixinProps<HTMLInputElement>, "mask" | "unmask"> & {
	definitions: Record<string, unknown>;
}) {
	return forwardRef<HTMLInputElement, MaskedInputRefProps>((props, ref) => {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask={mask}
				// @ts-ignore
				definitions={definitions}
				unmask={unmask}
				inputRef={ref}
				onAccept={(value: string) =>
					onChange({ target: { name: props.name, value } })
				}
				overwrite
			/>
		);
	});
}
