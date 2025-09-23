import type { ReactNode } from 'react';
import AdmNavbar from './AdmNavbar';

const AdmLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<AdmNavbar />
			{children}
		</>
	);
};

export default AdmLayout;
