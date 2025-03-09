import Link from 'next/link'

export const Footer = () => {
    return (
        <div className="flex h-20 w-full flex-col items-center justify-center border-t border-gray-200 bg-white">
            <h1 className="font-inter text-xs text-gray-600 md:text-sm">
                Copyright © {new Date().getFullYear()} - CodeCodeCoders. Tous
                droits réservés.
            </h1>

            <p className="font-inter text-xs text-gray-600 md:text-sm">
                Hébergé par{' '}
                <Link
                    href="https://www.netlify.com/"
                    target="_blank"
                    className="no-effect font-inter text-xs text-gray-600 underline md:text-sm"
                >
                    Netlify
                </Link>{' '}
                - 512 2nd Street, Suite 200 San Francisco, CA 94107
            </p>
        </div>
    )
}
