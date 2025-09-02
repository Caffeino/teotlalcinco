import type { ReactNode } from 'react';
import Navbar from './Navbar';

type Props = {
	children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default MainLayout;
