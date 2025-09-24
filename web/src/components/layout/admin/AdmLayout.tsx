import type { ReactNode } from 'react';
import AdmNavbar from './AdmNavbar';
import AdmSidebar from './AdmSidebar';

const AdmLayout = ({
	state,
	children
}: {
	state: string;
	children: ReactNode;
}) => {
	return (
		<>
			<AdmNavbar />
			{children}
			<AdmSidebar state={state} />
		</>
	);
};

export default AdmLayout;
