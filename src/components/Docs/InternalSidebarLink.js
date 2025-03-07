import { useActions } from 'kea'
import { scrollspyCaptureLogic } from 'logic/scrollspyCaptureLogic'
import React from 'react'
import { Link } from 'react-scroll'

export default function InternalSidebarLink({ url, name, depth, className = '', style = {} }) {
    const key = typeof window !== 'undefined' ? window.location.pathname : 'gatsby-ssr-context'
    const { reportScrollUpdated } = useActions(scrollspyCaptureLogic({ key }))
    return (
        <span className="block" style={{ marginLeft: `${depth / 1.5}rem` }}>
            <Link
                style={style}
                offset={-50}
                smooth
                duration={300}
                to={url}
                hashSpy
                className={`text-almost-black leading-tight hover:text-orange dark:text-white dark:hover:text-orange cursor-pointer ${className}`}
                spy
                onSetActive={() => {
                    reportScrollUpdated(url)
                }}
            >
                {name}
            </Link>
        </span>
    )
}
