import React, { useState } from 'react';

const body = {
    fontFamily : "san-serif"
}

const boxStyle = {
    padding : "10px",
    border : "1px solid gray",
    borderRadius : "7px",
    backgroundColor : "#f7f7f7",
}

function TextExpander(){
    return(
        <div style={body}>
            <TextExpand 
                expandBtnText="More"
                >
                Space travel requires some amazing technology
                and collaboration between countries, private companies
                and int'l space organisations. And while it is not 
                always easy and cheap, the resuslts are out of this world. 
                Think about when 
                humans frist landed on the moon or when 
                rovers were sent to roam around on mars.
            </TextExpand>

            <TextExpand>
            Space travel requires some amazing technology
                and collaboration between countries, private companies
                and int'l space organisations. And while it is not 
                always easy and cheap, the resuslts are out of this world. 
                Think about when 
                humans frist landed on the moon or when 
                rovers were sent to roam around on mars.
            </TextExpand>

            <TextExpand expanded={true}
             className={boxStyle}
             btnColor="#c1630b"
             collapsedNumWords={20}>
                Space travel requires some amazing technology
                and collaboration between countries, private companies
                and int'l space organisations. And while it is not 
                always easy and cheap, the resuslts are out of this world. 
                Think about when 
                humans frist landed on the moon or when 
                rovers were sent to roam around on mars.
            </TextExpand>
        </div>
    )
}

function TextExpand({
    children,
    collapsedNumWords = 12,
    collapsedBtnText = "Show less",
    expandBtnText="Show More",
    btnColor = "#1f09cd",
    expanded = false,
    className,
})
    {

    const [isExpanded, setiseExpanded] = useState(expanded);

    const displayText = isExpanded ? children : children.split(" ").slice(0, collapsedNumWords).join(" ") + "..." ;

    const btnStyle = {
        background : "none",
        border : "none",
        font : "inherit",
        cursor : "pointer",
        marginLeft : "6px",
        color : btnColor,
    }

    return(
        <div className={className}>
           <p>
           <span>{displayText}</span>
           <button style={btnStyle} onClick={()=> setiseExpanded((exp)=> !exp)}>{isExpanded ? collapsedBtnText : expandBtnText}</button>
           </p>
        </div>
    )
}

export default TextExpander; 