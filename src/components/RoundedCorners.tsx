type Props = {
    children?:React.ReactNode;
    className?:string;
    id?:string;
};
const RoundedCorners = ({children, className ='', id=''}: Props) => {
	return (
        <div
            id = {id} 
            className={`relative md:h-dvh size-full filter-[url(#flt_tag)] ${className}`}>
                {children}
            <svg
                className="invisible absolute size-0"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="flt_tag">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="8"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="flt_tag"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="flt_tag"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
	);
};
export default RoundedCorners;
