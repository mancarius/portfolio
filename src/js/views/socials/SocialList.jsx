import React, { Fragment } from 'react'
import SocialItem from './SocialItem';
import socials from './socials'

const SocialList = () => {

    return (
        <Fragment>
            { socials.map( s => <SocialItem {...s} /> ) }
        </Fragment>
    )

}

export default SocialList