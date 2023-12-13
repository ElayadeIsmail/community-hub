const colors = [
	'bg-background',
	'bg-foreground',
	'bg-card',
	'bg-card-foreground',
	'bg-popover',
	'bg-popover-foreground',
	'bg-primary',
	'bg-primary-foreground',
	'bg-secondary',
	'bg-secondary-foreground',
	'bg-muted',
	'bg-muted-foreground',
	'bg-accent',
	'bg-accent-foreground',
	'bg-destructive',
	'bg-destructive-foreground',
	'bg-border',
	'bg-input',
	'bg-ring',
];

const page = () => {
	const renderedColors = colors.map((bgColor) => {
		return (
			<div className='flex space-x-2' key={bgColor}>
				<div className={`w-8 h-8 rounded-full ${bgColor}`} />
				<span>{bgColor}</span>
			</div>
		);
	});
	return <div className='flex gap-4 flex-wrap'>{renderedColors}</div>;
};

export default page;
