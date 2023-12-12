import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

const FormError = ({ error }: { error?: string | null }) => {
	if (!error) return null;
	return (
		<Alert variant='destructive'>
			<AlertCircle className='h-4 w-4' />
			<AlertDescription>{error}</AlertDescription>
		</Alert>
	);
};

export default FormError;
