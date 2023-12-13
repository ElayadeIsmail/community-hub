const Spinner = () => {
	return (
		<div className='w-full py-4 px-3 flex justify-center'>
			<div
				role='progressbar'
				aria-label='Loading...'
				aria-valuemax={1}
				aria-valuemin={0}
				aria-valuenow={0}
				className='w-6 h-6 animate-spin'>
				<svg height='100%' viewBox='0 0 32 32' width='100%'>
					<circle
						cx='16'
						cy='16'
						fill='none'
						r='14'
						strokeWidth='4'
						style={{
							stroke: 'rgb(29, 155, 240)',
							opacity: 0.2,
						}}></circle>
					<circle
						cx='16'
						cy='16'
						fill='none'
						r='14'
						strokeWidth='4'
						style={{
							stroke: 'rgb(29, 155, 240)',
							strokeDasharray: 80,
							strokeDashoffset: 60,
						}}></circle>
				</svg>
			</div>
		</div>
	);
};

export { Spinner };
