type Props = {
    src:string;
    title:React.ReactNode;
    description:string;
    isComingSoon?:boolean;
}
const BentoCard = ({src,title,description,isComingSoon}: Props) => {
  return (
    <div className="relative size-full">
        <video src={src} loop muted autoPlay className="absolute left-0 top-0 size-full object-cover object-center"/>
        <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50 ">
            <div>
                <h1 className="bento-title special-font">{title}</h1>
                <p className="mt-3 max-w-64 text-sm md:text-base">{description}</p>
            </div>
            {isComingSoon && (
                <div className="bg-black/50 inline-block rounded-full px-4 py-2 font-general text-xs uppercase tracking-widest">
                    Coming Soon
                </div>
            )}

        </div>
    </div>
  )
}
export default BentoCard