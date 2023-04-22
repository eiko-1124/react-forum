import React from 'react';
import ReactDOM from 'react-dom/client';
import style from '@/styles/communal/ProgressBar.module.scss'

const ProgressBar = (): JSX.Element => {
    return (
        <div className={style['progressBar-slider']}></div>
    )
}

export const lodingStart = (): void => {
    const el = document.createElement('div')
    el.setAttribute('class', style['progressBar'])
    ReactDOM.createRoot(el).render(<ProgressBar></ProgressBar>)
    document.body.appendChild(el)
}

export const lodingEnd = (): void => {
    const bars = document.querySelectorAll(`.${style['progressBar']}`)
    for (let i = 0; i < bars.length; i++) {
        bars[i].remove()
    }
}
