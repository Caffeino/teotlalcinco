import { getInitials } from '../../utils/helper';

const CharAvatar = ({
	name,
	width,
	height,
	style
}: {
	name: string;
	width: string;
	height: string;
	style?: string;
}) => {
	return (
		<div
			className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full`}
		>
			{getInitials(name || 'NA')}
		</div>
	);
};

export default CharAvatar;
