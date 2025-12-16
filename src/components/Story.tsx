import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import TiltEffect from "./TiltEffect";
import Button from "./Button";


type Props = {};
const Story = (props: Props) => {

	return (
		<section id="story" className="min-h-dvh w-screen overflow-hidden bg-black text-blue-50">
			<div className="flex size-full flex-col items-center py-10 pb-24 ">
				<p className="font-general text-sm uppercase md:text-[10px]">
					The multiversal ip world
				</p>
				<div className="relative size-full">
					<AnimatedTitle
						title="The St<b>o</b>ry of <br/> a hidden real<b>m</b>"
						containerClass="mt-5 pointer-events-none mix-blend-difference relative z-15"
					/>
                    <div className="story-img-container">
                        <RoundedCorners className="relative">
                            <TiltEffect restAngles={[0,20]} className="transform-3d story-img-mask">
                                        <TiltEffect restAngles={[0,0]} factor={30} scale={1.2} reverse className="h-full w-full">
                                                <img
                                                    src="/img/entrance.webp"
                                                    alt="Entrance"
                                                    className="object-cover object-center size-full scale-200"
                                                />
                                        </TiltEffect>
                            </TiltEffect>
                        </RoundedCorners>
                    </div>
				</div>
                <div className="-mt-90 flex w-full justify-center md:-mt-80 md:me-44 md:justify-end">
                    <div className="flex h-full w-fit flex-col items-center md:items-start backdrop-blur-xl mask-y-from-80% mask-x-from-90% pointer-events-none p-10 ">
                        <p className="z-20 max-w-sm text-centerfont-circular-web text-violet-50 md:text-start ">
                            Where realms converge, lies Zentry and the boundless pillar.
                            Discover its secrets and shape your fate amidst infinite
                            opportunities.
                        </p>
                        <Button id="realm-button" title="discover prologue" containerClass="mt-5"/>
                    </div>
                </div>
			</div>
		</section>
	);
};
export default Story;
