import { useEffect } from 'react';
import type { PageWrapperProps } from '../../../types';

const PageWrapper = ({ state, children }: PageWrapperProps) => {
	useEffect(() => {
		if (!state) return;

		console.log('page state:', state);
	}, [state]);

	return <>{children}</>;
};

export default PageWrapper;
