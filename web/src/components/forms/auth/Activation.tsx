import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import REGISTER_LOGO from '../../../assets/register-logo.svg';
import { activateAccount } from '../../../lib/api/auth';
import AccountActivated from '../../alerts/AccountActivated';
import ConfirmActivation from '../../alerts/ConfirmActivation';
import ExpiredToken from '../../alerts/ExpiredToken';
import PendingActivation from '../../alerts/PendingActivation';

const Activation = ({ email }: { email?: string }) => {
	const [responseCode, setResponseCode] = useState(0);

	const location = useLocation();
	const { token = '' } = useParams();

	const handleActivation = async () => {
		try {
			const code = await activateAccount(token);
			setResponseCode(code);
		} catch (error) {
			console.log(error);
		}
	};

	const loginEmail = location.state?.email;
	const fromLogin = loginEmail ? true : false;
	const recipient = fromLogin ? loginEmail : (email ?? null);

	return (
		<div className='max-w-lg'>
			<div className='p-8'>
				<img
					className='rounded-t-lg'
					src={REGISTER_LOGO}
					alt='account confirmation'
				/>
			</div>
			{responseCode === 204 && <AccountActivated />}
			{responseCode === 404 && <ExpiredToken />}
			{responseCode === 0 && token && token !== 'verify' && (
				<ConfirmActivation token={token} handleActivation={handleActivation} />
			)}
			{recipient && (
				<PendingActivation fromLogin={fromLogin} recipient={recipient} />
			)}
		</div>
	);
};

export default Activation;
