import React from 'react'
import style from '@/styles/login/Wave.module.scss'

export default function Waves(): JSX.Element {
    return (
        <div className={style['login-svg']}>
            <svg className={style['login-waves']} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className={style['login-parallax']}>
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.35)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.2)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,1)" />
                </g>
            </svg>
        </div>
    )
}
