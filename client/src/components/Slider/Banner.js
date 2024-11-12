import React, { useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from './Slider.module.css'
export default function SliderBanner() {
	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);
	const swiperRef = useRef(null);
	const timeInterval = useRef();
	const handlePrev = useCallback(() => {
		if (!swiperRef.current) return;
		swiperRef.current.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!swiperRef.current) return;
		swiperRef.current.slideNext();
	}, []);

	useEffect(() => {
		if (timeInterval.current) {
			clearInterval(timeInterval.current);
		}
		timeInterval.current = setInterval(() => {
			handleNext();
		}, 3000);
		return () => {
			timeInterval.current && clearInterval(timeInterval.current);
		};
	});
	return (
		<>
			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				loop={true}
				pagination={{
					clickable: true,
				}}
				navigation={{
					nextEl: navigationNextRef.current,
					prevEl: navigationPrevRef.current,
				}}
				modules={[Pagination, Navigation]}
				className={styles.swiper_container}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
					setTimeout(() => {
						if (swiper.navigation) {
							swiper.navigation.destroy();
							swiper.navigation.init();
							swiper.navigation.update();
						}
					});
				}}
			>
				{/* thay hinh anh o day */}
				<SwiperSlide >
						<div className={styles.swiper_slide}>
							<img src={`https://swiperjs.com/demos/images/nature-${1}.jpg`}
								alt="Welcome to the shop"
								className="object-cover"
							/>
						</div>
				</SwiperSlide>
				<SwiperSlide >
						<div className={styles.swiper_slide}>
							<img src={`https://swiperjs.com/demos/images/nature-${2}.jpg`}
								alt="Welcome to the shop"
								className="object-cover"
							/>
						</div>
				</SwiperSlide>
				<SwiperSlide >
						<div className={styles.swiper_slide}>
							<img src={`https://swiperjs.com/demos/images/nature-${3}.jpg`} 
								alt="Welcome to the shop"
								className="object-cover"
							/>
						</div>
				</SwiperSlide>
				
				<div
					ref={navigationPrevRef}
					onClick={handlePrev}
					className={`${styles.btn} ${styles["btn-prev"]}`}
				>
					{"<"}
				</div>
				<div
					ref={navigationNextRef}
					onClick={handleNext}
					className={`${styles.btn} ${styles["btn-next"]}`}
				>
					{">"}
				</div>
			</Swiper>
		</>
	);
};
