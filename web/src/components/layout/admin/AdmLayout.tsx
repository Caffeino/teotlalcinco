import { Outlet } from 'react-router-dom';
import AdmNavbar from './AdmNavbar';

const AdmLayout = () => {
	return (
		<>
			<AdmNavbar />
			<Outlet />
		</>
	);
};

export default AdmLayout;
