const FieldErrors = ({
	errors,
	id,
}: {
	errors?: Array<string>;
	id?: string;
}) => {
	if (!errors?.length) return null;
	return (
		<span className='text-sm text-destructive mt-1' id={id}>
			{errors?.length > 0 ? errors[0] : <></>}
		</span>
	);
};

export default FieldErrors;
