import { useEffect, type ReactNode } from 'react';

interface AdmWrapperProps {
	state?: string;
	children: ReactNode;
}

const AdmWrapper = ({ state, children }: AdmWrapperProps) => {
	useEffect(() => {
		if (!state) return;
	}, [state]);

	return <>{children}</>;
};

export default AdmWrapper;
