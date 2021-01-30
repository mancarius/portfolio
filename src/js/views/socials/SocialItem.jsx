import React from 'react'

const SocialItem = (props) => {
    return (
        <li>
            <a
                className={ "fab fa-" + props.name.toLowerCase() }
                target="_blank"
                rel="noopener"
                href={ props.url }
                data-social-name={ props.name }
                title={ "Connect with me on" + props.name } >
            </a>
        </li>
    )
}

export default SocialItem