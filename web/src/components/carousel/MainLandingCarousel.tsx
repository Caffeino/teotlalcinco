import { ChevronLeft, ChevronRight, CircleArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import CAROUSEL_1 from '../../assets/gemini-1.png';
import CAROUSEL_2 from '../../assets/gemini-2.png';
import CAROUSEL_3 from '../../assets/gemini-3.png';
import CAROUSEL_4 from '../../assets/gemini-4.png';
import CAROUSEL_5 from '../../assets/gemini-5.png';

interface TemporalBannersType {
	id: number;
	img: string;
	name?: string;
	description?: string;
}

const TEMPORAL_BANNERS: TemporalBannersType[] = [
	{
		id: 1,
		img: CAROUSEL_1,
		name: 'Banner Title 1',
		description: 'This is an example description text for banner #1.'
	},
	{
		id: 2,
		img: CAROUSEL_2,
		name: 'Banner Title 2',
		description: 'This is an example description text for banner #2.'
	},
	{
		id: 3,
		img: CAROUSEL_3,
		name: 'Banner Title 3',
		description: 'This is an example description text for banner #3.'
	},
	{
		id: 4,
		img: CAROUSEL_4,
		name: 'Banner Title 4',
		description: 'This is an example description text for banner #4.'
	},
	{
		id: 5,
		img: CAROUSEL_5,
		name: 'Banner Title 5',
		description: 'This is an example description text for banner #5.'
	}
];

const MainLandingCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () =>
		setCurrentSlide(prev => (prev + 1) % TEMPORAL_BANNERS.length);

	const prevSlide = () =>
		setCurrentSlide(
			prev => (prev - 1 + TEMPORAL_BANNERS.length) % TEMPORAL_BANNERS.length
		);

	useEffect(() => {
		const timer = setInterval(nextSlide, 5000);
		return () => clearInterval(timer);
	}, [currentSlide]);

	return (
		<div className='relative overflow-hidden rounded-lg'>
			{/* Carousel wrapper */}
			<div
				className='flex transition-transform duration-500 ease-out'
				style={{ transform: `translateX(-${currentSlide * 100}%)` }}
			>
				{TEMPORAL_BANNERS.map(banner => (
					<div key={banner.id} className='w-full flex-shrink-0'>
						<div className='relative h-56 md:h-96'>
							<img
								src={banner.img}
								alt={banner.name}
								className='w-full h-full object-cover'
							/>
							<div className='w-full absolute bg-linear-to-t from-black/60 to-sky-950/65 flex items-center justify-center bottom-0'>
								<div className='grid grid-cols-3 w-md text-center'>
									<div className='col-span-4 flex items-center justify-center h-10'>
										<button className='flex items-center gap-2 justify-between text-white bg-linear-to-r from-sky-500 to-sky-600 hover:bg-linear-to-r hover:from-sky-500 hover:to-fuchsia-400 rounded-full text-sm px-4 py-4 h-8 cursor-pointer'>
											Ir
											<CircleArrowRight size={20} />
										</button>
									</div>
									<div className='col-span-4 col-start-1 text-white'>
										<p className='text-md md:text-md font-semibold'>
											{banner.name}
										</p>
										<small className='text-sm md:text-sm font-normal'>
											{banner.description}
										</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			{/* Slider indicators */}
			<div className='z-30 absolute bottom-4 left-0 right-0 p-4'>
				<div className='flex items-center justify-start gap-2'>
					{TEMPORAL_BANNERS.map((_, i) => (
						<button
							key={i}
							className={`w-6 h-1 cursor-pointer rounded-xs transition delay-[10ms] duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-150 hover:bg-sky-500/55 ${currentSlide === i ? 'bg-sky-500 scale-110' : 'bg-white'}`}
							onClick={() => setCurrentSlide(i)}
						/>
					))}
				</div>
			</div>
			{/* Slider controls */}
			<button
				type='button'
				className='z-10 absolute top-0 start-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
				onClick={prevSlide}
			>
				<span className='inline-flex items-center justify-center w-18 h-18 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
					<ChevronLeft size={36} />
					<span className='sr-only'>Previous</span>
				</span>
			</button>
			<button
				type='button'
				className='z-10 absolute top-0 end-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
				onClick={nextSlide}
			>
				<span className='inline-flex items-center justify-center w-18 h-18 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
					<ChevronRight size={36} />
					<span className='sr-only'>Next</span>
				</span>
			</button>
		</div>
	);
};

export default MainLandingCarousel;
