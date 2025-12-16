import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [previousIndex, setPreviousIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);

	const totalVideos = 4; // Total number of videos to load
	const currentVideoRef = useRef<HTMLVideoElement>(null);
	const previousVideoRef = useRef<HTMLVideoElement>(null);

	const handleMiniVideoClick = () => {
		setHasClicked(true);
		setCurrentIndex(upcomingVideoIndex);
	};

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
    const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
        //console.log(loadedVideos)
    }

    useEffect(() => {
      if(loadedVideos >= upcomingVideoIndex){
        setIsLoading(false);
      }
    
    }, [loadedVideos])
    

    useGSAP(() => {
        if(hasClicked){
            gsap.set('#next-video', {visibility: 'visible'});

            gsap.to('#next-video',{
                transformOrigin: 'center center',
                scale:1,
                height:"100%",
                width:"100%",
                duration:1,
                ease: "power1.inOut",
                onStart: () => { currentVideoRef.current?.play() },
                onComplete: () => {
                    setPreviousIndex(currentIndex);

                    const setCurrentTime = () => {
                        previousVideoRef.current!.currentTime = 1;
                        previousVideoRef.current!.removeEventListener('canplay', setCurrentTime);
                    }
                    previousVideoRef.current!.addEventListener('canplay', setCurrentTime);
                }
            })

            gsap.from('#preview-video',{
                transformOrigin: 'center center',
                scale:0,
                duration:1.5,
                ease: "power1.inOut",
            })
        }
    }, {dependencies:[currentIndex], revertOnUpdate:true});

    useEffect(() => {
        gsap.set('#video-mask', {
            clipPath: "polygon(13% 3%, 62% 11%, 88% 90%, 0% 95%)",
        });
        gsap.from('#video-mask',{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-mask',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            },
        })
        gsap.set('#video-frame', {
            rotateX: "25deg",
            rotateY: "10deg",
            rotateZ: "-7deg",
        });
        gsap.from('#video-frame',{
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            },
        })
        gsap.to('.slide',{
            y:"100%",
            scrollTrigger: {
                trigger: '#video-mask',
                start: 'top top',
                end: 'bottom center',
                scrub: true,
            },
        })
    },[])

	return (
		<section className="relative h-dvh w-screen will-change-transform overflow-hidden perspective-normal transform-3d">
            {isLoading && (
                <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
            )}

			<div
                id="video-mask"
				className="relative z-10 h-dvh w-screen overflow-hidden perspective-near"
			>
				<div id="video-frame" className="relative size-full">
					<div className="mask-clip-path absolute-center absolute z-50 size-64 overflow-hiddenrounded-lg">
                        <div className="absolute-center size-6 border-2 border-blue-50 rounded-full origin-center">
                            <div className="absolute-center size-2 bg-blue-50 rounded-full origin-center"/>
                        </div>
						<div
							onClick={handleMiniVideoClick}
							className="origin-center cursor-pointer scale-5 opacity-0 transition-all duration-500 ease-in-out hover:scale-100 hover:opacity-100"
						>
							<video 
                                src={getVideoSrc(upcomingVideoIndex)} 
                                loop 
                                id="preview-video" 
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
						</div>
					</div>
                    <video 
                        ref={currentVideoRef} 
                        src={getVideoSrc(currentIndex)}
                        muted 
                        loop
                        id="next-video" 
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                    />
                    <video 
                        ref={previousVideoRef}
                        src={getVideoSrc(previousIndex)}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
				</div>
                <div className="absolute pointer-events-none flex flex-col h-full w-full top-0 pl-10 pr-5 pt-30 pb-5 left-0 ">
                    <h1 className="slide grow self-start special-font align-bottom hero-heading text-blue-100">redefi<b>n</b>e</h1>
                    <h1 className="special-font hero-heading text-end bottom-5 right-5 text-blue-100">G<b>a</b>ming</h1>
                </div>
                <div className="absolute top-0 left-0">
                    <div className='mt-48 md:mt-60 lg:mt-74 px-0 sm:px-10'>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the Metagame Layer <br/> Unleash the play Economy</p>
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="bg-yellow-300 flex-center gap-1" />
                    </div>
                </div>
			</div>
            <div className="absolute flex flex-col h-full w-full top-0 pl-10 pr-5 pt-30 pb-5 left-0 ">
                <h1 className="slide grow special-font align-bottom hero-heading text-black">redefi<b>n</b>e</h1>
                <h1 className="special-font hero-heading text-end bottom-5 right-5 text-black">G<b>a</b>ming</h1>
            </div>
		</section>
	);
};
export default Hero;
