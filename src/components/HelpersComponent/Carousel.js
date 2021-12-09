import React from 'react'


export const Carousel = ({index, ...props}) => {
    const length = props.children.length || props.children || 0

    const sx = {
        root: {
            overflow: 'hidden'
        },
        inner: {
            whiteSpace: 'nowrap',
            height: 500,
            transition: 'transform .2s ease-in',
            transform: `translateX(${index % length * -100}%)`,
        },
        child: {
            display: 'inline-block',
            verticalAlign: 'middle',
            whiteSpace: 'normal',
            width: '100%',
            height: '100%'
        }
    }

    const children = React.Children.map(props.children, (child, i) => {
        return (
            <div style={sx.child}>
                {child}
            </div>
        )
    })

    return (
        <div style={sx.root}>
            <div style={sx.inner}>
                {children}
            </div>
        </div>
    )
}