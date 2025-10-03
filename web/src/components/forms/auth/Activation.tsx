import REGISTER_LOGO from '../../../assets/register-logo.svg';
import AccountActivated from '../../alerts/AccountActivated';
import ExpiredToken from '../../alerts/ExpiredToken';
import PendingActivation from '../../alerts/PendingActivation';

const Activation = ({
	email,
	responseCode
}: {
	email?: string;
	responseCode?: number;
}) => {
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
			{responseCode === 0 && <PendingActivation email={email} />}
		</div>
	);
};

export default Activation;
