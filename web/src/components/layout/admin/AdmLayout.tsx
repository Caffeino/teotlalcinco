import type { ReactNode } from 'react';
import AdmNavbar from './AdmNavbar';
import AdmSidebar from './AdmSidebar';

const AdmLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<AdmNavbar />
			{children}
			<AdmSidebar />
		</>
	);
};

export default AdmLayout;
