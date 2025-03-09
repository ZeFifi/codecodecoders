import Link from 'next/link'

const variants = {
    'soft-skills': 'bg-blue-100 text-blue-800 border-blue-100',
    frontend: 'bg-purple-100 text-purple-800 border-purple-100',
    backend: 'bg-green-100 text-green-800 border-green-100',
    devops: 'bg-orange-100 text-orange-800 border-orange-100',
    database: 'bg-yellow-100 text-yellow-800 border-yellow-100',
}

type BadgeProps = {
    children: React.ReactNode
    category: keyof typeof variants
    className?: string
    noLink?: boolean
}

export const Badge = ({
    children,
    category,
    className,
    noLink = false,
}: BadgeProps) => {
    const badge = (
        <div
            className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${variants[category]} ${className} ${!noLink && 'cursor-pointer hover:opacity-80'} `}
        >
            {children}
        </div>
    )

    if (noLink) return badge

    return (
        <Link href={`/categories/${category}`} className="no-effect">
            {badge}
        </Link>
    )
}
