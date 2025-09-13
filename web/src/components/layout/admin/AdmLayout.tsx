import { useEffect, type ReactNode } from 'react';

interface AdmWrapperProps {
	state?: string;
	children: ReactNode;
}

const AdmLayout = ({ state, children }: AdmWrapperProps) => {
	useEffect(() => {
		if (!state) return;
	}, [state]);

	return <>{children}</>;
};

export default AdmLayout;
