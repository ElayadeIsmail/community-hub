const FieldErrors = ({
	errors,
	id,
}: {
	errors?: Array<string>;
	id?: string;
}) => {
	if (!errors?.length) return null;
	return <span id={id}>{errors.join(' , ')}</span>;
};

export default FieldErrors;
