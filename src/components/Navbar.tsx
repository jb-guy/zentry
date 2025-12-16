import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
    const navContainerRef = useRef<HTMLDivElement>(null);
    const navItems = ['Nexus','Vault','Prologue','About','Contact'];
    const audioElementRef = useRef<HTMLAudioElement>(null);

    const { y: scrollY } = useWindowScroll();
    const [prevY, setPrevY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)

    useEffect(() => {
        if(scrollY == 0) {
            setIsNavVisible(true);
            navContainerRef.current?.classList.remove('floating-nav');
            return;
        }
        if(scrollY > prevY){
            // Scrolling down
            setIsNavVisible(false);
            navContainerRef.current?.classList.add('floating-nav');
        } else {
            // Scrolling up
            setIsNavVisible(true);
            navContainerRef.current?.classList.add('floating-nav');
        }
        setPrevY(scrollY);
    }, [scrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
    }

    useEffect(() => {
        if(isAudioPlaying){
            audioElementRef.current?.play();
        } else {
            audioElementRef.current?.pause();
        }
    }, [isAudioPlaying]);

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none rounded-lg transition-all duration-700 sm:inset-x-6">
        <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
                <div className="flex items-center gap-7">
                    <img src="/img/logo.png" alt="logo" className="w-10" />
                    <Button id="product-button" title="Products" rightIcon={<TiLocationArrow/>} containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"/>
                </div>

                <div className="flex h-full items-center">
                    <div className="hidden md:block">
                        {navItems.map((item, index) => (
                            <a 
                                key={index}
                                href={`#${item.toLowerCase()}`}
                                className="nav-hover-btn"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="ml-10 flex items-center justify-center space-x-1 size-7 border rounded-full border-violet-50/50 hover:border-violet-50" onClick={toggleAudioIndicator}>
                        <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />

                        {[1,2,3,4].map((bar) => (
                            <div 
                                key={bar} 
                                className={`indicator-line ${isAudioPlaying ? 'active' : ''}`}
                                style={{animationDelay:`${bar*0.1}s`}}
                                />
                        ))}
                    </button>
                </div>
            </nav>
        </header>
    </div>
  )
}
export default Navbar