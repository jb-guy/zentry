import { useRef, useState } from "react";

type Props = {
    children:React.ReactNode;
    className?:string;
    restAngles?:[number, number];
    reverse?:boolean;
    factor?:number;
    scale?:number;
    perspective?:number;
}
const TiltEffect = ({children, className = '', restAngles=[0,0], factor=10, scale=1, perspective=700, reverse=false}: Props) => {

    const [style, setStyle] = useState({zIndex:0, transform:`perspective(700px) rotateX(${restAngles[0]}deg) rotateY(${restAngles[1]}deg) scale(1)`})
    const itemRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent) => {
        if(!itemRef.current) return;

        const rect = itemRef.current.getBoundingClientRect();

        const x = (e.clientX - rect.left)/rect.width;
        const y = (e.clientY - rect.top)/rect.height;

        const tiltX = (y-0.5) * (reverse ? -factor: factor) + restAngles[0]; // Adjust the multiplier for more/less tilt
        const tiltY = (x-0.5) * (reverse ? factor: -factor) + restAngles[1]; // Adjust the multiplier for more/less tilt

        setStyle({zIndex:10 ,transform:`perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`});
    }

    const handleMouseLeave = () => {
        setStyle({zIndex:0, transform:`perspective(${perspective}px) rotateX(${restAngles[0]}deg) rotateY(${restAngles[1]}deg) scale(1)`});
    }

  return (
    <div className={`transition-transform duration-300 ease-out ${className}`} ref={itemRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
    >
        {children}
    </div>
  )
}
export default TiltEffect