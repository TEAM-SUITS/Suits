import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const Container = forwardRef((props, ref) => {
    return <div ref={ref} {...props}></div>
})

const PageContainer = styled(motion(Container))`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin: ${({ margin }) => (margin ? margin : '20px')};
    ${({ ismobile }) =>
        ismobile &&
        css`
            margin: 0;
            width: 100%;
        `}
`
export default PageContainer
