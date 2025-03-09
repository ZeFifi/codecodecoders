export const Hero = () => {
    return (
        <div className="py-8 text-center font-semibold md:mb-12">
            <h1 className="mb-6 font-robotoCondensed text-3xl md:text-5xl">
                Le développement web accessible{' '}
                <span className="relative inline-block -rotate-1">
                    <span className="absolute inset-x-0 bottom-0 h-3 -skew-x-6 bg-blue-300/60" />
                    à tous
                </span>
            </h1>
            <p className="font-inter">
                Le développement web est un domaine complexe, mais il est
                accessible à tous.
                <br />
                Apprenez, mais surtout progressez avec des articles concis,
                clairs et en français !
            </p>
        </div>
    )
}
